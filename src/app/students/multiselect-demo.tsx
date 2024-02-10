import * as React from 'react'
import { useState } from 'react'
import { MultiSelect } from "@/components/ui/multi-select"

export function Demo() {
    const [selected, setSelected] = useState<string[]>([])
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

    return (
        <MultiSelect
            options={fakeSections}
            selected={selected}
            onChange={setSelected}
            className="w-auto"
        />
    )
}
