'use client'
import { useState, createContext, useContext, PropsWithChildren, useMemo } from 'react'
import { Student } from '@/_temp_types/student'

type DropdownOption  = {
  label: string;
  value: string;
}

type StudentsContextType = {
  displayStudents: Student[];
  currentSections: DropdownOption[];
  fetchStudents: (pageIndex: number, pageSize: number) => Promise<void>;
}
const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

const useStudentsProvider = (): StudentsContextType => {
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [sections, setSections] = useState<DropdownOption[]>([])

    const fetchStudents = async (pageIndex: number = 1, pageSize: number = 2) => {
        const fixedCourseNum = 1
        const courseMemberData = await fetch(`http://127.0.0.1:8000/api/v1/course-members/?course=${fixedCourseNum}&page_size=${pageSize}&pageIndex=${pageIndex}`).then(res => res.json())
        const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
            id: member.id,
            name: member.user.last_name + ',' + member.user.first_name,
            sections: member.sections.map((section: any) => section.name),
        }))
        setDisplayStudents(studentsToDisplay)
    }
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
        fetchStudents
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType | undefined => {
    return useContext(StudentsContext)
}
