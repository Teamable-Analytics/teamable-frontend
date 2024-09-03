import { ColumnDef } from "@tanstack/table-core"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {TeamSet} from "@/_temp_types/teamSet"

export const columns: ColumnDef<Omit<TeamSet, "teams">>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Name"} />
    ),
  },
]
