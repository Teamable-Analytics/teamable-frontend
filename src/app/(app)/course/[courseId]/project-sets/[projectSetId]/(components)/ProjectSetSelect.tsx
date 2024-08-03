'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import * as React from "react"
import {useParams, useRouter} from "next/navigation"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"

export type ProjectSetSelectProps = {
  allProjectSets: ApiTeamSetTemplate[]
}

export function ProjectSetSelect({allProjectSets}: ProjectSetSelectProps) {
  const {courseId, projectSetId} = useParams<{ courseId: string, projectSetId: string }>()
  const router = useRouter()
  const handleProjectSetChanged = (newProjectSetId: string) => {
    router.push(`/course/${courseId}/project-sets/${newProjectSetId}`)
  }

  return (
    <Select
      value={projectSetId}
      onValueChange={(newProjectSetId) => handleProjectSetChanged(newProjectSetId)}
    >
      <SelectTrigger>
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {allProjectSets.map((projectSet) => (
          <SelectItem key={projectSet.id} value={projectSet.id.toString()}>
            {projectSet.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
