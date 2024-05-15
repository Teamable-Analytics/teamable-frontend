"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

import { Command as CommandPrimitive } from "cmdk"
import { useStudents } from "../(hooks)/useStudents"
import { useRef, useState, useCallback, useEffect } from "react"

type DropdownOption = {
    label: string;
    value: string;
};
type FancyMultiSelectProps = {
    studentSections: DropdownOption[];
}

export function StudentsSectionsSelect( {studentSections} : FancyMultiSelectProps) {
  const { allSections } = useStudents()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<DropdownOption[]>([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setSelected(studentSections)
  }, [studentSections])

  const handleUnselect = useCallback((section: DropdownOption) => {
    setSelected(prev => prev.filter(s => s.value !== section.value))
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected(prev => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }, [])

  const selectables = allSections?.filter(section => !selected.includes(section)) ?? []

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((section) => {
            return (
              <Badge key={section.value} variant="secondary">
                {section.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(section)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(section)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select frameworks..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((section) => {
                return (
                  <CommandItem
                    key={section.value}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={(value) => {
                      setInputValue("")
                      setSelected(prev => [...prev, section])
                    }}
                    className={"cursor-pointer"}
                  >
                    {section.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
}
