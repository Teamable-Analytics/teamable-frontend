'use client'
import { useState, createContext, useContext, PropsWithChildren, useMemo, useEffect } from 'react'
import { Student } from '@/_temp_types/student'
import { useSearchParams } from 'next/navigation'

type DropdownOption = {
    label: string;
    value: string;
}

type StudentsContextType = {
  displayStudents: Student[];
  currentSections: DropdownOption[];
  totalStudents: number;
}
const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

const useStudentsProvider = (): StudentsContextType => {
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [sections, setSections] = useState<DropdownOption[]>([])
    const [totalStudents, setTotalStudents] = useState<number>(0)
    const searchParams = useSearchParams()


    const fixedCourseNum = 1

    const { pageIndex, pageSize } = useMemo(() => {
        return {
            pageIndex: parseInt(searchParams.get('page') ?? '1'),
            pageSize: parseInt(searchParams.get('per_page') ?? '10'),
        }
    }, [searchParams])

    useEffect(() => {
        const fetchStudents = async () => {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
            const courseMemberData = await fetch(`${baseURL}/api/v1/course-members/course/${fixedCourseNum}/?page=${pageIndex}&per_page=${pageSize}`).then(res => res.json())
            const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
                id: member.id,
                name: member.user.last_name + ',' + member.user.first_name,
                sections: member.sections.map((section: any) => section.name),
            }))
            setDisplayStudents(studentsToDisplay)
            setTotalStudents(courseMemberData.count)
        }
        fetchStudents()
    }, [pageIndex, pageSize])
    useMemo(() => {
        const sections = new Set<string>()
        displayStudents.forEach(student => {
            student.sections?.forEach(section => {
                sections.add(section)
            })
        })
        const sectionsOptions: DropdownOption[] = Array.from(sections).map(section => ({ label: section, value: section }))
        setSections(sectionsOptions)
    }, [displayStudents])

    return {
        displayStudents: displayStudents,
        currentSections: sections,
        totalStudents: totalStudents,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType | undefined => {
    return useContext(StudentsContext)
}
