import { Student } from '@/_temp_types/student'
import StudentsPage from '@/app/students/page'

export const parseCSV = (file: File): Promise<Student[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result
            let importedStudents: Student[] = []
            if (typeof content === "string") {
                let rows: string[] = content.split(/\r?\n/)

                if (rows.length > 0) {
                    let headerFields = rows[0].split(";")
                    rows.slice(1).forEach((row) => {
                        let fieldPerRow = row.split(";")
                        let student: Student = {name: '', sections: [], id: NaN}

                        fieldPerRow.forEach((field, index) => {
                            let keyOfField = headerFields[index]
                            if (keyOfField === "Student") {
                                student.name = field
                            } else if (keyOfField === "ID") {
                                student.id = parseInt(field, 10)
                            }else if (keyOfField === "Section") {
                                if(!student.sections) {
                                    student.sections = []
                                }
                                field = field.replace(/, and| and /g, ",")
                                let sectionArray = field.split(",")
                                sectionArray = sectionArray.map((section) => section.trim())
                                student.sections = sectionArray
                            }
                        })
                        if (student.name && student.id) {
                            importedStudents.push(student)
                        }
                    })
                    resolve(importedStudents)
                }
            }
        }
        reader.onerror = (e) => {
            reject(e)
        }
        reader.readAsText(file)
    })
}
