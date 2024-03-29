'use client'
import React, { useState, createContext, useContext, PropsWithChildren, useMemo, useEffect, useCallback } from 'react'
import { Student } from '@/_temp_types/student'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { PaginationState } from '@tanstack/react-table'


type QueryParams = {
    page: number;
    per_page: number;
    search?: string;
    sections?: string;
}

type DropdownOption = {
    label: string;
    value: string;
}

type StudentsContextType = {
  displayStudents: Student[];
  currentSections: DropdownOption[];
  totalStudents: number;
  pageCount: number;
  setSearchQuery: (searchQuery: string) => void;
  filterSections: (sectionTerms: DropdownOption[]) => void;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
const StudentsContext = createContext<StudentsContextType>({
    displayStudents: [],
    currentSections: [],
    totalStudents: 0,
    pageCount: 0,
    setSearchQuery: (searchQuery: string) => {},
    filterSections: (sectionTerms: DropdownOption[]) => {},
    pagination: { pageIndex: 0, pageSize: 10 },
    setPagination: () => {},
})

const createQueryString = (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            searchParams.set(key, value.toString())
        }
    })
    return searchParams.toString()
}
// todo
const FIXED_COURSE_NUM = 1

const useStudentsProvider = (): StudentsContextType => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [sections, setSections] = useState<DropdownOption[]>([])
    const [totalStudents, setTotalStudents] = useState(0)
    const [search, setSearch] = useState(searchParams.get('search') ?? '')
    const [sectionTerms, setSectionTerms] = useState(searchParams.get('sections') ?? '')
    const [pageCount, setPageCount] = useState(0)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: parseInt(searchParams.get('page') ?? '1') - 1,
        pageSize: parseInt(searchParams.get('per_page') ?? '10'),
    })

    const setSearchQuery = useCallback((searchQuery: string) => {
        setSearch(searchQuery)
        setPagination({ ...pagination, pageIndex: 0})
    }, [pagination, setSearch, setPagination])

    const filterSections = useCallback((sectionsPassed: DropdownOption[]) => {
        setSectionTerms(sectionsPassed.map((section) => section.value).join(','))
        setPagination({ ...pagination, pageIndex: 0})
    }, [setSectionTerms, setPagination, pagination])

    const queryStringParams: QueryParams = useMemo(() => ({
        page: pagination.pageIndex + 1, // adding one to make it appear as 1 indexed for the URL query in browser
        per_page: pagination.pageSize,
        search: search,
        sections: sectionTerms.length > 0 ? sectionTerms : undefined,
    }), [pagination.pageIndex, pagination.pageSize, search, sectionTerms])

    useEffect(() => {
        const queryString = createQueryString(queryStringParams)
        const fetchStudents = async () => {
            const courseMemberResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course-members/course/${FIXED_COURSE_NUM}/?${queryString}`)
            const courseMemberData = await courseMemberResponse.json()
            const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
                id: member.user.id,
                name: `${member.user.last_name}, ${member.user.first_name}`,
                sections: member.sections.map((section: any) => section.name),
            }))
            setDisplayStudents(studentsToDisplay)
            setTotalStudents(courseMemberData.count)
            setPageCount(Math.ceil(courseMemberData.count / pagination.pageSize))
        }
        fetchStudents()
    }, [queryStringParams, setDisplayStudents, setTotalStudents, setPageCount, pagination.pageSize])

    useEffect(() => {
        const queryString = createQueryString(queryStringParams)
        window.history.replaceState(null, '', `${pathname}?${queryString}`)
    }, [queryStringParams, pathname])

    useEffect(() => {
        const fetchSections = async () => {
            const sectionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/${FIXED_COURSE_NUM}/sections`)
            const sectionsData = await sectionsResponse.json()
            const sectionsToDisplay: DropdownOption[] = sectionsData.map((section: any) => ({
                label: section.name,
                value: section.id,
            }))
            setSections(sectionsToDisplay)
        }
        fetchSections()
    }, [setSections])

    return {
        displayStudents: displayStudents,
        currentSections: sections,
        totalStudents: totalStudents,
        pageCount: pageCount,
        setSearchQuery: setSearchQuery,
        filterSections: filterSections,
        pagination: pagination,
        setPagination: setPagination,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType => {
    return useContext(StudentsContext)
}
