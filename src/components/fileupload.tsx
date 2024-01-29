"use client"
import React, { ChangeEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FileUploadProps = {
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({onFileChange}) => {
    return (
        <div>
            <Label>Upload CSV File</Label>
            <Input type="file" onChange={onFileChange} accept=".csv"/>
        </div>
    )
}

export default FileUpload
