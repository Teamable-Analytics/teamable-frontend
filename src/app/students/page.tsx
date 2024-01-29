'use client'
import React, {useState, ChangeEvent} from 'react'
import FileUpload from '../../components/fileupload'
import { parseCSV } from '@/lib/parseCSV'

export default function StudentPage() {
    const [csvStudentsParse, setStudentsParse] = useState<string | null>(null)

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        let parsedCSV = null
        if (file) {
            parsedCSV = await parseCSV(file)
            setStudentsParse(parsedCSV)
        }
        console.log(parsedCSV)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <FileUpload onFileChange={handleFileChange}/>
        </div>
    )
}
