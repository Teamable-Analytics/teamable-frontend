import { useState, useEffect, useCallback, createContext, useContext, ChangeEvent, PropsWithChildren, useMemo } from 'react'
import { parseCSV } from '@/lib/parseCSV'
import { Student } from '@/_temp_types/student'

type SectionOption  = {
  label: string;
  value: string;
}

interface StudentsContextType {
  displayStudents: Student[];
  currentSections: SectionOption[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCancel: () => void;
  handleSave: () => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

export const useStudentsProvider = (): StudentsContextType => {
    const [csvStudentsParse, setStudentsParse] = useState<Student[]>([])
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [currentSections, setSections] = useState<SectionOption[]>([])

    useMemo(() => {
        const sections = new Set<string>()
        csvStudentsParse.forEach(student => {
            student.sections?.forEach(section => {
                sections.add(section)
            })
        })
        const sectionsOptions: SectionOption[] = Array.from(sections).map(section => ({ label: section, value: section }))
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
        // Implement save functionality
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
    const students = useStudentsProvider()
    return <StudentsContext.Provider value={students}>{children}</StudentsContext.Provider>
}

export const useStudents = (): StudentsContextType => {
    const context = useContext(StudentsContext)
    if (context === undefined) {
        throw new Error('useStudents must be used within a StudentsProvider')
    }
    return context
}
