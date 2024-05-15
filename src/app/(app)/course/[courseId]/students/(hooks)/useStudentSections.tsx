import {createContext, useContext, useState, PropsWithChildren} from "react"

// TODO: add functionality that calls update-sections endpoint (INTEGRATE BACKEND)
type StudentRowContextType = {
    isEditable: boolean;
    setEditable: (editable: boolean) => void;
}

const defaultStudentRowState: StudentRowContextType = {
  isEditable: false,
  setEditable: ()  => {},
}

export const StudentRowContext = createContext<StudentRowContextType>(defaultStudentRowState)

export const StudentRowProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [isEditable, setEditable] = useState<boolean>(false)

  return(
    <StudentRowContext.Provider value={{isEditable, setEditable}}>
      {children}
    </StudentRowContext.Provider>
  )
}

export const useStudentRow = (): StudentRowContextType => {
  return useContext(StudentRowContext)
}
