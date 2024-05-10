'use client'

import * as React from "react"

import {SearchBar} from "@/components/SearchBar"
import {Button} from "@/components/ui/button"
import {type Project} from "@/_temp_types/projects"
import {useRouter} from "next/navigation"
import {useContext} from "react"
import {ProjectSetDetailContext} from "@/app/project-sets/[projectSetId]/(components)/ProjectSetDetailContextProvider"

export type SidebarProjectsDisplayProps = {
    projects: Project[]
    currentProjectId: number
}

export function SidebarProjectsDisplay({projects, currentProjectId}: SidebarProjectsDisplayProps) {
    const router = useRouter()
    const {searchTerm, setSearchTerm} = useContext(ProjectSetDetailContext)

    const updateSearchTerm = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm)
    }

    const updateProjectId = (newProjectId: number) => {
        router.push(`?projectId=${newProjectId}`)
    }

    const handleProjectChanged = (project: Project) => {
        updateProjectId(project.id)
    }

    return (
        <>
            <SearchBar
                className="ml-0"
                placeholder="Search Projects"
                defaultValue={searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
            />
            <div className="flex flex-col w-full mt-2 gap-1 pr-4">
                {projects.map((project) => (
                    <Button
                        className="justify-start"
                        variant={project.id === currentProjectId ? "secondary" : "ghost"}
                        key={project.id}
                        onClick={() => handleProjectChanged(project)}
                    >
                        {project.name}
                    </Button>
                ))}
            </div>
        </>
    )
}
