'use client'

import * as React from "react"
import {columns, type ProjectSet} from "@/app/project-sets/columns"
import { DataTable } from "@/components/ui/data-table"
import {Text} from "@/components/ui/text"

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

function ProjectsPage() {
    const [projectSets, setProjectSets] = React.useState<ProjectSet[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getData()
            setProjectSets(data)
        }
        fetchData().catch(console.error)
    }, [])

    return (
        <div className="container mx-auto py-10">
            <Text as="h1" element="h1">
                Project Sets
            </Text>
            <div>
                <DataTable
                    columns={columns}
                    data={projectSets}
                    searchBarOptions={{
                        placeholder: "Search Project Set",
                        searchColumn: "name",
                    }}/>
            </div>
        </div>
    )
}

export default ProjectsPage
