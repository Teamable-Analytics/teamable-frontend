'use client'

import * as React from "react"
import {Text} from "@/components/ui/text"
import {type Project, ProjectRequirement, ProjectSet, RequirementOperator} from "@/_temp_types/projects"
import {Button} from "@/components/ui/button"
import {DataTable} from "@/components/ui/data-table"
import {editableColumns, uneditableColumns} from "./columns"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useRouter} from "next/navigation"
import {SearchBar} from '@/components/SearchBar'
import {Input} from "@/components/ui/input"
import { Pencil1Icon, FileIcon } from "@radix-ui/react-icons"

type ProjectPageParams = {
    params: {
        projectSetId: string
    }
}

function ProjectPage({params}: ProjectPageParams) {
    const {projectSetId} = params
    const router = useRouter()

    const [allProjectSets, setAllProjectSets] = React.useState<ProjectSet[]>([])
    const [currentProjectSet, setCurrentProjectSet] = React.useState<ProjectSet>()

    const [allProjects, setAllProjects] = React.useState<Project[]>([])
    const [displayProjectsSidebar, setDisplayProjectsSidebar] = React.useState<Project[]>([])
    const [currentProject, setCurrentProject] = React.useState<Project>()

    const [projectSearchText, setProjectSearchText] = React.useState<string>('')

    const [isEditMode, setIsEditMode] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!projectSetId) return

        const allProjectSetsData: ProjectSet[] = getAllProjectSets()
        setAllProjectSets(allProjectSetsData)

        const currentProjectSetIdx = allProjectSetsData.findIndex((projectSet) => projectSet.id.toString() === projectSetId)
        if (currentProjectSetIdx === -1) return

        setCurrentProjectSet(allProjectSetsData[currentProjectSetIdx])

        const allProjectsData = getProjects(projectSetId)
        setAllProjects(allProjectsData)
        if (allProjectsData.length > 0) {
            setCurrentProject(allProjectsData[0])
        }
    }, [projectSetId])

    React.useEffect(() => {
        if (!projectSearchText) {
            setDisplayProjectsSidebar(allProjects)
        }

        const filteredProjects = allProjects.filter((project) => project.name.toLowerCase().includes(projectSearchText.toLowerCase()))
        setDisplayProjectsSidebar(filteredProjects)
    }, [allProjects, projectSearchText])

    const columns = React.useMemo(() => {
        return isEditMode && !!handleUpdatedProjectRequirement
            ? editableColumns({ handleChange: handleUpdatedProjectRequirement })
            : uneditableColumns()
    }, [handleUpdatedProjectRequirement, isEditMode])

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
                                <Select
                                    value={currentProjectSet?.id?.toString()}
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
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <Text element="h5" as="h5" className="pb-2">
                                Projects
                            </Text>
                            <div className="w-full">
                                <SearchBar
                                    className="ml-0"
                                    placeholder="Search Projects"
                                    value={projectSearchText}
                                    onChange={(e) => setProjectSearchText(e.target.value)}
                                />
                                <div className="flex flex-col w-full mt-2 gap-1 pr-4">
                                    {displayProjectsSidebar.map((project) => (
                                        <Button
                                            className="justify-start"
                                            variant={project.id === currentProject?.id ? "secondary" : "ghost"}
                                            key={project.id} onClick={() => handleProjectChanged(project)}
                                        >
                                            {project.name}
                                        </Button>
                                    ))}
                                </div>
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
                                    {isEditMode ? (
                                        <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>
                                            <FileIcon className="mr-2" />
                                            Save changes
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)}>
                                            <Pencil1Icon className="mr-2" />
                                            Edit mode
                                        </Button>
                                    )}
                                    <Button variant="destructive" size="sm">Delete Project</Button>
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
                                        onBlur={(e) => {
                                            if (!isNaN(parseInt(e.target.value))) {
                                                handleUpdateNumTeamsPerProject(parseInt(e.target.value))
                                            }
                                        }}
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
                    </> : <div>Loading...</div>}
                </div>
            </div>
        </div>
    )

    function handleProjectSetChanged(newProjectSetId: string) {
        router.push(`/project/${newProjectSetId}`)
    }

    function handleProjectChanged(project: Project) {
        setCurrentProject(project)
    }

    function handleUpdatedProjectRequirement(updatedRequirement: ProjectRequirement) {
        const newRequirements = currentProject?.requirements?.findIndex((requirement) => requirement.id === updatedRequirement.id) ?? -1
        if (newRequirements === -1) return

        const updatedRequirements = [...currentProject?.requirements ?? []]
        updatedRequirements[newRequirements] = updatedRequirement

        // TODO: API call to update the project requirements
        setCurrentProject({
            ...currentProject,
            requirements: updatedRequirements,
        } as Project)
    }

    function handleUpdateNumTeamsPerProject(numOfTeams: number) {
        setCurrentProject({
            ...currentProject,
            numberOfTeams: numOfTeams,
        } as Project)
    }
}

function getProjects(projectSetId: string): Project[] {
    return [
        {
            id: 1,
            name: "Project 1",
            numberOfTeams: 3,
            requirements: [
                {
                    id: 1,
                    attribute: 1,
                    operator: RequirementOperator.MORE_THAN,
                    value: 2,
                },
                {
                    id: 2,
                    attribute: 2,
                    operator: RequirementOperator.EXACTLY,
                    value: 1,
                },
                {
                    id: 3,
                    attribute: 3,
                    operator: RequirementOperator.LESS_THAN,
                    value: 3,
                },
            ],
        },
        {
            id: 2,
            name: "Project 2",
            numberOfTeams: 10,
            requirements: [
                {
                    id: 4,
                    attribute: 1,
                    operator: RequirementOperator.EXACTLY,
                    value: 2,
                },
                {
                    id: 5,
                    attribute: 2,
                    operator: RequirementOperator.MORE_THAN,
                    value: 1,
                },
                {
                    id: 6,
                    attribute: 3,
                    operator: RequirementOperator.EXACTLY,
                    value: 3,
                },
            ],
        },
    ]
}

function getAllProjectSets(): ProjectSet[] {
    return [
        {
            id: 1,
            name: "Project Set 1",
        },
        {
            id: 2,
            name: "Project Set 2",
        },
    ]
}

export default ProjectPage
