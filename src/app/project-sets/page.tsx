'use client'

import React from "react"
import {columns, type ProjectSet} from "@/app/project-sets/columns"
import {DataTable} from "@/components/ui/data-table"
import PageView from "@/components/views/Page"
import {type ApiProjectSet} from "../../../types/api/teams"
import {useRouter} from "next/navigation"

async function getProjectSetsData(): Promise<ProjectSet[]> {
    const response = await fetch(process.env.DJANGO_BACKEND_URI + '/api/v1/teamset-templates')
    if (!response.ok) {
        throw new Error('Unable to fetch project sets from API.')
    }
    const teamSets = await response.json()
    return teamSets.map(({id, name, teams}: ApiProjectSet) => ({
        id,
        name,
        numProjects: teams.length,
    } as ProjectSet))
}

function ProjectSetsPage() {
    const router = useRouter()

    const handleRowClick = (row: ProjectSet) => {
        router.push(`/project/${row.id}`)
    }

    const [projectSets, setProjectSets] = React.useState<ProjectSet[]>([])
    React.useEffect(() => {
        getProjectSetsData().then(setProjectSets).catch(console.error)
    }, [])

    return (
        <PageView
            title="Project Sets"
            breadcrumbs={[
                {title: 'Home', href: '/'},
                {title: 'Project Sets', href: '/project-sets'},
            ]}
        >
            <>
                <DataTable<ProjectSet>
                    columns={columns}
                    data={projectSets}
                    searchBarOptions={{
                        placeholder: "Search Project Set",
                        searchColumn: "name",
                    }}
                    rowAction={handleRowClick}
                />
            </>
        </PageView>
    )
}

export default ProjectSetsPage
