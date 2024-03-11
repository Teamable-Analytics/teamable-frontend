import React from 'react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { useStudents } from '../(hooks)/useStudents'

import { type Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
    pageSizeOptions?: number[];
}

export function StudentTablePagination<TData>({
    table,
    pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
    const context = useStudents()
    const fetchStudents = context?.fetchStudents ?? (() => Promise.resolve())
    const pageIndex = context?.pageIndex ?? 1
    const setPageIndex = context?.setPageIndex ?? (() => {})
    const pageSize = context?.pageSize ?? 10
    const setPageSize = context?.setPageSize ?? (() => {})
    const totalStudents = context?.totalStudents ?? 0

    const handlePageSizeChange = (newPageSize: number) => {
        console.log('newPageSize', newPageSize)
        setPageSize(newPageSize)
        fetchStudents(pageIndex, newPageSize)
    }

    const handlePageIndexChange = (newPageIndex: number) => {
        console.log('newPageIndex', newPageIndex)
        setPageIndex(newPageIndex)
        fetchStudents(newPageIndex, pageSize)
    }

    const pageCount = Math.ceil(totalStudents / pageSize)

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
        Showing {table.getRowCount()} of {totalStudents} entries
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <Text element="p" as="mutedText">Rows per page:</Text>
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => handlePageSizeChange(Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizeOptions.map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Text element="p" as="mutedText">
          Page {pageIndex} of {pageCount}
                </Text>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => handlePageIndexChange(1)} disabled={pageIndex <= 1}>
                        <span className="sr-only">First page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => handlePageIndexChange(pageIndex - 1)} disabled={pageIndex <= 1}>
                        <span className="sr-only">Previous page</span>
                        <ChevronLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => handlePageIndexChange(pageIndex + 1)} disabled={pageIndex >= pageCount}>
                        <span className="sr-only">Next page</span>
                        <ChevronRightIcon className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => handlePageIndexChange(pageCount)} disabled={pageIndex >= pageCount}>
                        <span className="sr-only">Last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
