export const COURSE_ROLES = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
} as const

export type CourseRole = (typeof COURSE_ROLES)[keyof typeof COURSE_ROLES];
