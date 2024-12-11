"use client"

import { formatDate } from "@/../utils/format-date"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import PageView from "@/components/views/Page"
import { ReloadIcon } from "@radix-ui/react-icons"
import AttributesUsed from "./(components)/AttributesUsed"
import InfoSection from "./(components)/InfoSection"
import OnboardingProgress from "./(components)/OnboardingProgress"
import { CalculateOnboardingCompletion } from "./(hooks)/calculateOnboardingCompletion"
import { usePastAttributes } from "./(hooks)/useAttributes"
import { useHandleErrors } from "./(hooks)/useHandleErrors"
import { useTotalStudents } from "./(hooks)/useTotalStudents"

const HomePage = () => {
  const { courseId } = useCourse()
  const { completionPercentage, nextStepTitle, isLoading: isLoadingOnboarding } = CalculateOnboardingCompletion()
  const { totalStudents, optedInStudents, isLoading: isLoadingStudents, error: totalStudentsError } = useTotalStudents()
  const { data: pastAttributes, isLoading: isLoadingAttributes, error: pastAttributesError } = usePastAttributes()
  useHandleErrors({ totalStudentsError, pastAttributesError })

  const isLoading = isLoadingOnboarding || isLoadingStudents || isLoadingAttributes

  const signUpStats = [
    { label: "Students Enrolled on Your LMS", value: totalStudents },
    { label: "Total Team Formation Acceptions", value: optedInStudents },
  ]

  const previousTeamFormation = [
    { label: "Number of Adopted Attributes", value: pastAttributes?.total_attributes_used || 0 },
    { label: "Team Formation Date", value: pastAttributes ? formatDate(pastAttributes.formation_date) : "N/A" },
  ]

  return (
    <PageView title={"Your dashboard,"}>
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <ReloadIcon className="mr-2 h-10 w-10 animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          <OnboardingProgress
            completionPercentage={completionPercentage}
            nextStepTitle={nextStepTitle ?? "No next step"}
            courseId={courseId}
          />
          <InfoSection title="Sign up Stats" items={signUpStats} />
          <InfoSection title="Previous Team Formation" items={previousTeamFormation} />
          <AttributesUsed attributes={pastAttributes?.attributes ?? []} />
        </>
      )}
    </PageView>
  )
}

export default HomePage
