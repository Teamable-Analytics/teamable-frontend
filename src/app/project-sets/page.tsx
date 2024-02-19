import React from "react"
import {columns, type ProjectSet} from "@/app/project-sets/columns"
import {DataTable} from "@/components/ui/data-table"
import PageView from "@/components/views/Page"

async function getData(): Promise<ProjectSet[]> {
    // Fetch data from your API here.
    return Array.from(Array(21300)).map((_, index) => {
        const idx = index + 1
        // give me a random integer
        const numProjects = Math.floor(Math.random() * 100)
        return {
            id: index,
            name: "Project Set " + idx,
            numProjects: numProjects,
        }
    })
}

async function ProjectsPage() {
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
                    data={await getData()}
                    searchBarOptions={{
                        placeholder: "Search Project Set",
                        searchColumn: "name",
                    }}
                />
            </>
        </PageView>
    )
}

export default ProjectsPage
