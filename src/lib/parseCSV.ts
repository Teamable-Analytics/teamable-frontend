import { Student } from '@/types/Student'
import { CourseStudents } from '@/types/CourseStudents'

export const parseCSV = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result
            let importedStudents: CourseStudents = {courseID: 1, students: []}

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
