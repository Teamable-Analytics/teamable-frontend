"use client"

import { Student } from "@/types/Student"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table-column-header"
import { Checkbox } from "@/components/ui/checkbox"

export const generateColumns = (sections: { label: string; value: string }[] = []) => {
    const columns: ColumnDef<Student>[] = [
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
            id: "firstName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" hasDropDownMenu={false}/>,
            accessorFn: (row) => row.name.split(',')[1], // Assuming the first part is the first name
            cell: ({ getValue }) => <div className="text-left font-sm">{String(getValue())}</div>,
        },
        {
            id: "lastName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" hasDropDownMenu={false}/>,
            accessorFn: (row) => row.name.split(',')[0],
            cell: ({ getValue }) => <div className="text-left font-sm">{String(getValue())}</div>,
        },
        {
            accessorKey: "id",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Student ID" hasDropDownMenu={false}/>,
            cell: ({ row }) => <div className="text-left font-sm">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "sections",
            header: ({column}) => <DataTableColumnHeader column={column} title="Sections" hasDropDownMenu={false}/>,
            cell: ({ row }) => {
                const sections = row.getValue("sections") as string[]
                const sectionBadges = sections?.map((section) => (
                    <Badge key={section} variant="outline" className="text-s text-muted-foreground">
                        {section}
                    </Badge>
                ))
                return <div className="flex flex-row gap-1">
                    {sectionBadges}
                </div>
            },
        },
    ]

    return columns
}
