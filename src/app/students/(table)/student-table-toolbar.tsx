"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"

import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { useStudents } from "@/app/students/(hooks)/useStudents"

type DataTableToolbarProps<TData> = {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const currentSections = useStudents()?.currentSections ?? []
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
                        options={currentSections}
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
                <Button className="h-8 px-2 lg:px-3"> Insert students </Button>
            </div>
        </div>
    )
}
