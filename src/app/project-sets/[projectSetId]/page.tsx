import * as React from "react"
import {Text} from "@/components/ui/text"
import {type Project, ProjectRequirement, ProjectSet} from "@/_temp_types/projects"
import {Button} from "@/components/ui/button"
import {DataTable} from "@/components/ui/data-table"
import {mutableColumnDefs, persistedColumnDefs} from "@/app/project-sets/[projectSetId]/columns"
import {redirect} from "next/navigation"
import {Input} from "@/components/ui/input"
import {ApiTeamSetTemplate} from "@/_temp_types/api/teams"
import {toast} from "@/components/ui/use-toast"
import {ProjectSetSelect} from "@/app/project-sets/[projectSetId]/(components)/projectSetSelect"
import {SidebarProjectsDisplay} from "@/app/project-sets/[projectSetId]/(components)/sidebarProjectsDisplay"
import {EditModeButton} from "@/app/project-sets/[projectSetId]/(components)/editModeButton"

async function getRawProjectSetsData(): Promise<ApiTeamSetTemplate[]> {
    const response = await fetch(process.env.BACKEND_URL + '/api/v1/teamset-templates')
    if (!response.ok) {
        throw new Error('Unable to fetch project sets from API.')
    }
    return response.json()
}

type ProjectPageParams = {
    params: {
        projectSetId: string
    },
    searchParams?: { [key: string]: string | undefined }
}

async function ProjectPage({params, searchParams}: ProjectPageParams) {
    const {projectSetId} = params
    const isEditMode = searchParams?.isEdit?.toLowerCase() === 'true' ?? false
    const currentProjectIdx = searchParams?.projectIdx ? parseInt(searchParams.projectIdx) : 0
    const sidebarSearchTerm = searchParams?.search ?? ''

    const rawProjectSets = await getRawProjectSetsData()
    const currentProjectSetIndex = rawProjectSets.findIndex((projectSet) => projectSet.id.toString() === projectSetId)

    if (currentProjectSetIndex === -1) {
        toast({
            title: "Project set not found.",
            variant: "destructive",
        })
        redirect('/project-sets')
    }

    const allProjectSets: ProjectSet[] = rawProjectSets.map(({id, name, teams}) => ({
        id,
        name,
        numProjects: teams.length,
    }))

    const rawCurrentProjectSet = rawProjectSets[currentProjectSetIndex]
    const currentProjectSet: ProjectSet = {
        id: rawCurrentProjectSet.id,
        name: rawCurrentProjectSet.name,
        numProjects: rawCurrentProjectSet.teams.length,
    }

    const allProjects: Project[] = rawCurrentProjectSet.teams.map((team): Project => ({
        id: team.id,
        name: team.name,
        numberOfTeams: team.number_of_teams,
        requirements: [],
    }))
    const displayProjects = allProjects.filter((project) => project.name.toLowerCase().includes(sidebarSearchTerm.toLowerCase()))

    console.log(currentProjectIdx)
    const currentProject: Project = displayProjects[currentProjectIdx]

    const columns = isEditMode ? mutableColumnDefs : persistedColumnDefs

    return (
        <div className="container mx-auto py-10">
            <div className="flex w-full gap-10">
                {/* Left side */}
                <div className="max-w-96 min-w-60">
                    <div className="flex flex-col w-full">
                        <div>
                            <Text element="h5" as="h5" className="pb-2">
                                Project Set
                            </Text>
                            <div className="pr-4">
                                <ProjectSetSelect
                                    allProjectSets={allProjectSets}
                                    currentProjectSetId={parseInt(projectSetId)}
                                />
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <Text element="h5" as="h5" className="pb-2">
                                Projects
                            </Text>
                            <div className="w-full">
                                <SidebarProjectsDisplay
                                    projects={displayProjects}
                                    currentProjectIdx={currentProjectIdx}
                                    currentSearchTerm={sidebarSearchTerm}
                                    currentEditMode={isEditMode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Vertical Separator */}
                <div className="border-r border-gray-300 h-[85vh]"/>

                {/* Right side */}
                <div className="w-full">
                    {currentProject ? <>
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center">
                                <Text as="h3" element="h3">
                                    {currentProject.name}
                                </Text>
                                <div className="flex items-center gap-2">
                                    <EditModeButton
                                        currentEditMode={isEditMode}
                                        currentProjectIdx={currentProjectIdx}
                                        currentSearchTerm={sidebarSearchTerm}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <Text element="p" as="smallText">
                                    This project can be completed by&nbsp;
                                </Text>
                                {isEditMode ? (
                                    <Input
                                        className="w-8 text-center h-fit text-foreground text-sm font-medium leading-none border-0 border-b p-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent focus-visible:outline-none"
                                        defaultValue={currentProject.numberOfTeams}
                                        // onBlur={(e) => {
                                        //     if (!isNaN(parseInt(e.target.value))) {
                                        //         handleUpdateNumTeamsPerProject(parseInt(e.target.value))
                                        //     }
                                        // }}
                                    />
                                ) : (
                                    <Text element="p" as="smallText">
                                        {currentProject.numberOfTeams}
                                    </Text>
                                )}
                                <Text element="p" as="smallText" className="">
                                    &nbsp;team(s).
                                </Text>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5">
                            <div className="flex justify-between items-end">
                                <Text as="p" element="p" className="font-bold">
                                    Requirements
                                </Text>
                                <Button size="sm">Add requirements</Button>
                            </div>
                            <div>
                                <DataTable<ProjectRequirement>
                                    columns={columns}
                                    data={currentProject?.requirements ?? []}
                                />
                            </div>
                        </div>
                    </> : (
                        <div>
                            No project found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    async function handleUpdateNumTeamsPerProject(numOfTeams: number) {
        const res = await fetch(process.env.BACKEND_URL + '/api/v1/teamset-templates/' + currentProjectSet.id + '/teams/' + currentProject.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number_of_teams: numOfTeams,
            }),
        })

        // TODO: check res
        console.log(res)
    }
}

export default ProjectPage
