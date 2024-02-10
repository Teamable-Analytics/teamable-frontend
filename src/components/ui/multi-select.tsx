
import * as React from 'react'
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { getDisplayName } from 'next/dist/shared/lib/utils'


export type OptionType = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: OptionType[]
    selected: string[]
    optionName?: string
    onChange: React.Dispatch<React.SetStateAction<string[]>>
    className?: string
    placeholder?: string
    inTableHeader?: boolean
}

function MultiSelect({ options, selected, onChange, className, inTableHeader = false, placeholder = 'Select..', optionName = 'section(s)',  ...props }: MultiSelectProps) {

    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
    }
    const handleSelect = (optionValue: string) => {
        onChange(selected.includes(optionValue)
            ? selected.filter((item) => item !== optionValue)
            : [...selected, optionValue])
        setOpen(true)
    }
    const createOptionsText =  () => {
        if (selected.length === 0) {
            return placeholder
        }
        return `${selected.length} ${optionName} selected`
    }
    // todo: refactor condition expressions as separate functions
    // todo: remove the badges cap, make it dynamic based on width
    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-auto justify-between ${inTableHeader ? "h-[30px] basis-0" : "h-full"}`}
                    onClick={() => setOpen(!open)}
                >
                    {createOptionsText()}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className="max-h-40 overflow-auto">
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => handleSelect(option.value)}
                            >
                                <Check
                                    className={cn("mr-2 h-4 w-4",
                                        selected.includes(option.value) ?
                                            "opacity-100" : "opacity-0")}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelect }
