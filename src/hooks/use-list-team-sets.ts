import { useQuery } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { TeamSet } from "@/_temp_types/teamSet"

type ListTeamSetsResponse = Omit<TeamSet, "teams">[];

export const useListTeamSets = () => {
  const { courseId } = useCourse()
  return useQuery<unknown, unknown, ListTeamSetsResponse>({
    queryKey: [`courses/${courseId}/get_team_sets`],
  })
}
