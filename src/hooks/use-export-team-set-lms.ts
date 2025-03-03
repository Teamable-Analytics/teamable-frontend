import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"
import { title } from "../../utils/string"

interface ExportTeamSetLmsArgs {
  teamSet: number;
}

export const useExportTeamSetLms = () => {
  const { toast } = useToast()
  const { courseId, lmsType } = useCourse()
  const mutation = useMutation<void, any, ExportTeamSetLmsArgs>({
    mutationFn: async ({ teamSet }: ExportTeamSetLmsArgs) => {
      return defaultMutationFn(
        `courses/${courseId}/export_team_to_lms/`,
        { team_set: teamSet },
        { allowEmptyResponse: true },
      )
    },
    onSuccess: () => {
      toast({
        title: `Exported team set to ${title(lmsType)}`,
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Unable to export team set to  ${title(lmsType)}`,
        description:
          "Please relaunch Teamable from your Canvas dashboard. If the issue persists, please contact support.",
      })
    },
  })

  return {
    exportTeamSetAsync: mutation.mutateAsync,
    ...mutation,
  }
}
