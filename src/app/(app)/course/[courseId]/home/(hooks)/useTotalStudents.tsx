"use client"

import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useQuery } from "@tanstack/react-query"

const useTotalStudentsQuery = ({ courseId }: { courseId: number }) => {
  const studentQuery = useQuery<
    unknown,
    unknown,
    { total_students: number; opted_in_students: number }
  >({
    queryKey: [`courses/${courseId}/student-counts`],
  })

  return {
    getTotalStudentsAsync: studentQuery.refetch,
    ...studentQuery,
  }
}

export const useTotalStudents = () => {
  const { courseId } = useCourse()
  const { data, isLoading, error, getTotalStudentsAsync } = useTotalStudentsQuery({
    courseId: Number(courseId),
  })

  return {
    totalStudents: data?.total_students ?? 0,
    optedInStudents: data?.opted_in_students ?? 0,
    isLoading,
    error,
    refetch: getTotalStudentsAsync,
  }
}
