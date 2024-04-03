'use client'
import React, { useState, createContext, useContext, PropsWithChildren, useMemo, useEffect, useCallback } from 'react'
import { Student } from '@/_temp_types/student'
import { useSearchParams, usePathname } from 'next/navigation'
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
  allSections: DropdownOption[];
  totalStudents: number;
  pageCount: number;
  setSearchQuery: (searchQuery: string) => void;
  setSelectedSections: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSections : string[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  isLoadingData: boolean;
}
const StudentsContext = createContext<StudentsContextType>({
    displayStudents: [],
    allSections: [],
    totalStudents: 0,
    pageCount: 0,
    setSearchQuery: (searchQuery: string) => {},
    setSelectedSections: (x : any) => {},
    selectedSections: [],
    pagination: { pageIndex: 0, pageSize: 10 },
    setPagination: () => {},
    isLoadingData: true,
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
const FIXED_COURSE_NUM = 10

const useStudentsProvider = (): StudentsContextType => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [allSections, setAllSections] = useState<DropdownOption[]>([])
    const [selectedSections, setSelectedSections] = useState<string[]>(searchParams.get('sections')?.split(',') ?? [])
    const [totalStudents, setTotalStudents] = useState(0)
    const [search, setSearch] = useState(searchParams.get('search') ?? '')
    const [pageCount, setPageCount] = useState(0)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: parseInt(searchParams.get('page') ?? '1') - 1,
        pageSize: parseInt(searchParams.get('per_page') ?? '10'),
    })
    const [isLoadingData, setIsLoadingData] = useState(true)

    const setSearchQuery = useCallback((searchQuery: string) => {
        setSearch(searchQuery)
        setPagination({ ...pagination, pageIndex: 0})
    }, [pagination, setSearch, setPagination])


    const setCurrentlySelectedSections = useCallback((sectionsPassed: DropdownOption[]) => {
        setSelectedSections(sectionsPassed.map((section) => section.value))
        setPagination({ ...pagination, pageIndex: 0})
    }, [ setPagination, pagination])

    const queryStringParams: QueryParams = useMemo(() => ({
        page: pagination.pageIndex + 1, // adding one to make it appear as 1 indexed for the URL query in browser
        per_page: pagination.pageSize,
        search: search,
        sections: selectedSections.length > 0 ? selectedSections.join(',') : undefined,
    }), [pagination.pageIndex, pagination.pageSize, search, selectedSections])

    useEffect(() => {
        let newSelectedSections = selectedSections.filter((section) => !isNaN(parseInt(section)))
        // todo: allsections make undefined
        console.log({selectedSections, newSelectedSections})
        if (allSections.length > 0) {
            newSelectedSections = newSelectedSections.filter((section) => allSections.find((sectionOption) => sectionOption.value === section))
            console.log('this would be bad', newSelectedSections)
        }
        if (newSelectedSections.length !== selectedSections.length) {
            setSelectedSections(newSelectedSections)
        }
    }, [allSections, selectedSections])


    useEffect(() => {
        const queryString = createQueryString(queryStringParams)
        const fetchStudents = async () => {
            try{
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
            }catch (e) {
                console.error(e)
            }finally {
                setIsLoadingData(false)
            }
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
                value: String(section.id),
            }))
            setAllSections(sectionsToDisplay)
        }
        fetchSections()
    }, [setAllSections])

    return {
        displayStudents,
        allSections,
        totalStudents,
        pageCount,
        setSearchQuery,
        setSelectedSections,
        selectedSections,
        pagination,
        setPagination,
        isLoadingData,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType => {
    return useContext(StudentsContext)
}
