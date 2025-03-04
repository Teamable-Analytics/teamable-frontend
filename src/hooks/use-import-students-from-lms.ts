import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"

export const useImportStudentsFromLms = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()

  const importStudentsAsync = async () => {
    toast({
      title: "Importing students",
      description: "Please wait while we import students from your LMS.",
    })
    await mutation.mutateAsync()
  }

  const mutation = useMutation<void, unknown, void>({
    mutationFn: async () => {
      return defaultMutationFn(`courses/${courseId}/import_students_from_lms/`, undefined, {allowEmptyResponse: true})
    },
    onSuccess: (data) => {
      toast({
        title: "Imported students",
        description:
          "Students from your course have been imported successfully.",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to import students",
        description:
          "Please relaunch Teamable from your Canvas dashboard. If the issue persists, please contact support.",
      })
    },
  })

  return {
    importStudentsAsync,
    ...mutation,
  }
}
