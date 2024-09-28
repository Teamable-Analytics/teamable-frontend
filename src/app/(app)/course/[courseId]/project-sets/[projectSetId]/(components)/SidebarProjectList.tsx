'use client'

import {
  useProjectsContext,
  useProjectSearchContext,
} from "../(hooks)"
import {SearchBar} from "@/components/SearchBar"
import {Button} from "@/components/ui/button"

export const SidebarProjectList = () => {
  const {displayProjects, currentProject, setCurrentProject} = useProjectsContext()
  const {searchText, setSearchText} = useProjectSearchContext()

  return (
    <>
      <SearchBar
        className="ml-0"
        placeholder="Search Projects"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex flex-col w-full mt-2 gap-1">
        {currentProject && displayProjects.map((project) => (
          <Button
            className="justify-start"
            variant={project.id === currentProject.id ? "secondary" : "ghost"}
            key={project.id}
            onClick={() => setCurrentProject(project)}
          >
            {project.name}
          </Button>
        ))}
      </div>
    </>
  )
}
