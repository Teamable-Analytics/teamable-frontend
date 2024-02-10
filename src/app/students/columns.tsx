"use client"

import {Student} from "@/types/Student"
import {ColumnDef} from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge"
import {DataTableColumnHeader} from "@/components/ui/table-column-header"
import {Checkbox} from "@/components/ui/checkbox"
import {Text} from "@/components/ui/text"
import {Demo} from "./multiselect-demo"

export const columns: ColumnDef<Student>[] = [
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
    // First Name column
    {
        id: "firstName", // unique ID for the column
        header: ({column}) => <DataTableColumnHeader column={column} title="First Name" hasDropDownMenu={false}/>,
        accessorFn: (row) => row.name.split(' ')[0], // Assuming the first part is the first name
        cell: ({getValue}) => <div>{String(getValue())}</div>,
    },
    // Last Name column
    {
        id: "lastName", // unique ID for the column
        header: ({column}) => <DataTableColumnHeader column={column} title="Last Name" hasDropDownMenu={false}/>,
        accessorFn: (row) => {
            const parts = row.name.split(' ')
            return parts.length > 1 ? parts.slice(1).join(' ') : '' // Assuming the rest is the last name
        },
        cell: ({getValue}) => <div>{String(getValue())}</div>,
    },
    {
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Student ID" hasDropDownMenu={false}/>
        ),
        cell: ({row}) => {
            return <div className="text-left font-medium">{row.getValue("id")}</div>
        },
    },
    {
        accessorKey: "sections",
        header: Demo,
        cell: ({row}) => {
            const sections = row.getValue("sections") as string[]
            const sectionBadges = sections?.map((section) => (
                <Badge key={section} variant="outline" className="text-xs text-muted-foreground">
                    {section}
                </Badge>
            ))
            return <div className="flex flex-row gap-1">
                {sectionBadges}
            </div>
        },
    },
]
