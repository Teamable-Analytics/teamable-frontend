import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useStudents } from "../(hooks)/useStudents"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import type { DataTableFacetedFilterProps } from "@/components/ui/data-table-faceted-filter"

export function StudentTableSectionsFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const { setSelectedSections, selectedSections } = useStudents()

    const handleSelect = (selectedOption: string) => {
        if (selectedSections.includes(selectedOption)) {
            setSelectedSections((prev) => prev.filter((section) => section !== selectedOption))
        } else {
            setSelectedSections((prev) => [...prev, selectedOption])
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedSections.length > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedSections.length}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedSections.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedSections.length} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedSections.includes(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem key = {option.value} onSelect={() => handleSelect(option.value)}>
                                    <div
                                        className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            selectedSections.includes(option.value)
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible")}
                                    >
                                        <CheckIcon className={cn("h-4 w-4")} />
                                    </div>
                                    {option.icon && (
                                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span>{option.label}</span>
                                </CommandItem>
                            ))
                            }
                        </CommandGroup>
                        {selectedSections.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setSelectedSections([])
                                        }}
                                        className="justify-center text-center"
                                    >
                    Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
