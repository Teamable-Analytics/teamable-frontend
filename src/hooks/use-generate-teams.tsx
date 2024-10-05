import { useToast } from "@/hooks/use-toast"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useMutation } from "@tanstack/react-query"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface GenerateTeamsParams {
  attribute: number;
}

interface GenerateTeamsResponse {
  team_set_id: number;
}

export const useGenerateTeams = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()
  const router = useRouter()

  const mutation = useMutation<GenerateTeamsResponse, any, GenerateTeamsParams>({
    mutationFn: async ({ attribute }) => {
      return defaultMutationFn(
        `courses/${courseId}/generate_teams/`,
        { attribute },
        { allowEmptyResponse: true },
      )
    },
    onSuccess: ({ team_set_id }) => {
      toast({
        title: "Teams generated successfully",
        action: (
          <Button
            onClick={() => router.push(`/course/${courseId}/team-sets/${team_set_id}`)}
            size="sm"
          >
            View
          </Button>
        ),
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
