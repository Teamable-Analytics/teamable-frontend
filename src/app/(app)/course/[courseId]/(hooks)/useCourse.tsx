"use client"

import { useParams } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

type CourseContextType = {
    courseId: number
    courseName: string
}

const CourseContext = createContext<CourseContextType>({
  courseId: 0,
  courseName: '',
})

const useCourseProvider = (): CourseContextType => {
  const { courseId } = useParams<{ courseId: string }>()
  const [courseName, setCourseName] = useState<string>('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/?id=${courseId}`,)
        const courseData = await courseResponse.json()
        setCourseName(courseData[0].name)
      } catch (e) {
        console.error(e)
      }
    }
    fetchCourse()
  }, [courseId])

  return {
    courseId: parseInt(courseId),
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
