import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useQuery } from "@tanstack/react-query"

export interface GradeAttribute {
  id: number;
  name: string
}

export type GradeAttributesResponse = GradeAttribute[]

export const useGradeAttributes = () => {
  const { courseId } = useCourse()
  return useQuery<unknown, unknown, GradeAttributesResponse>({
    queryKey: [`courses/${courseId}/grade-attributes`],
  })
}
