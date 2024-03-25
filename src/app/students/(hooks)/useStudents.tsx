'use client'
import React, { useState, createContext, useContext, PropsWithChildren, useMemo, useEffect } from 'react'
import { Student } from '@/_temp_types/student'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { PaginationState } from '@tanstack/react-table'

type DropdownOption = {
    label: string;
    value: string;
}

type StudentsContextType = {
  displayStudents: Student[];
  currentSections: DropdownOption[];
  totalStudents: number;
  pageCount: number;
  updateTitle: (titleTerms: string) => void;
  filterSections: (sectionTerms: DropdownOption[]) => void;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

const useStudentsProvider = (): StudentsContextType => {
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [sections, setSections] = useState<DropdownOption[]>([])
    const [totalStudents, setTotalStudents] = useState<number>(0)
    const searchParams = useSearchParams()
    const [titleTerms, setTitleTerms] = useState<string>('')
    const [sectionTerms, setSectionTerms] = useState<string>('')
    const [pageCount, setPageCount] = useState(0)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    })

    useMemo(() => {
        const page = parseInt(searchParams.get('page') ?? '1') - 1 // 0 indexed for react-table
        const pageSize = parseInt(searchParams.get('per_page') ?? '10')
        setPagination({
            pageIndex: page,
            pageSize: pageSize,
        })
        setPageCount(Math.ceil(totalStudents / pageSize))
    }, [searchParams, totalStudents, setPagination])


    const router = useRouter()
    const pathname = usePathname()

    const updateTitleTerms = (titleTerm: string) => {
        setTitleTerms(titleTerm)
        setPagination({ ...pagination, pageIndex: 0})
    }

    const filterSections = (sectionsPassed: DropdownOption[]) => {
        setSectionTerms(sectionsPassed.map((section) => section.value).join('.'))
        setPagination({ ...pagination, pageIndex: 0})
        return sectionTerms
    }

    useEffect(() => {
        type QueryParams = {
            page: number;
            per_page: number;
            title?: string;
            sections?: string;
        }

        const createQueryString = (params: Record<string, string | number>) => {
            const searchParams = new URLSearchParams()
            Object.entries(params).forEach(([key, value]) => {
                searchParams.set(key, value.toString())
            })
            return searchParams.toString()
        }
        const queryStringParams: QueryParams = {
            page: pagination.pageIndex + 1, // adding one to make it appear as 1 indexed for the URL query in browser
            per_page: pagination.pageSize,
        }
        if (titleTerms) {
            queryStringParams.title = titleTerms
        }
        if (sectionTerms.length > 0) {
            queryStringParams.sections = sectionTerms
        }
        const queryString = createQueryString({ ...queryStringParams})
        router.push(`${pathname}?${queryString}`, { scroll: false })
    }, [pagination.pageIndex, pagination.pageSize, titleTerms, sectionTerms, router, pathname])


    const constructURL = (pageIndex: number, pageSize: number, titleTerm?: string, sectionTerm?: string) => {
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
        const fixedCourseNum = 1
        return `${baseURL}/api/v1/course-members/course/${fixedCourseNum}/?page=${pageIndex}&per_page=${pageSize}${titleTerm ? `&title=${titleTerm}` : ''} ${sectionTerm ? `&sections=${sectionTerm}` : ''}`
    }

    useEffect(() => {
        const fetchStudents = async () => {
            // adding one to make pageIndex 1 indexed for the API endpoint
            const courseMemberData = await fetch(constructURL(pagination.pageIndex + 1, pagination.pageSize, titleTerms, sectionTerms)).then(res => res.json())
            const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
                id: member.user.id,
                name: `${member.user.last_name}, ${member.user.first_name}`,
                sections: member.sections.map((section: any) => section.name),
            }))
            setDisplayStudents(studentsToDisplay)
            setTotalStudents(courseMemberData.count)
        }
        fetchStudents()
    }, [pagination.pageIndex, pagination.pageSize, titleTerms, sectionTerms])

    useEffect(() => {
        const fetchSections = async () => {
            const fixedCourseNum = 1
            const sectionsData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/${fixedCourseNum}/sections`).then(res => res.json())
            const sectionsToDisplay: DropdownOption[] = sectionsData.map((section: any) => ({
                label: section.name,
                value: section.id,
            }))
            setSections(sectionsToDisplay)
        }
        fetchSections()
    }, [])

    return {
        displayStudents: displayStudents,
        currentSections: sections,
        totalStudents: totalStudents,
        pageCount: pageCount,
        updateTitle: updateTitleTerms,
        filterSections: filterSections,
        pagination: pagination,
        setPagination: setPagination,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType | undefined => {
    return useContext(StudentsContext)
}
