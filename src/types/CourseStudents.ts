import {Student} from '@/types/Student'

export type CourseStudents = {
    courseID: number,
    courseName?: string,
    students: Student[]
}
