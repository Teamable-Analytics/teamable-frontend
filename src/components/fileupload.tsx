"use client"
import React, { ChangeEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FileUpload() {
    const [fileContent, setFileContent] = useState<string>('')

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            parseCSV(file).then(jsonString => {
                setFileContent(jsonString)
                console.log(jsonString)
            }).catch(error => {
                console.error("Error parsing CSV:", error)
            })
        }
    }

    const parseCSV = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            interface Student {
                id: number;
                name: string;
            }

            interface StudentsList {
                students: Student[];
            }

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const content = e.target?.result
                let importedStudents: StudentsList = { students: [] }

                if (typeof content === "string") {
                    let rows: string[] = content.split(/\r?\n/)

                    if (rows.length > 0) {
                        let headerFields = rows[0].split(";")
                        rows.slice(1).forEach((row) => {
                            let fieldPerRow = row.split(";")
                            let student: Student = { name: '', id: NaN}

                            fieldPerRow.forEach((field, index) => {
                                let keyOfField = headerFields[index]
                                if (keyOfField === "Student") {
                                    student.name = field
                                } else if (keyOfField === "ID") {
                                    student.id = parseInt(field, 10)
                                }
                            })

                            if (student.name && student.id) {
                                importedStudents.students.push(student)
                            }
                        })
                        resolve(JSON.stringify(importedStudents))
                    }
                }
            }
            reader.onerror = (e) => {
                reject(e)
            }
            reader.readAsText(file)
        })
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
