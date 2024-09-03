import { useQuery } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { TeamSet } from "@/_temp_types/teamSet"

export const useTeamSet = ({ teamSetId }: { teamSetId: number }) => {
  const { courseId } = useCourse()
  return useQuery<unknown, unknown, TeamSet>({
    queryKey: [`courses/${courseId}/team-sets/${teamSetId}`],
    enabled: Boolean(teamSetId),
  })
}
