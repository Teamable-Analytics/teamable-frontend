import React from "react"
import {DataTable} from "@/components/ui/data-table"
import PageView from "@/components/views/Page"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"
import {type ProjectSet} from "@/_temp_types/projectSet"
import {redirect} from "next/navigation"
import {columns} from "./columns"

const getProjectSetsData = async (): Promise<ProjectSet[]> => {
  const projectSetsURL = new URL('/api/v1/teamset-templates', process.env.NEXT_PUBLIC_BACKEND_URL) + "?detailed=true"
  const response = await fetch(projectSetsURL)
  if (!response.ok) {
    throw new Error("Unable to fetch project sets from API.")
  }
  const teamSets = await response.json()
  return teamSets.map(({id, name, teams}: ApiTeamSetTemplate) =>
    ({
      id,
      name,
      numProjects: teams.length,
    }) as ProjectSet,)
}

type ProjectPageType = {
  params: {
    courseId: string,
  },
}

async function ProjectSetsPage({params: {courseId}}: ProjectPageType) {
  const handleRowClick = async (row: ProjectSet) => {
    "use server"
    redirect(`/course/${courseId}/project-sets/${row.id}`)
  }

  return (
    <PageView
      title="Project Sets"
      breadcrumbs={[
        {title: "Home", href: `/course/${courseId}}`},
        {title: "Project Sets", href: `/course/${courseId}/project-sets`},
      ]}
    >
      <DataTable<ProjectSet>
        columns={columns}
        data={await getProjectSetsData()}
        searchBarOptions={{
          placeholder: "Search for a project set",
          searchColumn: "name",
        }}
        rowAction={handleRowClick}
      />
    </PageView>
  )
}

export default ProjectSetsPage
