'use client'

import {createContext, useContext, useEffect, useState, type PropsWithChildren, type FC} from "react"
import {useProjectsContext} from "@/app/(app)/course/[courseId]/project-sets/[projectSetId]/(hooks)/useProjects"

type ProjectSearchContextType = {
  searchText: string
  setSearchText: (searchText: string) => void
}

const ProjectSearchContext = createContext<ProjectSearchContextType>({
  searchText: '',
  setSearchText: () => {},
})

const useProjectSearch = () => {
  const {projects: allProjects, setDisplayProjects, currentProject, setCurrentProject} = useProjectsContext()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const filteredProjects = allProjects.filter(project => project.name.toLowerCase().includes(searchText.toLowerCase()))
    setDisplayProjects(filteredProjects)
    setSearchText(searchText)

    // If the current project is not in the filtered projects, set the current project to the first filtered project
    const isCurrentProjectInFilteredProjects = !!currentProject && filteredProjects.some(project => project.id === currentProject.id)
    if (!isCurrentProjectInFilteredProjects && filteredProjects.length > 0) {
      setCurrentProject(filteredProjects[0])
    }
  }, [allProjects, currentProject, searchText, setCurrentProject, setDisplayProjects])

  return {
    searchText,
    setSearchText,
  }
}

export const ProjectSearchProvider: FC<PropsWithChildren> = ({children}) => {
  const projectSearch = useProjectSearch()

  return (
    <ProjectSearchContext.Provider value={projectSearch}>
      {children}
    </ProjectSearchContext.Provider>
  )
}

export const useProjectSearchContext = () => useContext(ProjectSearchContext)
