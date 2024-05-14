'use client'

import {createContext, useContext, useEffect, useState, type PropsWithChildren, type FC} from "react"
import {type Project} from "@/_temp_types/projects"
import {useProjectsContext} from "@/app/(app)/course/[courseId]/project-sets/[projectSetId]/(hooks)/useProjects"

type SearchTermContextType = {
  displayProjects: Project[]
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const SearchTermContext = createContext<SearchTermContextType>({
  displayProjects: [],
  searchTerm: '',
  setSearchTerm: () => {},
})

const useSearchTerm = () => {
  const { projects: allProjects, currentProjectId, setCurrentProjectId } = useProjectsContext()
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredProjects = allProjects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredProjects(filteredProjects)
    setSearchTerm(searchTerm)

    // If the current project is not in the filtered projects, set the current project to the first filtered project
    const isCurrentProjectInFilteredProjects = filteredProjects.some(project => project.id.toString() === currentProjectId)
    if (!isCurrentProjectInFilteredProjects && filteredProjects.length > 0) {
      setCurrentProjectId(filteredProjects[0].id.toString())
    }
  }, [allProjects, searchTerm, currentProjectId, setCurrentProjectId])

  return {
    displayProjects: filteredProjects,
    searchTerm,
    setSearchTerm,
  }
}

export const SearchTermProvider: FC<PropsWithChildren> = ({ children }) => {
  const searchTerm = useSearchTerm()

  return (
    <SearchTermContext.Provider value={searchTerm}>
      {children}
    </SearchTermContext.Provider>
  )
}

export const useSearchTermContext = () => useContext(SearchTermContext)
