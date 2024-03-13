"use client"

import { Student } from "@/_temp_types/student"
import { ColumnDef } from "@tanstack/react-table"
import { Text } from "@/components/ui/text"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table-column-header"

type SectionFilterValue = string[];

export const columns: ColumnDef<Student>[] = [
    {
        id: "firstName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" hasDropDownMenu={false}/>,
        accessorFn: (row) => row.name.split(',')[1],
        cell: ({ getValue }) => <Text element="p" as="smallText" >{String(getValue())}</Text>,
    },
    {
        id: "lastName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" hasDropDownMenu={false}/>,
        accessorFn: (row) => row.name.split(',')[0],
        cell: ({ getValue }) => <Text element="p" as="smallText" >{String(getValue())}</Text>,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Student ID" hasDropDownMenu={false}/>,
        cell: ({ row }) => <Text element="p" as="smallText" >{row.getValue("id")}</Text>,
    },
    {
        accessorKey: "sections",
        header: ({column}) => <DataTableColumnHeader column={column} title="Sections" hasDropDownMenu={false}/>,
        cell: ({ row }) => (
            <div className="flex flex-row gap-2">
                {(row.getValue("sections") as string[])?.map((section) => (
                    <Badge key={section} variant="secondary" className="rounded-sm">
                        <Text element="p" as="mutedText" >{section}</Text>
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

