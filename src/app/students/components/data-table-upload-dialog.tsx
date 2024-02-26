
import React from 'react'
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useStudents} from "../hooks/useStudents"
import { PlusIcon } from '@radix-ui/react-icons'


export const UploadDialog = () => {
    const {handleFileChange, handleCancel, handleSave} = useStudents()
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant = "default"
                    size="sm"
                    className="hidden h-8 lg:flex">
                    <PlusIcon className="mr-2 h-4 w-4"/> Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Students [CSV]</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="grid gap-4 py-4">
                        <Input type="file" onChange={handleFileChange} accept=".csv"/>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={handleSave}>Upload</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
