"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"

import { useStudents } from "@/app/students/(hooks)/useStudents"
import { StudentTableSectionsFilter } from "@/app/students/(table)/student-table-sections-filter"

type DataTableToolbarProps<TData> = {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const { allSections, setSearchQuery } = useStudents()
    return (
        <div className="flex items-center justify-between mt-2">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search students..."
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("sections") && (
                    <StudentTableSectionsFilter
                        column={table.getColumn("sections")}
                        title="Sections"
                        options={allSections ?? []}
                    />
                )}
            </div>
            <div className="flex items-center space-x-2">
                <DataTableViewOptions table={table} />
                <Button className="h-8 px-2 lg:px-3"> Insert students </Button>
            </div>
        </div>
    )
}
