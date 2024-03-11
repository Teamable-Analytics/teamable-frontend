"use client"

import { Student } from "@/_temp_types/student"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table-column-header"

type SectionFilterValue = string[];

export const columns: ColumnDef<Student>[] = [
    {
        id: "firstName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" hasDropDownMenu={false}/>,
        accessorFn: (row) => row.name.split(',')[1],
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
        cell: ({ row }) => (
            <div className="flex flex-row gap-2">
                {(row.getValue("sections") as string[])?.map((section) => (
                    <Badge key={section} variant="secondary" className="rounded-sm px-1 font-normal">
                        {section}
                    </Badge>
                ))}
            </div>
        ),
        filterFn: (row, id, filterValues: SectionFilterValue) => {
            const rowSections = row.getValue(id) as string[]
            return filterValues.some(filterValue => rowSections.includes(filterValue))
        },
    },
]
