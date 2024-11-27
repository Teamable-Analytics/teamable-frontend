"use client";

import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse";
import { useQuery } from "@tanstack/react-query";

const useTotalStudentsQuery = ({ courseId }: { courseId: number }) => {
  const studentQuery = useQuery<unknown, unknown, { count: number }>({
    queryKey: [`courses/${courseId}/students`],
  });

  return {
    getTotalStudentsAsync: studentQuery.refetch,
    ...studentQuery,
  };
};

export const useTotalStudents = () => {
  const { courseId } = useCourse();
  const { data, isLoading, error, getTotalStudentsAsync } = useTotalStudentsQuery({
    courseId: Number(courseId),
  });

  return {
    totalStudents: data?.count ?? 0,
    isLoading,
    error,
    refetch: getTotalStudentsAsync,
  };
};
