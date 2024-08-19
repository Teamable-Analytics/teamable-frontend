import {useQuery} from "@tanstack/react-query"
import {OnboardingProgress} from "@/_temp_types/onboarding"
import {useCourse} from "@/app/(app)/course/[courseId]/(hooks)/useCourse"

export const useOnboardingProgress = () => {
  const { courseId } = useCourse()
  return useQuery<unknown, unknown, OnboardingProgress>({
    queryKey: [`courses/${courseId}/get_onboarding_progress`],
  })
}
