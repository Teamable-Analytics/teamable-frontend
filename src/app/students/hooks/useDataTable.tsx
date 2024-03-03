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


interface UseDataTableProps<TData, TValue> {
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

    // Extract page and perPage from URL searchParams
    const page = parseInt(searchParams.get("page") as string) || 1
    const perPage = parseInt(searchParams.get("per_page") as string) || 10

    const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
        pageIndex: page - 1,
        pageSize: perPage,
    })

    // Create query string for updating pagination
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
    // // alternative createQueryString
    // const createQueryString = (queryString:string) => {
    //     // Use URLSearchParams for more flexible query parameter handling
    //     const searchParams = new URLSearchParams(window.location.search)
    //     const newParams = new URLSearchParams(queryString)

    //     // Merge the new query parameters with the existing ones
    //     newParams.forEach((value, key) => {
    //         searchParams.set(key, value)
    //     })
    //     return `${searchParams.toString()}`
    // }
    // const updateURLAndFetchData = (queryString: string) => {
    //     const newSearchQuery = createQueryString(queryString)
    //     // Use the router to push the new searchQuery without reloading the page
    //     router.push(`${pathname}?${newSearchQuery}`)
    //     getStudentData(`http://localhost:8000/api/v1/course-members/?${newSearchQuery}`)
    // }
    const pagination = React.useMemo(() => ({
        pageIndex,
        pageSize,
    }),
    [pageIndex, pageSize])
    // Update the URL based on pagination changes
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
    // Initialize React Table with server-side pagination
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
