'use client'

import {Button} from "@/components/ui/button"
import {FileIcon, Pencil1Icon} from "@radix-ui/react-icons"
import * as React from "react"
import {useRouter} from "next/navigation"

export type EditModeButtonProps = {
    currentSearchTerm: string
    currentProjectId: number
    currentEditMode: boolean
}

export function EditModeButton({currentSearchTerm, currentProjectId, currentEditMode}: EditModeButtonProps) {
    const router = useRouter()

    const updateIsEditMode = (isEditMode: boolean) => {
        router.push(`?isEdit=${isEditMode}&projectId=${currentProjectId}&search=${currentSearchTerm}`)
    }

    return (
        <>
            {currentEditMode ? (
                <Button variant="outline" size="sm" onClick={() => updateIsEditMode(false)}>
                    <FileIcon className="mr-2"/>
                    Save changes
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={() => updateIsEditMode(true)}>
                    <Pencil1Icon className="mr-2"/>
                    Edit mode
                </Button>
            )}
        </>
    )
}
