'use client'

import {createContext, useContext, useEffect, useState, type PropsWithChildren, type FC} from "react"
import {type Project} from "@/_temp_types/projects"
import {useProjectsContext} from "@/app/(app)/course/[courseId]/project-sets/[projectSetId]/(hooks)/useProjects"

type ProjectSearchContextType = {
  displayProjects: Project[]
  searchText: string
  setSearchText: (searchText: string) => void
}

const ProjectSearchContext = createContext<ProjectSearchContextType>({
  displayProjects: [],
  searchText: '',
  setSearchText: () => {},
})

const useProjectSearch = () => {
  const { projects: allProjects, currentProjectId, setCurrentProjectId } = useProjectsContext()
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const filteredProjects = allProjects.filter(project => project.name.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredProjects(filteredProjects)
    setSearchText(searchText)

    // If the current project is not in the filtered projects, set the current project to the first filtered project
    const isCurrentProjectInFilteredProjects = filteredProjects.some(project => project.id.toString() === currentProjectId)
    if (!isCurrentProjectInFilteredProjects && filteredProjects.length > 0) {
      setCurrentProjectId(filteredProjects[0].id.toString())
    }
  }, [allProjects, searchText, currentProjectId, setCurrentProjectId])

  return {
    displayProjects: filteredProjects,
    searchText,
    setSearchText,
  }
}

export const ProjectSearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const projectSearch = useProjectSearch()

  return (
    <ProjectSearchContext.Provider value={projectSearch}>
      {children}
    </ProjectSearchContext.Provider>
  )
}

export const useProjectSearchContext = () => useContext(ProjectSearchContext)
