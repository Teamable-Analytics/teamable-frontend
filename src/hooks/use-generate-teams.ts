import { useToast } from "@/hooks/use-toast"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useMutation } from "@tanstack/react-query"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"

export const useGenerateTeams = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()
  const mutation = useMutation<void, any, void>({
    mutationFn: async () => {
      return defaultMutationFn(
        `courses/${courseId}/generate_teams/`,
        undefined,
        { allowEmptyResponse: true },
      )
    },
    onSuccess: () => {
      toast({
        title: "Teams generated successfully",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to generate teams",
        description:
          "Something went wrong while generating teams. Please try again later.",
      })
    },
  })

  return {
    generateTeamsAsync: mutation.mutateAsync,
    ...mutation,
  }
}
