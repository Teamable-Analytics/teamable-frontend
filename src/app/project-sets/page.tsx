import React from "react"
import {columns, type ProjectSet} from "@/app/project-sets/columns"
import {DataTable} from "@/components/ui/data-table"
import PageView from "@/components/views/Page"
import {type ApiProjectSet} from "../../../types/api/teams"

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

async function ProjectSetsPage() {
    return (
        <PageView
            title="Project Sets"
            breadcrumbs={[
                {title: 'Home', href: '/'},
                {title: 'Project Sets', href: '/project-sets'},
            ]}
        >
            <>
                <DataTable
                    columns={columns}
                    data={await getProjectSetsData()}
                    searchBarOptions={{
                        placeholder: "Search Project Set",
                        searchColumn: "name",
                    }}
                />
            </>
        </PageView>
    )
}

export default ProjectSetsPage
