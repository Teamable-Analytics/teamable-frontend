"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel, RowModel,
    SortingState,
    useReactTable,
    type Table as TableType,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {DataTablePagination} from "@/components/ui/data-table-pagination"
import {SearchBar} from "@/components/SearchBar"
import React from "react"

type DataTableSearchBarProps = {
    placeholder: string;
    searchColumn: string;
}

type DataTableProps<TData, > = {
    columns: ColumnDef<TData>[]
    data: TData[]
    searchBarOptions: DataTableSearchBarProps
    // Items controlling the action in the table (located in the top right corner of the table)
    actionItems?: (table: TableType<TData>) => React.ReactNode
    // Buttons group for bulk actions
    bulkActionItems?: (selectedRowModels: RowModel<TData>) => React.ReactNode
    // Function Controlling the action when a row is clicked
    rowAction?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
}

const DataTable = <TData, >({columns, data, searchBarOptions, bulkActionItems, actionItems, rowAction}: DataTableProps<TData>) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable<TData>({
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

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center py-4 w-[25vw]">
                    {/* make the search bar work on multiple columns of table: firstName, lastName, id */}
                    <SearchBar
                        placeholder={searchBarOptions.placeholder}
                        value={(table.getColumn(searchBarOptions.searchColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            table.getColumn(searchBarOptions.searchColumn)?.setFilterValue(event.target.value)
                        }}
                    />
                </div>
                <div className="space-x-2 flex-1">
                    {!!bulkActionItems && bulkActionItems(table.getRowModel())}
                    {!!actionItems && !!table && actionItems(table)}
                </div>
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
                                    onClick={rowAction}
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
                <DataTablePagination table={table as TableType<TData>}/>
            </div>
        </>
    )
}

export { DataTable }
