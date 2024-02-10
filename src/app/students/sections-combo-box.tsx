"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {Column} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    ScrollArea,
} from "@/components/ui/scroll-area"

// todo: replace mock data with actual set of section
const fakeSections = [
    { label: "Lecture", value: "lecture" },
    { label: "Lab 1", value: "lab1" },
    { label: "Lab 2", value: "lab2" },
    { label: "Lab 3", value: "lab3" },
    { label: "Lab 4", value: "lab4" },
    { label: "Lab 5", value: "lab5" },
    { label: "Lab 6", value: "lab6" },
    { label: "Lab 7", value: "lab7" },
    { label: "Lab 8", value: "lab8" },
    { label: "Lab 9", value: "lab9" },
    { label: "Lab 10", value: "lab10" },
]

interface SectionsComboBoxProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    sections?: { label: string; value: string }[]
}

export function SectionsComboBox<TData, TValue>({column, title, sections = fakeSections}: SectionsComboBoxProps<TData, TValue>) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? sections.find((section) => section.value === value)?.label
                        : "Sections"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search section" />
                    <ScrollArea className="h-40">
                        <CommandEmpty>No section found.</CommandEmpty>
                        <CommandGroup>
                            {sections.map((section) => (
                                <CommandItem
                                    key={section.value}
                                    value={section.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn("mr-2 h-4 w-4",
                                            value === section.value ? "opacity-100" : "opacity-0")}
                                    />
                                    {section.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
