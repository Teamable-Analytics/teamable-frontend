'use client'

import * as React from "react"

import {SearchBar} from "@/components/SearchBar"
import {Button} from "@/components/ui/button"
import {type Project} from "@/_temp_types/projects"
import {useRouter} from "next/navigation"

export type SidebarProjectsDisplayProps = {
    projects: Project[]
    currentSearchTerm: string
    currentProjectIdx: number
    currentEditMode: boolean
}

export function SidebarProjectsDisplay({projects, currentSearchTerm, currentProjectIdx, currentEditMode}: SidebarProjectsDisplayProps) {
    const router = useRouter()

    const currentProjectId = projects.length > 0 ? projects[currentProjectIdx].id : null

    const updateSearchTerm = (newSearchTerm: string) => {
        router.push(`?isEdit=${currentEditMode}&projectIdx=${currentProjectIdx}&search=${newSearchTerm}`)
    }

    const updateProjectIdx = (newProjectIdx: number) => {
        router.push(`?isEdit=${currentEditMode}&projectIdx=${newProjectIdx}&search=${currentSearchTerm}`)
    }

    const handleProjectChanged = (project: Project, projectIdx: number) => {
        updateProjectIdx(projectIdx)
        // TODO: shoot update api
    }

    return (
        <>
            <SearchBar
                className="ml-0"
                placeholder="Search Projects"
                defaultValue={currentSearchTerm}
                onBlur={(e) => updateSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        updateSearchTerm(e.currentTarget.value)
                    }
                }}
            />
            <div className="flex flex-col w-full mt-2 gap-1 pr-4">
                {projects.map((project, projectIdx) => (
                    <Button
                        className="justify-start"
                        variant={project.id === currentProjectId ? "secondary" : "ghost"}
                        key={project.id}
                        onClick={() => handleProjectChanged(project, projectIdx)}
                    >
                        {project.name}
                    </Button>
                ))}
            </div>
        </>
    )
}
