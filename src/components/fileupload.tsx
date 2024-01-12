'use client'
import React, {ChangeEvent, useState} from 'react'

export default function FileUpload() {
    const [fileContent, setFileContent] = useState<String>('')

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // calls parseCSV function whenever the file input element is changed, passes whatever file is selected as argument.
        const file = event.target.files?.[0]
        if(file) {
            parseCSV(file)
        }
    }
    let final_vals:String[][] = []

    const parseCSV = (file: File) => {
    // using React FileReader, trying to parse CSV on client side.. without using any other APIs.
    // once parsed into a JSON file, we can update this as a global state, using React Context, so that it can be used across multiple components.
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result
            if (typeof content === 'string') {
                // split file into arrays using RegEx expression, splits on each new line(i.e row) in CSV file.
                const values = content.split(/[\n]+/)

                final_vals = []
                values.forEach(val => {
                    // split on ; as this is used to seperate each field in the CSV provided. Should also add the option of splitting on a comma.
                    final_vals.push(val.split(';'))
                })
                console.log(final_vals)
            }
        }
        reader.readAsText(file)
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
