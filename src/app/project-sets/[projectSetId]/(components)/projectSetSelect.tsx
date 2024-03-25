'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import * as React from "react"
import {type ProjectSet} from "@/_temp_types/projects"
import {useRouter} from "next/navigation"

export type ProjectSetSelectProps = {
    currentProjectSetId: number
    allProjectSets: ProjectSet[]
}

export function ProjectSetSelect({ currentProjectSetId, allProjectSets }: ProjectSetSelectProps) {
    const router = useRouter()
    const handleProjectSetChanged = (newProjectSetId: string) => {
        router.push(`/project-sets/${newProjectSetId}`)
    }

    return (
        <Select
            value={currentProjectSetId.toString()}
            onValueChange={(newProjectSetId) => handleProjectSetChanged(newProjectSetId)}
        >
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                {allProjectSets.map((projectSet) => (
                    <SelectItem
                        value={projectSet.id.toString()}
                        key={projectSet.id}>{projectSet.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
