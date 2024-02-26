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
    optionName?: string;
    className?: string;
    placeholder?: string;
    inTableHeader?: boolean;
    onSelectionChange?: (selected: string[]) => void;
}

function MultiSelect({ options, className, inTableHeader = false, placeholder = 'Select..', optionName = 'section(s)', onSelectionChange, ...props }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string[]>([])
    const handleSelectToggle = (optionValue: string) => {
        const newSelected = selected.includes(optionValue)
            ? selected.filter((item) => item !== optionValue)
            : [...selected, optionValue]

        setSelected(newSelected)
        onSelectionChange?.(newSelected)
    }

    const createOptionsText = () => {
        if (selected.length === 0) {
            return placeholder
        }
        return `${selected.length} ${optionName} selected`
    }
    const selectedOptions = options.filter(option => selected.includes(option.value))
    const unselectedOptions = options.filter(option => !selected.includes(option.value))

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-auto`}
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
