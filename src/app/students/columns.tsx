"use client"

import {Student} from "@/types/Student"
import {ColumnDef} from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge"
import {DataTableColumnHeader} from "@/components/ui/table-column-header"
import {Checkbox} from "@/components/ui/checkbox"
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
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Student Name" hasDropDownMenu={false}/>
        ),
    },
    {
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Student ID" hasDropDownMenu={false} className = "flex-0"/>
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
