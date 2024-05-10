'use client'

import {Text} from "@/components/ui/text"
import {Input} from "@/components/ui/input"
import * as React from "react"
import {type Project} from "@/_temp_types/projects"
import {useContext} from "react"
import {ProjectSetDetailContext} from "@/app/project-sets/[projectSetId]/(components)/ProjectSetDetailContextProvider"
import {useRouter} from "next/navigation"

export type NumProjectsSubtitleProps = {
    project: Project
    projectSetId: number
}

export function NumProjectsSubtitle({project, projectSetId}: NumProjectsSubtitleProps) {
    const router = useRouter()
    const {isEditMode} = useContext(ProjectSetDetailContext)

    async function handleUpdateNumTeamsPerProject(numOfTeams: number) {
        const updateURL = new URL(`/api/v1/teamset-templates/${projectSetId}/team-templates/${project.id}/`, process.env.BACKEND_BASE_URI as string)
        console.log(updateURL)
        return fetch(updateURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number_of_teams: numOfTeams,
            }),
        })
    }

    return (
        <>
            <Text element="p" as="smallText">
                This project can be completed by&nbsp;
            </Text>
            {isEditMode ? (
                <Input
                    className="w-8 text-center h-fit text-foreground text-sm font-medium leading-none border-0 border-b p-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent focus-visible:outline-none"
                    defaultValue={project.numberOfTeams}
                    onBlur={(e) => {
                        if (!isNaN(parseInt(e.target.value))) {
                            handleUpdateNumTeamsPerProject(parseInt(e.target.value))
                                .then(() => router.refresh())
                                .catch((err) => console.error(err))
                        }
                    }}
                />
            ) : (
                <Text element="p" as="smallText">
                    {project.numberOfTeams}
                </Text>
            )}
            <Text element="p" as="smallText" className="">
                &nbsp;team{project.numberOfTeams > 1 && 's'}.
            </Text>
        </>
    )
}
