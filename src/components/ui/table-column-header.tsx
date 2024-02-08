"use client"

import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    ResetIcon,
} from "@radix-ui/react-icons"
import {Column} from "@tanstack/react-table"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {cn} from "@/lib/utils"
import React from "react"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    hasDropDownMenu?: boolean
}

export function DataTableColumnHeader<TData, TValue>({column, title, className, hasDropDownMenu = true}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            {hasDropDownMenu ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                        >
                            <span>{title}</span>
                            {column.getIsSorted() === "desc" ? (
                                <ArrowDownIcon className="ml-2 h-4 w-4"/>
                            ) : column.getIsSorted() === "asc" ? (
                                <ArrowUpIcon className="ml-2 h-4 w-4"/>
                            ) : (
                                <CaretSortIcon className="ml-2 h-4 w-4"/>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => column.clearSorting()}>
                            <ResetIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Reset
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>)
                : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => column.toggleSorting()}
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4"/>
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4"/>
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                        )}
                    </Button>
                )}
        </div>
    )
}
