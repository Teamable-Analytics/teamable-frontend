import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type PaginationState,
} from "@tanstack/react-table"


type UseDataTableProps<TData, TValue> = {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    pageCount: number;
}

export function useDataTable<TData, TValue>({
    data,
    columns,
    pageCount,
}: UseDataTableProps<TData, TValue>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const page = parseInt(searchParams.get("page") as string) || 1
    const perPage = parseInt(searchParams.get("per_page") as string) || 10

    const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
        pageIndex: page - 1,
        pageSize: perPage,
    })

    const createQueryString = React.useCallback((params: Record<string, string | number | null>) => {
        const newSearchParams = new URLSearchParams(searchParams?.toString())

        for (const [key, value] of Object.entries(params)) {
            if (value === null) {
                newSearchParams.delete(key)
            } else {
                newSearchParams.set(key, String(value))
            }
        }

        return newSearchParams.toString()
    }, [searchParams])

    const pagination = React.useMemo(() => ({
        pageIndex,
        pageSize,
    }),
    [pageIndex, pageSize])
    React.useEffect(() => {
        router.push(`${pathname}?${createQueryString({
            page: pageIndex + 1,
            per_page: pageSize,
        })}`,
        {
            scroll: false,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize])
    const table = useReactTable({
        data,
        columns,
        pageCount: pageCount ?? -1,
        state: {
            pagination,
            // sorting,
            // columnVisibility,
            // rowSelection,
            // columnFilters,
        },
        onPaginationChange: setPagination,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // onRowSelectionChange: setRowSelection,
        // onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
        // onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return { table }
}
