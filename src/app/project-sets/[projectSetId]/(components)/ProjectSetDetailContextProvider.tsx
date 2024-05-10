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
    setSearchTerm: Dispatch<SetStateAction<string>>
    isEditMode: boolean
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}

export const ProjectSetDetailContext: Context<ProjectSetDetailContextType> = createContext<ProjectSetDetailContextType>({
    searchTerm: "",
    setSearchTerm: () => {
    },
    isEditMode: false,
    setIsEditMode: () => {
    },
})

export type ProjectSetDetailProviderProps = {
    children: ReactNode
}

export function ProjectSetDetailContextProvider({children}: ProjectSetDetailProviderProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    return (
        <ProjectSetDetailContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                isEditMode,
                setIsEditMode,
            }}>
            {children}
        </ProjectSetDetailContext.Provider>
    )
}
