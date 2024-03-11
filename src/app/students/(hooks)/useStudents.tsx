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
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

const useStudentsProvider = (): StudentsContextType => {
    const [studentsParse, setStudentsParse] = useState<Student[]>([])
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [sections, setSections] = useState<DropdownOption[]>([])

    useMemo(() => {
        const sections = new Set<string>()
        studentsParse.forEach(student => {
            student.sections?.forEach(section => {
                sections.add(section)
            })
        })
        const sectionsOptions: DropdownOption[] = Array.from(sections).map(section => ({ label: section, value: section }))
        setSections(sectionsOptions)
    }, [studentsParse])

    return {
        displayStudents: displayStudents,
        currentSections: sections,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType | undefined => {
    return useContext(StudentsContext)
}
