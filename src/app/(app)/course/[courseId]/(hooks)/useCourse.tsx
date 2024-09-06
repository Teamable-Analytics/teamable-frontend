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
import { useQuery } from "@tanstack/react-query"

interface CourseContextType {
  courseId: number;
  courseName: string;
  lmsType: string;
};

const CourseContext = createContext<CourseContextType>({} as CourseContextType)

const useCourseQuery = ({ courseId }: { courseId: number }) => {
  const courseQuery = useQuery<unknown, unknown, Course>({
    queryKey: [`courses/${courseId}`],
  })

  return {
    getCourseAsync: courseQuery.refetch,
    ...courseQuery,
  }
}

export const CourseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { courseId } = useParams<{ courseId: string }>()
  const {
    data: course,
    getCourseAsync,
    isLoading,
  } = useCourseQuery({ courseId: Number(courseId) })

  useEffect(() => {
    if (courseId) {
      void getCourseAsync()
    }
  }, [getCourseAsync, courseId])

  if (isLoading) {
    return null
  }

  if (!("id" in course)) {
    return <Custom404 errorMessage="Course not found" />
  }

  return (
    <CourseContext.Provider
      value={{
        courseId: course.id,
        courseName: course.name,
        lmsType: course.organization.lms_type,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export const useCourse = (): CourseContextType => {
  return useContext(CourseContext)
}
