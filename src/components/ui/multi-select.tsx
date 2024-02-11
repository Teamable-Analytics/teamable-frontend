import * as React from 'react'
import { cn } from "@/lib/utils"
import {Text} from "@/components/ui/text"
import { Check, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
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

export type OptionType = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: OptionType[];
    selected: string[];
    optionName?: string;
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
    placeholder?: string;
    inTableHeader?: boolean;
}

function MultiSelect({ options, selected, onChange, className, inTableHeader = false, placeholder = 'Select..', optionName = 'section(s)', ...props }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleSelectToggle = (optionValue: string) => {
        onChange(selected.includes(optionValue)
            ? selected.filter((item) => item !== optionValue)
            : [...selected, optionValue])
    }

    const createOptionsText = () => {
        if (selected.length === 0) {
            return placeholder
        }
        return `${selected.length} ${optionName} selected`
    }

    // Sort options to show selected items on top
    const sortedOptions = [...options].sort((a, b) => {
        let aSelected = selected.includes(a.value) ? -1 : 1
        let bSelected = selected.includes(b.value) ? -1 : 1
        return aSelected - bSelected
    })
    const selectedOptions = options.filter(option => selected.includes(option.value))
    const unselectedOptions = options.filter(option => !selected.includes(option.value))

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
                        {selectedOptions.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => handleSelectToggle(option.value)}
                            >
                                <Check
                                    className={cn("mr-2 h-4 w-4",
                                        selected.includes(option.value) ? "opacity-100" : "opacity-0")}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                        {unselectedOptions.length > 0 && selectedOptions.length > 0 && (
                            <Separator className="my-1"/>
                        )}
                        {unselectedOptions.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => handleSelectToggle(option.value)}
                            >
                                <span className="ml-6">{option.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelect }
