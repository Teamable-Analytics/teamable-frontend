"use client"

import {type ColumnDef} from "@tanstack/table-core"
import {Checkbox} from "@/components/ui/checkbox"
import {DataTableColumnHeader} from "@/components/ui/data-table-column-header"
import {type ProjectSet} from "../../_temp_types/projectSet"

export const columns: ColumnDef<ProjectSet>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={"Project Set Name"} />
        ),
    },
    {
        accessorKey: "numProjects",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={"Number of Projects"} />
        ),
    },
]
