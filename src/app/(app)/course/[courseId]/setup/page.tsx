"use client"

import React from "react"
import PageView from "@/components/views/Page"
import { SetupStepDetailCard } from "@/app/(app)/course/[courseId]/setup/(components)/SetupStepDetailCard"
import { useSetupSteps } from "@/app/(app)/course/[courseId]/setup/(hooks)/useSetupSteps"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"

const SetupPage = () => {
  const { steps, addedComponents } = useSetupSteps()
  const { courseId } = useCourse()
  return (
    <PageView
      title={"Onboarding"}
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Onboarding", href: `course/${courseId}/setup` },
      ]}
    >
      <SetupStepDetailCard steps={steps} />
      {addedComponents}
      <div className="min-h-[3rem]" />
    </PageView>
  )
}

export default SetupPage
