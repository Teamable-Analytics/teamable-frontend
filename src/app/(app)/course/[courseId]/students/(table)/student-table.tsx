"use client"
import { useCallback, useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableToolbar } from "../(table)/student-table-toolbar"
import {
  FilterValues,
  SortableFieldKey,
  useStudents,
} from "../(hooks)/useStudents"
import { columns } from "../(table)/columns"
import { Student } from "@/_temp_types/student"
import { Updater } from "@tanstack/table-core"
import { sort } from "next/dist/build/webpack/loaders/css-loader/src/utils"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { isLoading, filters, totalPages } = useStudents()

  // This is the sorting state for the UI, we still need to tell our context about sorting changes
  const [sorting, setSorting] = useState<SortingState | null>(null)
  const onSortingChange = useCallback(
    (state: SortingState | Updater<SortingState>) => {
      let newSortingState
      if (typeof state === "function") {
        newSortingState = state(sortStringToSortingState(filters.sort.value))
      } else {
        newSortingState = state
      }

      setSorting(newSortingState)
      filters.sort.set(sortingStateToSortString(newSortingState))
    },
    [filters.sort],
  )

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData>[],
    state: {
      sorting: sorting ?? sortStringToSortingState(filters.sort.value),
      columnVisibility,
      columnFilters,
      pagination: {
        pageIndex: filters.pageIndex.value,
        pageSize: filters.pageSize.value,
      },
    },
    pageCount: totalPages,
    enableRowSelection: false,
    onSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (pagination: Updater<PaginationState>) => {
      let newPageIndex
      let newPageSize
      if (typeof pagination === "function") {
        const newPagination = pagination({
          pageIndex: filters.pageIndex.value,
          pageSize: filters.pageSize.value,
        })
        newPageIndex = newPagination.pageIndex
        newPageSize = newPagination.pageSize
      } else {
        newPageIndex = pagination.pageIndex
        newPageSize = pagination.pageSize
      }

      filters.pageIndex.set(newPageIndex)
      filters.pageSize.set(newPageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar<TData> table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} hasSelectableRows={false} />
    </div>
  )
}

export const StudentTable = () => {
  const { studentsToDisplay } = useStudents()
  return <DataTable<Student, any> data={studentsToDisplay} columns={columns} />
}

const sortingStateToSortString = (
  state: SortingState,
): FilterValues["sort"] => {
  if (state.length < 1) return ""
  const record = state[0]
  return `${record.id as SortableFieldKey}.${record.desc ? "desc" : "asc"}` as FilterValues["sort"]
}

const sortStringToSortingState = (
  sortString: FilterValues["sort"],
): SortingState => {
  if (!sortString) return []
  const [field, direction] = sortString.split(".")
  return [
    {
      id: field,
      desc: direction === "desc",
    },
  ]
}
