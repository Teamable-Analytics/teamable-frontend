import { ColumnDef } from "@tanstack/table-core"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Team } from "@/_temp_types/team"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Name"} />
    ),
    filterFn: (row, columnId, filterValue) => {
      const memberNames = row.original.members.map(m => m.name).join(",")
      const searchableRowContent = `${row.original.name} ${memberNames}`
      return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase())
    },
  },
  {
    id: "students",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Students"} />
    ),
    accessorFn: (row) => row.members.map((m) => m.name),
    cell: ({ getValue }) => {
      const members = getValue() as Team["members"]
      return (
        <>
          {members.map((member) => (
            <Badge key={member.id} variant="secondary">
              {String(getValue())}
            </Badge>
          ))}
        </>
      )
    },
  },
]
