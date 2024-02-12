import * as React from 'react'
import { useState } from 'react'
import { MultiSelect } from "@/components/ui/multi-select"
import { DataTableColumnHeader } from '@/components/ui/table-column-header'


const fakeSections = [
    { label: "Default Label", value: "default_value" },
]
interface MultiSelectSectionsProps {
    sections?: { label: string, value: string }[];
  }
export function MultiSelectSections({sections = fakeSections}: MultiSelectSectionsProps) {
    const [selected, setSelected] = useState<string[]>([])
    return (
        <MultiSelect
            options={sections}
            selected={selected}
            onChange={setSelected}
            placeholder="Sections"
            className="w-auto my-0"
            inTableHeader = {false}
        />
    )
}
