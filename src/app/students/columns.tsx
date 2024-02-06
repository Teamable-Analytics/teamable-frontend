"use client"

import { Student } from "@/types/Student"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-left"> Student ID</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("id")}</div>
        },
    },
    {
        accessorKey: "name",
        header: () => <div className="text-left">Student Name</div>,
        cell: ({ row }) => {
            const name = row.getValue("name") as String
            const [lastName, firstName] = name.split(",")
            const formattedName = `${firstName} ${lastName}`
            const section = (row.original as Student).section
            return <div className="flex flex-row justify-between">
                <div className="text-left font-medium">{formattedName}</div>
                <Badge variant="outline">{section}</Badge>
            </div>
        },
    },

]
