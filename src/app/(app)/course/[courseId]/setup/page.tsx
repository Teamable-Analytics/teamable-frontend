"use client"

import React from "react"
import PageView from "@/components/views/Page"
import { SetupStepDetailCard } from "@/app/(app)/course/[courseId]/setup/(components)/SetupStepDetailCard"
import { useSetupSteps } from "@/app/(app)/course/[courseId]/setup/(hooks)/useSetupSteps"

const SetupPage = () => {
  const { steps } = useSetupSteps()
  return (
    <PageView title={"Onboarding"} breadcrumbs={[{ title: "Home", href: "/" }]}>
      <SetupStepDetailCard steps={steps} />
      <div className="min-h-[3rem]" />
    </PageView>
  )
}

export default SetupPage
