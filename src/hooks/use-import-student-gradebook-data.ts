import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { defaultMutationFn } from "@/app/providers/query-client-provider"

export const useImportStudentGradebookData = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()
  // todo: types
  const mutation = useMutation<any, any, any>({
    mutationFn: async () => {
      return defaultMutationFn(
        `courses/${courseId}/import_gradebook_attribute_from_lms/`,
      )
    },
    onSuccess: () => {
      toast({
        title: "Student gradebook data imported",
        description:
          "The current grades for your students have been imported and processed successfully.",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to import student gradebook data",
        description:
          "Something went wrong importing student gradebook data. Please try again later.",
      })
    },
  })

  return {
    importStudentGradebookData: mutation.mutateAsync,
    ...mutation,
  }
}
