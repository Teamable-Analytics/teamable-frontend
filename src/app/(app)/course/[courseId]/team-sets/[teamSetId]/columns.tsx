import { ColumnDef } from "@tanstack/table-core"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Team } from "@/_temp_types/team"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"Name"}
        hasDropDownMenu={false}
      />
    ),
    filterFn: (row, columnId, filterValue) => {
      const memberNames = row.original.members.map((m) => m.name).join(",")
      const searchableRowContent = `${row.original.name} ${memberNames}`
      return searchableRowContent
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    },
    cell: ({ row, getValue }) => {
      if (row.original.slug === "unassigned-students") {
        return (
          <div className="flex flex-col gap-2">
            <Text element="p">{String(getValue())}</Text>
            <Text element="p" as="mutedText">
              These students are unassigned and are not treated as a team.
            </Text>
          </div>
        )
      }

      return <Text element="p">{String(getValue())}</Text>
    },
  },
  {
    id: "students",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"Students"}
        hasDropDownMenu={false}
      />
    ),
    accessorFn: (row) => row.members,
    cell: ({ getValue }) => {
      const members = getValue() as Team["members"]
      return (
        <div className="flex flex-wrap gap-2">
          {members.map((member) => (
            <Badge
              key={member.id}
              variant="secondary"
              className="group rounded-sm hover:bg-zinc-700 hover:cursor-pointer transition-colors duration-300"
              onClick={() => {
                if (!member.lms_link) return
                window.open(member.lms_link, "_blank")
              }}
            >
              <Text
                element="p"
                className="group-hover:text-white text-sm transition-colors duration-300"
              >
                {member.name}
              </Text>
            </Badge>
          ))}
        </div>
      )
    },
    enableSorting: false,
  },
]
