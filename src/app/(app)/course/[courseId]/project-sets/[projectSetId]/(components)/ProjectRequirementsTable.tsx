'use client'

import {DataTable} from "@/components/ui/data-table"
import {ProjectRequirement} from "@/_temp_types/projects"
import {ColumnDef} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/ui/data-table-column-header"
import {
  useProjectsContext,
} from "@/app/(app)/course/[courseId]/project-sets/[projectSetId]/(hooks)"

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
  },
  {
    accessorKey: "value",
    header: "Value",
  },
]

export const ProjectRequirementsTable = () => {
  const columns = persistedColumnDefs

  const {currentProject} = useProjectsContext()

  return <DataTable<ProjectRequirement>
    columns={columns}
    data={currentProject?.requirements ?? []}
  />
}
