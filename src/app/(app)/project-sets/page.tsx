import React from "react"
import {columns} from "@/app/(app)/project-sets/columns"
import {DataTable} from "@/components/ui/data-table"
import PageView from "@/components/views/Page"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"
import {redirect} from "next/navigation"
import {type ProjectSet} from "@/_temp_types/projects"

const getProjectSetsData = async (): Promise<ProjectSet[]> => {
  const projectSetsURL = new URL('/api/v1/teamset-templates', process.env.NEXT_PUBLIC_BACKEND_URL as string)
  const response = await fetch(projectSetsURL)
  if (!response.ok) {
    throw new Error('Unable to fetch project sets from API.')
  }
  const teamSets = await response.json()
  return teamSets.map(({id, name, teams}: ApiTeamSetTemplate): ProjectSet => ({
    id,
    name,
    numProjects: teams.length,
  }))
}

const ProjectSetsPage = async () => {

  const handleRowClick = async (row: ProjectSet) => {
    "use server"
    redirect(`/project-sets/${row.id}`)
  }

  return (
    <PageView
      title="Project Sets"
      breadcrumbs={[
        {title: 'Home', href: '/'},
        {title: 'Project Sets', href: '/project-sets'},
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
