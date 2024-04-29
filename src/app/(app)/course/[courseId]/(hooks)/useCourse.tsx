"use client"

import { useParams } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

type CourseContextType = {
    courseId: number | null
    courseName: string
}

const CourseContext = createContext<CourseContextType>({
  courseId: null,
  courseName: '',
})

const useCourseProvider = (): CourseContextType => {
  const { courseId } = useParams<{ courseId: string }>()
  const [courseName, setCourseName] = useState<string>('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${courseId}`,)
        const courseData = await courseResponse.json()
        setCourseName(courseData.name)
      } catch (e) {
        console.error(e)
      }
    }
    if (courseId && !isNaN(Number(courseId)) && Number(courseId) > 0) {
      fetchCourse()
    }
  }, [courseId, setCourseName])

  return {
    courseId: !isNaN(Number(courseId)) && Number(courseId) > 0 ? Number(courseId) : null,
    courseName,
  }
}

export const CourseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const courseContext = useCourseProvider()
  return (
    <CourseContext.Provider value={courseContext}>
      {children}
    </CourseContext.Provider>
  )
}

export const useCourse = (): CourseContextType => {
  return useContext(CourseContext)
}
