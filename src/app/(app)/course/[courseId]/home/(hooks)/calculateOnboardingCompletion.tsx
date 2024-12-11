import { useSetupSteps } from "@/app/(app)/course/[courseId]/setup/(hooks)/useSetupSteps"

export const CalculateOnboardingCompletion = () => {
  const { steps, isLoading } = useSetupSteps()
  const enabledSteps = steps.filter((step) => step.enabled)

  const completedSteps = enabledSteps.filter((step) => step.completed)

  const completionPercentage = Math.round((completedSteps.length / enabledSteps.length) * 100)

  const firstIncompleteStep = enabledSteps.find((step) => !step.completed)

  return {
    completionPercentage,
    nextStepTitle: firstIncompleteStep ? firstIncompleteStep.title : null,
    isLoading,
  }
}
