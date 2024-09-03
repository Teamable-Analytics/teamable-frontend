import { useQuery } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { CourseTeamSets } from "@/_temp_types/teamSet"

export const useListTeamSets = () => {
  const { courseId } = useCourse()
  return useQuery<unknown, unknown, CourseTeamSets>({
    queryKey: [`courses/${courseId}/get_team_sets`],
  })
}
