'use client'

import {Button} from "@/components/ui/button"
import {FileIcon, Pencil1Icon} from "@radix-ui/react-icons"
import * as React from "react"
import {useContext} from "react"
import {ProjectSetDetailContext} from "@/app/project-sets/[projectSetId]/(components)/ProjectSetDetailContextProvider"

export function EditModeButton() {
    const {isEditMode, setIsEditMode} = useContext(ProjectSetDetailContext)

    return (
        <>
            {isEditMode ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>
                    <FileIcon className="mr-2"/>
                    Save changes
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)}>
                    <Pencil1Icon className="mr-2"/>
                    Edit mode
                </Button>
            )}
        </>
    )
}
