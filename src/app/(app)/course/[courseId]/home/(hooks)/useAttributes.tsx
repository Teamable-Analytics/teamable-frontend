"use client"

import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useQuery } from "@tanstack/react-query"

interface PastAttributesResponse {
  team_set_name: string;
  formation_date: string;
  total_attributes_used: number;
  attributes: { name: string }[];
}

const usePastAttributesQuery = ({ courseId }: { courseId: number }) => {
  const attributeQuery = useQuery<unknown, unknown, PastAttributesResponse>({
    queryKey: [`courses/${courseId}/previous-attributes`],
  })

  return {
    getPastAttributes: attributeQuery.refetch,
    ...attributeQuery,
  }
}

export const usePastAttributes = () => {
  const { courseId } = useCourse()
  const { data, isLoading, error, getPastAttributes } = usePastAttributesQuery({
    courseId: Number(courseId),
  })

  const formattedData = data
    ? {
      ...data,
      formation_date: new Date(data.formation_date)
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/"),
    }
    : undefined

  return {
    data: formattedData,
    isLoading,
    error,
    refetch: getPastAttributes,
  }
}
