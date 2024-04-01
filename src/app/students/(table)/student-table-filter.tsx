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
import { useState } from "react"

import type { DataTableFacetedFilterProps } from "@/components/ui/data-table-faceted-filter"

export function StudentTableFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const { filterSections } = useStudents()
    const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set())

    const handleSelect = (selectedOption: string) => {
        setSelectedValues((prevSelectedValues) => {
            const newSelectedValues = new Set(prevSelectedValues)
            newSelectedValues.add(selectedOption)
            const updatedOptions = options.filter(option => newSelectedValues.has(option.value))
            filterSections(updatedOptions)
            return newSelectedValues
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
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
                                            selectedValues.has(option.value)
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
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setSelectedValues(new Set())
                                            filterSections([])
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
