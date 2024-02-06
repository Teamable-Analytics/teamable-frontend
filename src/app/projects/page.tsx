'use client'

import * as React from "react"
import {Typography} from "@/components/ui/typography"
import {columns, type ProjectSet} from "@/app/projects/columns"
import {DataTable} from "@/app/projects/data-table"

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
            <Typography as="h1" element="h1" className="">
                Project Sets
            </Typography>
            <div>
                <DataTable columns={columns} data={projectSets}/>
            </div>
        </div>
    )
}

export default ProjectsPage
