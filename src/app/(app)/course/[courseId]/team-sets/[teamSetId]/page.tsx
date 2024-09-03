"use client"

import PageView from "@/components/views/Page"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useParams } from "next/navigation"
import { useTeamSet } from "@/hooks/use-team-set"
import { useExportTeamSetLms } from "@/hooks/use-export-team-set-lms"
import { title } from "../../../../../../../utils/string"
import { TeamSet } from "@/_temp_types/teamSet"
import { DataTable } from "@/components/ui/data-table"
import React from "react"
import { Team } from "@/_temp_types/team"
import { columns } from "@/app/(app)/course/[courseId]/team-sets/[teamSetId]/columns"

export default function TeamSetDetailPage() {
  const { teamSetId } = useParams<{ teamSetId: `${number}` }>()
  const { courseId, lmsType } = useCourse()
  const { data: teamSet, isLoading } = useTeamSet({
    teamSetId: Number(teamSetId),
  })
  const { exportTeamSetAsync, isPending } = useExportTeamSetLms()

  if (!teamSetId || isLoading || !teamSet) return null

  return (
    <PageView
      title={teamSet.name}
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Team sets", href: `/course/${courseId}/team-sets/` },
        {
          title: teamSet.name,
          href: `/course/${courseId}/team-sets/${teamSetId}`,
        },
      ]}
      actions={[
        {
          onClick: () => exportTeamSetAsync({ teamSet: Number(teamSetId) }),
          content: `Export to ${title(lmsType)}`,
          loading: isPending,
        },
      ]}
    >
      <DataTable<Team>
        columns={columns}
        isPaginated={false}
        data={teamSet.teams ?? []}
        searchBarOptions={{
          placeholder: "Search for a team or student",
          searchColumn: "name",
        }}
      />
    </PageView>
  )
}
