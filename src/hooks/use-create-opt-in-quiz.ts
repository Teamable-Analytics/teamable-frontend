import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"

export const useCreateOptInQuiz = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()
  const mutation = useMutation<void, any, void>({
    mutationFn: async () => {
      return defaultMutationFn(`courses/${courseId}/create_opt_in_quiz_lms/`, undefined, { allowEmptyResponse: true })
    },
    onSuccess: () => {
      toast({
        title: "Opt-in quiz created successfully",
        description:
          "Your students may now indicate their participation through a survey",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to create opt-in quiz",
        description:
          "Something went wrong creating the opt-in quiz. Please try again later.",
      })
    },
  })

  return {
    createOptInQuizAsync: mutation.mutateAsync,
    ...mutation,
  }
}
