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
    const [pageCount, setPageCount] = useState(0)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    useEffect(() => {
        const page = parseInt(searchParams.get('page') ?? '1') - 1
        const pageSize = parseInt(searchParams.get('per_page') ?? '10')
        setPagination({
            pageIndex: page,
            pageSize: pageSize,
        })
        setPageCount(Math.ceil(totalStudents / pageSize))
    }, [searchParams, totalStudents, setPagination])

    const fixedCourseNum = 1

    const router = useRouter()
    const pathname = usePathname()

    const updateTitleTerms = (titleTerm: string) => {
        setTitleTerms(titleTerm)
        setPagination({ ...pagination, pageIndex: 0})
    }

    const { pageIndex, pageSize } = useMemo(() => {
        return {
            pageIndex: parseInt(searchParams.get('page') ?? '1'),
            pageSize: parseInt(searchParams.get('per_page') ?? '10'),
        }
    }, [searchParams])

    useEffect(() => {
        const createQueryString = (params: Record<string, string | number>) => {
            const searchParams = new URLSearchParams()
            Object.entries(params).forEach(([key, value]) => {
                searchParams.set(key, value.toString())
            })
            return searchParams.toString()
        }
        const queryString = createQueryString({
            page: pagination.pageIndex + 1,
            per_page: pagination.pageSize,
            title: titleTerms,
        })
        router.push(`${pathname}?${queryString}`, { scroll: false })
    }, [pagination.pageIndex, pagination.pageSize, titleTerms, router, pathname])


    const constructURL = (pageIndex: number, pageSize: number, searchTerm?: string) => {
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
        return `${baseURL}/api/v1/course-members/course/${fixedCourseNum}/?page=${pageIndex}&per_page=${pageSize}${searchTerm ? `&title=${searchTerm}` : ''}`
    }

    useEffect(() => {
        const fetchStudents = async () => {
            const courseMemberData = await fetch(constructURL(pageIndex, pageSize, titleTerms)).then(res => res.json())
            const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
                id: member.user.id,
                name: `${member.user.last_name}, ${member.user.first_name}`,
                sections: member.sections.map((section: any) => section.name),
            }))
            setDisplayStudents(studentsToDisplay)
            setTotalStudents(courseMemberData.count)
        }
        fetchStudents()
    }, [pageIndex, pageSize, titleTerms])

    // TODO: remove the useMemo below and grab sections using API call
    useEffect(() => {
        const fetchSections = async () => {
            const sectionsData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/${fixedCourseNum}/sections`).then(res => res.json())
            const sectionsToDisplay: DropdownOption[] = sectionsData.map((section: any) => ({
                label: section.name,
                value: section.name,
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
