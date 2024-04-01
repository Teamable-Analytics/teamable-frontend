'use client'

import * as React from "react"

import {SearchBar} from "@/components/SearchBar"
import {Button} from "@/components/ui/button"
import {type Project} from "@/_temp_types/projects"
import {useRouter} from "next/navigation"

export type SidebarProjectsDisplayProps = {
    projects: Project[]
    currentSearchTerm: string
    currentProjectId: number
    currentEditMode: boolean
}

export function SidebarProjectsDisplay({projects, currentSearchTerm, currentProjectId, currentEditMode}: SidebarProjectsDisplayProps) {
    const router = useRouter()

    const updateSearchTerm = (newSearchTerm: string) => {
        router.push(`?isEdit=${currentEditMode}&projectId=${currentProjectId}&search=${newSearchTerm}`)
    }

    const updateProjectIdx = (newProjectId: number) => {
        router.push(`?isEdit=${currentEditMode}&projectId=${newProjectId}&search=${currentSearchTerm}`)
    }

    const handleProjectChanged = (project: Project) => {
        updateProjectIdx(project.id)
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
