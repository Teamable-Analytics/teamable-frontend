'use client'

import {createContext, useContext, useEffect, useState, type PropsWithChildren, type FC} from "react"
import {useParams} from "next/navigation"
import {type Project} from "@/_temp_types/projects"
import {toast} from "@/hooks/use-toast"

type ProjectSetContextType = {
  projectSetId: string
  projects: Project[]
  currentProjectId: string
  setCurrentProjectId: (projectId: string) => void
}

const ProjectSetContext = createContext<ProjectSetContextType>({
  projectSetId: "",
  projects: [],
  currentProjectId: "",
  setCurrentProjectId: () => {},
})

const useProjects = () => {
  const {projectSetId} = useParams<{ projectSetId: string }>()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string>("")

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsURL = new URL(`/api/v1/teamset-templates/${projectSetId}/team-templates`, process.env.NEXT_PUBLIC_BACKEND_URL)
      const projectsResponse = await fetch(projectsURL)
      const projects = await projectsResponse.json()
      setProjects(projects)
    }
    fetchProjects().catch((e) => {
      toast({
        title: "There was an error fetching the projects.",
        variant: "destructive",
      })
      console.error(e)
    })
  }, [projectSetId])

  return {
    projectSetId,
    projects,
    currentProjectId,
    setCurrentProjectId,
  }
}

export const ProjectsProvider: FC<PropsWithChildren> = ({children}) => {
  const projectSet = useProjects()

  return (
    <ProjectSetContext.Provider value={projectSet}>
      {children}
    </ProjectSetContext.Provider>
  )
}

export const useProjectsContext = () => useContext(ProjectSetContext)
