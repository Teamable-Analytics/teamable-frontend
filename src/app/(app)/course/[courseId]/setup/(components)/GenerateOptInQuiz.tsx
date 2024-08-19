"use client"

import React, { useMemo } from "react"
import { useCreateOptInQuiz } from "@/hooks/use-create-opt-in-quiz"
import { useOnboardingProgress } from "@/hooks/use-onboarding-progress"
import Link from "@public/link.svg"

export const GenerateOptInQuiz = () => {
  const { data } = useOnboardingProgress()
  const { createOptInQuizAsync, isPending } = useCreateOptInQuiz()

  const hasCreatedOptInQuiz = useMemo(() => {
    return data?.has_created_opt_in_quiz
  }, [data])

  return (
    <div
      className={`
        flex px-6 p-4 items-center justify-between border rounded-lg transition border-gray-300
        hover:cursor-pointer hover:bg-gray-100
      `}
      onClick={() => {
        if (!isPending && !hasCreatedOptInQuiz) {
          void createOptInQuizAsync(undefined)
        }
        if (hasCreatedOptInQuiz && data?.opt_in_quiz_link) {
          window.open(data.opt_in_quiz_link, "_blank")
        }
      }}
    >
      {hasCreatedOptInQuiz ? "View opt-in quiz" : "Generate opt-in quiz"}
      <div
        className={`
          flex-shrink-0 inline-flex items-center justify-center rounded-full w-[2rem] h-[2rem] text-white text-sm 
          ${hasCreatedOptInQuiz ? "bg-green-500" : "bg-black"}
          hover:cursor-pointer
        `}
      >
        {hasCreatedOptInQuiz ? <Link className="w-5 fill-current" /> : "->"}
      </div>
    </div>
  )
}
