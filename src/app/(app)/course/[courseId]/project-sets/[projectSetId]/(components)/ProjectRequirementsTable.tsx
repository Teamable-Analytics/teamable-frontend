'use client'

import {DataTable} from "@/components/ui/data-table"
import {Text} from "@/components/ui/text"
import {ProjectRequirement, RequirementOperator} from "@/_temp_types/projects"
import {ColumnDef} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/ui/data-table-column-header"
import {
  useProjectsContext,
} from "@/app/(app)/course/[courseId]/project-sets/[projectSetId]/(hooks)"
import {toast} from "@/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {Pencil1Icon, ExitIcon} from "@radix-ui/react-icons"

const persistedColumnDefs: ColumnDef<ProjectRequirement>[] = [
  {
    accessorKey: "attribute",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"Attribute"}/>
    ),
  },
  {
    accessorKey: "operator",
    header: "Operator",
    cell: ({row}) => {
      const operator = row.original.operator
      // Check if operator is a valid RequirementOperator
      if (!Object.keys(RequirementOperator).includes(operator as RequirementOperator)) {
        toast({
          title: `Invalid operator "${operator}" in Project Requirement.`,
          variant: "destructive",
        })
        return null
      }
      return RequirementOperator[operator as string as keyof typeof RequirementOperator]
    },
  },
  {
    accessorKey: "subject",
    header: "Value",
  },
]

export const ProjectRequirementsTable = () => {
  const columns = persistedColumnDefs

  const {currentProject} = useProjectsContext()
  // TODO: Implement edit mode
  const [isEditing, setIsEditing] = useState(false)


  // TODO: Implement conversion of Attribute and Attribute Value.
  return (
    <div className="w-full">
      {currentProject ? <>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <Text as="h3" element="h3">
              {currentProject.name}
            </Text>
            <div className="flex items-center gap-2">
              {/* TODO: Implement edit mode */}
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                  <>
                    <ExitIcon className="mr-2"/> Exit Edit Mode
                  </>
                ) : (
                  <>
                    <Pencil1Icon className="mr-2"/> Enter Edit Mode
                  </>
                )}

              </Button>
            </div>
          </div>
          <div className="flex items-center mt-2">
            {/* TODO: Implement edit mode */}
            <Text element="p" as="smallText">
              This project can be completed
              by {currentProject.number_of_teams} team{currentProject.number_of_teams > 1 && 's'}.
            </Text>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex justify-between items-end">
            <Text as="p" element="p" className="font-bold">
              Requirements
            </Text>
            {isEditing && <Button size="sm">Add requirements</Button>}
          </div>
          <div>
            <DataTable<ProjectRequirement>
              columns={columns}
              data={currentProject?.requirements ?? []}
            />
          </div>
        </div>
      </> : (
        <div>
          No project found.
        </div>
      )}
    </div>)
}
