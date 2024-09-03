"use client"

import Custom404 from "@/app/not-found"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { useParams } from "next/navigation"
import { Course } from "@/_temp_types/course"

type CourseContextType = {
  courseId: number | null;
  courseName: string;
  lmsType: string;
};

const CourseContext = createContext<CourseContextType>({
  courseId: null,
  courseName: "",
  lmsType: "",
})

const useCourseProvider = (): CourseContextType => {
  const { courseId } = useParams<{ courseId: string }>()
  const [courseName, setCourseName] = useState<string>("")
  const [lmsType, setLmsType] = useState<string>("")

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseResponse = await fetch(
          `${process.env.BACKEND_BASE_URI}/api/v1/courses/${courseId}`,
        )
        const courseData = (await courseResponse.json()) as Course
        setCourseName(courseData.name)
        setLmsType(courseData.organization.lms_type)
      } catch (e) {
        console.error(e)
      }
    }
    if (courseId && !isNaN(Number(courseId)) && Number(courseId) > 0) {
      fetchCourse()
    }
  }, [courseId, setCourseName])

  return {
    courseId:
      !isNaN(Number(courseId)) && Number(courseId) > 0
        ? Number(courseId)
        : null,
    courseName,
    lmsType,
  }
}

export const CourseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const courseContext = useCourseProvider()
  if (!courseContext.courseId) {
    return <Custom404 errorMessage="Course not found" />
  }

  return (
    <CourseContext.Provider value={courseContext}>
      {children}
    </CourseContext.Provider>
  )
}

export const useCourse = (): CourseContextType => {
  return useContext(CourseContext)
}
