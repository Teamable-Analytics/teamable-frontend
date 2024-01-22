"use client"
import React, { ChangeEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { parseCSV } from '@/lib/parseCSV'

export default function FileUpload() {
    const [fileContent, setFileContent] = useState<string>('')

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            try{
                const jsonString = await parseCSV(file)
                setFileContent(jsonString)
                console.log(jsonString)
            } catch(err) {
                console.error(err)
            }
        }
    }
    return (
        <div>
            <Label>Upload CSV File</Label>
            <Input type="file" onChange={handleFileChange} accept=".csv"/>
            <div>
                Parsed Content: <pre>{fileContent}</pre>
            </div>
        </div>
    )
}
