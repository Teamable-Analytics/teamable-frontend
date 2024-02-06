'use client'
import React, {useState, ChangeEvent} from 'react'
import FileUpload from '../../components/fileupload'
import { parseCSV } from '@/lib/parseCSV'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Student } from '@/types/Student'

export default function StudentPage() {
    const [csvStudentsParse, setStudentsParse] = useState<Student[]>([])
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        let parsedCSV = []
        if (file) {
            parsedCSV = await parseCSV(file)
            setStudentsParse(parsedCSV)
            console.log(parsedCSV)
        }
    }
    return (
        <div className="flex flex-col gap-5 mx-80">
            <FileUpload onFileChange={handleFileChange}/>
            <DataTable columns={columns} data={csvStudentsParse}/>
        </div>
    )
}
