"use client"

import {Student} from "@/types/Student"
import {ColumnDef} from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge"
import {DataTableColumnHeader} from "@/components/ui/table-column-header"
import {Checkbox} from "@/components/ui/checkbox"
import { SectionsComboBox } from "./sections-combo-box"
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
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Student ID" hasDropDownMenu={false}/>
        ),
        cell: ({row}) => {
            return <div className="text-left font-medium">{row.getValue("id")}</div>
        },
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Student Name" hasDropDownMenu={false}/>
        ),
    },
    {
        accessorKey: "sections",
        header: Demo,
        cell: ({row}) => {
            const sections = row.getValue("sections") as string[]
            const sectionBadges = sections?.map((section) => (
                <Badge key={section} variant="secondary">
                    {section}
                </Badge>
            ))
            return <div className="flex flex-row gap-1">
                {sectionBadges}
            </div>
        },
    },

]
