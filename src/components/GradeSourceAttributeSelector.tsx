import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  useGradeAttributes,
  GradeAttribute,
} from "@/hooks/use-grade-attributes"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"

export namespace GradeSourceAttributeSelector {
  export interface Props {
    onSelect: (args: { gradeAttribute: GradeAttribute }) => void;
  }
}

export const GradeSourceAttributeSelector = ({
  onSelect,
}: GradeSourceAttributeSelector.Props) => {
  const { data, isPending } = useGradeAttributes()

  if (isPending || !data) {
    return <GradeSourceAttributeSelectorLoading />
  }

  return (
    <GradeSourceAttributeSelectorWithData
      onSelect={onSelect}
      gradeAttributes={data}
    />
  )
}

export const GradeSourceAttributeSelectorLoading = () => {
  return (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={false}
      className="justify-between"
    >
      Loading attributes...
      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  )
}

export const GradeSourceAttributeSelectorWithData = ({
  onSelect,
  gradeAttributes,
}: GradeSourceAttributeSelector.Props & {
  gradeAttributes: GradeAttribute[];
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedAttribute, setSelectedAttribute] = useState<
    GradeAttribute | undefined
  >()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedAttribute
            ? gradeAttributes.find(
              (canvasAssignment) =>
                canvasAssignment.id === selectedAttribute.id,
            )?.name
            : "Select attribute..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-80">
        <Command>
          <CommandInput placeholder="Search for an attribute..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {gradeAttributes.map((gradeAttribute) => (
              <CommandItem
                key={gradeAttribute.id}
                onSelect={() => {
                  setSelectedAttribute(gradeAttribute)
                  setOpen(false)
                  onSelect({ gradeAttribute })
                }}
              >
                {gradeAttribute.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
