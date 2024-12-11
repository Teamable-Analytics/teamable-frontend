"use client"

import { TeamSet } from "@/_temp_types/teamSet"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { GenerateTeamsAttributeSelector } from "@/app/(app)/course/[courseId]/components/GenerateTeamsAttributeSelector"
import { columns } from "@/app/(app)/course/[courseId]/team-sets/columns"
import { DataTable } from "@/components/ui/data-table"
import PageView from "@/components/views/Page"
import { useGenerateTeams } from "@/hooks/use-generate-teams"
import { useListTeamSets } from "@/hooks/use-list-team-sets"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TeamSetListPage() {
  const { courseId } = useCourse()
  const { data, refetch } = useListTeamSets()
  const router = useRouter()

  const { generateTeamsAsync, isPending } = useGenerateTeams()

  const rowAction = (row: Omit<TeamSet, "teams">) => {
    router.push(`/course/${courseId}/team-sets/${row.id}`)
  }

  const [selectGradeSourceDialogOpen, setSelectGradeSourceDialogOpen] =
    useState(false)

  return (
    <PageView
      title={"Team sets"}
      breadcrumbs={[
        { title: "Home", href: `/course/${courseId}/home` },
        { title: "Team sets", href: `/course/${courseId}/team-sets/` },
      ]}
      actions={[
        {
          onClick: async () => {
            setSelectGradeSourceDialogOpen(true)
          },
          content: "Generate teams",
          loading: isPending,
        },
      ]}
    >
      <DataTable<Omit<TeamSet, "teams">>
        columns={columns}
        data={data ?? []}
        isPaginated={false}
        searchBarOptions={{
          placeholder: "Search for a team set",
          searchColumn: "name",
        }}
        rowAction={rowAction}
      />
      <GenerateTeamsAttributeSelector
        open={selectGradeSourceDialogOpen}
        setOpen={setSelectGradeSourceDialogOpen}
        isPending={isPending}
        onSubmit={async ({ attribute }) => {
          await generateTeamsAsync({ attribute })
          void refetch()
        }}
      />
    </PageView>
  )
}
