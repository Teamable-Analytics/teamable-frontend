
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


export type OptionType = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: OptionType[]
    selected: string[]
    onChange: React.Dispatch<React.SetStateAction<string[]>>
    className?: string
    placeholder?: string
    inTableHeader?: boolean
}

function MultiSelect({ options, selected, onChange, className, inTableHeader = false, placeholder = 'Select..', ...props }: MultiSelectProps) {

    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
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
                    className={`w-auto justify-between ${inTableHeader ? "h-[30px]" : "h-full"}`}
                    onClick={() => setOpen(!open)}
                >
                    {selected.length === 0 ? placeholder :
                        <div className="flex gap-1 flex-wrap">
                            {selected.length <= 3 ?
                                selected.map((item) => (
                                    <Badge
                                        variant="outline"
                                        key={item}
                                        className="mr-1 text-xs-muted-foreground"
                                        onClick={(e) => {
                                            e.stopPropagation() // Prevents popover from closing
                                            handleUnselect(item)
                                        }}
                                    >
                                        {options.find(o => o.value === item)?.label}
                                        <button
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.stopPropagation()
                                                    handleUnselect(item)
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation() // Prevents popover from closing
                                                handleUnselect(item)
                                            }}
                                        >
                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                        </button>
                                    </Badge>
                                ))
                                :
                                <>
                                    {selected.slice(0, 3).map((item) => (
                                        <Badge
                                            variant="outline"
                                            key={item}
                                            className="mr-1 text-xs-muted-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation() // Prevents popover from closing
                                                handleUnselect(item)
                                            }}
                                        >
                                            {options.find(o => o.value === item)?.label}
                                            <button
                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.stopPropagation()
                                                        handleUnselect(item)
                                                    }
                                                }}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation() // Prevents popover from closing
                                                    handleUnselect(item)
                                                }}
                                            >
                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                            </button>
                                        </Badge>
                                    ))}
                                    <Badge variant="outline" className="mr-1 text-xs-muted-foreground">{selected.length - 3} more</Badge>
                                </>
                            }
                        </div>
                    }
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
                                onSelect={() => {
                                    onChange(selected.includes(option.value)
                                        ? selected.filter((item) => item !== option.value)
                                        : [...selected, option.value])
                                    setOpen(true)
                                }}
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
