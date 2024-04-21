"use client"

import { type ColumnDef } from "@tanstack/table-core"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export type DummyData = {
  id: number;
  name: string;
  numericValue: number;
};

export const columns: ColumnDef<DummyData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Name"} />
    ),
  },
  {
    accessorKey: "numericValue",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"Something numeric (most likely 😳)"}
      />
    ),
  },
]
