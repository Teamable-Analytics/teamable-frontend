import { Student } from "@/_temp_types/student"

export type CourseStudents = {
    courseID: number,
    courseName?: string,
    students: Student[]
}
