'use client'
import React, { ChangeEvent, useState} from 'react'

export default function FileUpload() {
    const [fileContent, setFileContent] = useState<String>('')

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        let jsonCSV = ""
        if(file) {
            parseCSV(file).then(jsonString => {
                console.log(jsonString)
            }).catch(error => {
                console.error("Error parsing CSV:", error)
            })
        }
        console.log(jsonCSV)
    }

    const parseCSV = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            let allColumns: { [key: string]: string[] } = {}

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const content = e.target?.result
                if (typeof content === "string") {
                    let rows: string[] = content.split(/\r?\n/)

                    if (rows.length > 0) {
                        let headerFields = rows[0].split(";")
                        headerFields.forEach(key => {
                            allColumns[key] = []
                        })
                        rows.slice(1).forEach((row) => {
                            let fieldPerRow = row.split(";")
                            fieldPerRow.forEach((field, index) => {
                                let keyOfField = headerFields[index]
                                allColumns[keyOfField].push(field)
                            })
                        })
                        // Resolve the promise with the JSON string
                        resolve(JSON.stringify(allColumns))
                    } else {
                        // Resolve with an empty object if no rows
                        resolve("{}")
                    }
                } else {
                    reject("File content is not a string")
                }
            }
            reader.readAsText(file)
        })
    }

    return (
        <div className="container mt-10">
            <form>
                <div className="fileUpload">
                    <label htmlFor="classUpload" className="text-xl"> Upload Student Data (CSV) </label>
                    <input id="classUpload" type="file" className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-sky-50
                      file:text-sky-800
                      file:hover:bg-sky-100
                      mt-10 mb-5"
                    accept=".csv"
                    onChange={handleFileChange}/>
                </div>
            </form>
        </div>
    )
}
