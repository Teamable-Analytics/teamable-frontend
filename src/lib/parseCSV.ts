import { Student } from '@/types/Student'
import { CourseStudents } from '@/types/CourseStudents'

export const parseCSV = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result
            // right now it just sets the course to have ID of one so I can test
            // I don't know how we will find and determine courseId.
            let importedStudents: CourseStudents = {courseID: 1, students: []}

            if (typeof content === "string") {
                // regEx to split CSV file for rows
                let rows: string[] = content.split(/\r?\n/)

                if (rows.length > 0) {
                    // first row in table is header (hopefully), split and grab the names for each one.
                    // using each header as the key for the object.
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
                            }else if (keyOfField === "Section") {
                                student.section = field
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
