"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/students/components/data-table-view-options"
import { UploadDialog } from "@/app/students/components/data-table-upload-dialog"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { useStudents } from "../hooks/useStudents"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    const sections = useStudents().currentSections

    return (
        <div className="flex items-center justify-between mt-2">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter students..."
                    value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("firstName")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("sections") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("sections")}
                        title="Sections"
                        options={sections}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
            Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <DataTableViewOptions table={table} />
                <UploadDialog />
            </div>
        </div>
    )
}
