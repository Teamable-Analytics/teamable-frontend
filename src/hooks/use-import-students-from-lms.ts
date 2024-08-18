import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { defaultMutationFn } from "@/app/providers/query-client-provider"

export const useImportStudentsFromLms = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()
  // todo: types
  const mutation = useMutation<any, any, any>({
    mutationFn: async () => {
      return defaultMutationFn(`courses/${courseId}/import_students_from_lms/`)
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
          "Something went wrong importing students. Please try again later.",
      })
    },
  })

  return {
    importStudentsFromLmsAsync: mutation.mutateAsync,
    ...mutation,
  }
}
