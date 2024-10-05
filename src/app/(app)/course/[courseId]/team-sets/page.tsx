"use client"

import PageView from "@/components/views/Page"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useListTeamSets } from "@/hooks/use-list-team-sets"
import { DataTable } from "@/components/ui/data-table"
import React, { useState } from "react"
import { TeamSet } from "@/_temp_types/teamSet"
import { columns } from "@/app/(app)/course/[courseId]/team-sets/columns"
import { useRouter } from "next/navigation"
import { useGenerateTeams } from "@/hooks/use-generate-teams"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { GradeSourceAttributeSelector } from "@/components/GradeSourceAttributeSelector"
import { Button } from "@/components/ui/button"

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
  const [selectedGradeAttribute, setSelectedGradeAttribute] = useState<
    { id: number; name: string } | undefined
  >()

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
      <Dialog open={selectGradeSourceDialogOpen} onOpenChange={setSelectGradeSourceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a grade source</DialogTitle>
            <DialogDescription>
              Please select a grade attribute to use for team generation.
            </DialogDescription>
          </DialogHeader>
          <GradeSourceAttributeSelector
            onSelect={async ({ gradeAttribute }) => {
              setSelectedGradeAttribute(gradeAttribute)
            }}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedGradeAttribute}
              loading={isPending}
              onClick={async () => {
                if (!selectedGradeAttribute) return
                await generateTeamsAsync({
                  attribute: selectedGradeAttribute.id,
                })
                void refetch()
                setSelectGradeSourceDialogOpen(false)
              }}
            >
              Generate teams
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageView>
  )
}
