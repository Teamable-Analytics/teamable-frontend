import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"

export const useImportStudentGradebookData = () => {
  const { toast } = useToast()
  const { courseId } = useCourse()

  const importGradebookDataAsync = async() => {
    toast({
      title: "Importing student gradebook data",
      description: "Please wait while we import student gradebook data from your LMS.",
    })
    await mutation.mutateAsync()
  }

  const mutation = useMutation<void, unknown, void>({
    mutationFn: async () => {
      return defaultMutationFn(
        `courses/${courseId}/import_gradebook_attribute_from_lms/`,
        undefined,
        { allowEmptyResponse: true },
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
          "Please relaunch Teamable from your Canvas dashboard. If the issue persists, please contact support.",
      })
    },
  })

  return {
    importGradebookDataAsync,
    ...mutation,
  }
}
