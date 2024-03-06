'use client'
import { useState, createContext, useContext, ChangeEvent, PropsWithChildren, useMemo } from 'react'
import { parseCSV } from '@/lib/canvas/parseCSV'
import { Student } from '@/_temp_types/student'

type DropdownOption  = {
  label: string;
  value: string;
}

type StudentsContextType = {
  displayStudents: Student[];
  currentSections: DropdownOption[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCancel: () => void;
  handleSave: () => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

const useStudentsProvider = (): StudentsContextType => {
    const [csvStudentsParse, setStudentsParse] = useState<Student[]>([])
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [currentSections, setSections] = useState<DropdownOption[]>([])

    useMemo(() => {
        const sections = new Set<string>()
        csvStudentsParse.forEach(student => {
            student.sections?.forEach(section => {
                sections.add(section)
            })
        })
        const sectionsOptions: DropdownOption[] = Array.from(sections).map(section => ({ label: section, value: section }))
        setSections(sectionsOptions)
    }, [csvStudentsParse])

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        let parsedCSV: Student[] = []
        if (file) {
            parsedCSV = await parseCSV(file) as Student[]
            setStudentsParse(parsedCSV)
        }
    }

    const handleCancel = () => setStudentsParse([])

    const handleSave = () => {
        setDisplayStudents(csvStudentsParse)
    }

    return {
        displayStudents,
        currentSections,
        handleFileChange,
        handleCancel,
        handleSave,
    }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const studentsContext = useStudentsProvider()
    return <StudentsContext.Provider value={studentsContext}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType | undefined => {
    return useContext(StudentsContext)
}
