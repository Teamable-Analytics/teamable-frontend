'use client'

import {
  type Context,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
  createContext,
} from "react"

export type ProjectSetDetailContextType = {
  searchTerm: string
  isEditMode: boolean
}

export const ProjectSetDetailContext: Context<ProjectSetDetailContextType> = createContext<ProjectSetDetailContextType>({
  searchTerm: "",
  isEditMode: false,
})

export type ProjectSetDetailProviderProps = {
  children: ReactNode
}

const useProjectSetDetailProvider = (): ProjectSetDetailContextType => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  return {
    searchTerm,
    isEditMode,
  }
}

export function ProjectSetDetailContextProvider({children}: ProjectSetDetailProviderProps) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  return (
    <ProjectSetDetailContext.Provider
      value={{
        searchTerm,
        isEditMode,
      }}>
      {children}
    </ProjectSetDetailContext.Provider>
  )
}
