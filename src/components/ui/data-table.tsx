"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {DataTablePagination} from "@/components/ui/table-pagination"
import {SearchBar} from "@/components/search-bar"
import React from "react"

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    // This component control the action in the table (lay in the top right corner of the table)
    actionItems?: React.ReactNode
}

function DataTable<TData>({columns, data, actionItems}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns: columns as ColumnDef<TData>[],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    const searchBarRef = React.useRef<HTMLInputElement>(null)

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center py-4 w-[25vw]">
                    {/* make the search bar work on multiple columns of table: firstName, lastName, id */}
                    <SearchBar
                        placeholder="Search Last Names"
                        value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            table.getColumn("lastName")?.setFilterValue(event.target.value)
                        }}
                        ref={searchBarRef}
                    />
                </div>
                {actionItems}
            </div>
            <div className="rounded-md border mb-5">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header,
                                                    header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-2">
                <DataTablePagination table={table}/>
            </div>
        </>
    )
}

export { DataTable }
