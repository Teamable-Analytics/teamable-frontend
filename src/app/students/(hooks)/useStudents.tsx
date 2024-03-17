'use client'
import { useState, createContext, useContext, PropsWithChildren, useMemo } from 'react'
import { Student } from '@/_temp_types/student'

type DropdownOption = {
    label: string;
    value: string;
}

type StudentsContextType = {
    displayStudents: Student[];
    currentSections: DropdownOption[];
    fetchStudents: () => Promise<void>;
}
const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

const useStudentsProvider = (): StudentsContextType => {
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [sections, setSections] = useState<DropdownOption[]>([])
    const fetchStudents = async () => {
        const fixedCourseNum = 1  // TODO: replace with actual course number
        const baseURL = process.env.NEXT_PUBLIC_DB_HOST
        const courseMemberData = await fetch(`${baseURL}/api/v1/course-members/course/${fixedCourseNum}/`).then(res => res.json())
        const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
            id: member.id,
            name: member.user.last_name + ',' + member.user.first_name,
            sections: member.sections.map((section: any) => section.name),
        }))
        setDisplayStudents(studentsToDisplay)
    }

    // TODO: remove this useMemo and use API call to get a set of sections all student course_members that are in specific course
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
        fetchStudents,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType | undefined => {
    return useContext(StudentsContext)
}
