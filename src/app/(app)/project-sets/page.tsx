import React from "react"
import { DataTable } from "@/components/ui/data-table"
import PageView from "@/components/views/Page"
import { type ApiTeamSetTemplate } from "@/_temp_types/api/teams"
import { type ProjectSet } from "@/_temp_types/projectSet"
import { redirect } from "next/navigation"
import { columns } from "./columns"

async function getProjectSetsData(): Promise<ProjectSet[]> {
  const response = await fetch(process.env.BACKEND_URL + "/api/v1/teamset-templates",)
  if (!response.ok) {
    throw new Error("Unable to fetch project sets from API.")
  }
  const teamSets = await response.json()
  return teamSets.map(({ id, name, teams }: ApiTeamSetTemplate) =>
      ({
        id,
        name,
        numProjects: teams.length,
      }) as ProjectSet,)
}

async function ProjectSetsPage() {
  const handleRowClick = async (row: ProjectSet) => {
    "use server"
    redirect(`/project-sets/${row.id}`)
  }

  return (
    <PageView
      title="Project Sets"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Project Sets", href: "/project-sets" },
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
