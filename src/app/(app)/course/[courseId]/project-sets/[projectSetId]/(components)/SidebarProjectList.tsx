'use client'

import {
  useProjectsContext,
  useProjectSearchContext,
} from "../(hooks)"
import {SearchBar} from "@/components/SearchBar"
import {Button} from "@/components/ui/button"

export const SidebarProjectList = () => {
  const {currentProjectId, setCurrentProjectId} = useProjectsContext()
  const {displayProjects, searchText, setSearchText} = useProjectSearchContext()

  return (
    <>
      <SearchBar
        className="ml-0"
        placeholder="Search Projects"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex flex-col w-full mt-2 gap-1 pr-4">
        {displayProjects.map((project) => (
          <Button
            className="justify-start"
            variant={project.id.toString() === currentProjectId ? "secondary" : "ghost"}
            key={project.id}
            onClick={() => setCurrentProjectId(project.id.toString())}
          >
            {project.name}
          </Button>
        ))}
      </div>
    </>
  )
}
