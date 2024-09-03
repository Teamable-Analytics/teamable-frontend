"use client"

import PageView from "@/components/views/Page"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useListTeamSets } from "@/hooks/use-list-team-sets"
import { DataTable } from "@/components/ui/data-table"
import React from "react"
import { TeamSet } from "@/_temp_types/teamSet"
import { columns } from "@/app/(app)/course/[courseId]/team-sets/columns"
import { useRouter } from "next/navigation"
import { useGenerateTeams } from "@/hooks/use-generate-teams"

export default function TeamSetListPage() {
  const { courseId } = useCourse()
  const { data, refetch } = useListTeamSets()
  const router = useRouter()

  const { generateTeamsAsync, isPending } = useGenerateTeams()

  const rowAction = (row: Omit<TeamSet, "teams">) => {
    router.push(`/course/${courseId}/team-sets/${row.id}`)
  }

  return (
    <PageView
      title={"Team sets"}
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Team sets", href: `/course/${courseId}/team-sets/` },
      ]}
      actions={[
        {
          onClick: async () => {
            await generateTeamsAsync(undefined)
            void refetch()
          },
          content: "Generate teams",
          loading: isPending,
        },
      ]}
    >
      <DataTable<Omit<TeamSet, "teams">>
        columns={columns}
        data={data?.team_sets ?? []}
        isPaginated={false}
        searchBarOptions={{
          placeholder: "Search for a team set",
          searchColumn: "name",
        }}
        rowAction={rowAction}
      />
    </PageView>
  )
}
