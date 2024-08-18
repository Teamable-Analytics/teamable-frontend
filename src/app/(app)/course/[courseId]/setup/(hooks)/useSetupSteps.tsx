import React from "react"
import { OnboardingProgress } from "@/_temp_types/onboarding"
import { NonEmptyArray } from "@/types"
import {
  Action,
  StepDefinition,
} from "@/app/(app)/course/[courseId]/setup/(components)/SetupStepDetailCard"
import { useImportStudentsFromLms } from "@/hooks/use-import-students-from-lms"
import { useImportStudentGradebookData } from "@/hooks/use-import-student-gradebook-data"
import { GenerateOptInQuiz } from "@/app/(app)/course/[courseId]/setup/(components)/GenerateOptInQuiz"
import { useOnboardingProgress } from "@/hooks/use-onboarding-progress"

interface UseSetupStepsReturnType {
  steps: NonEmptyArray<StepDefinition>;
  isLoading: boolean;
  onboardingProgress?: OnboardingProgress;
}

export const useSetupSteps = (): UseSetupStepsReturnType => {
  const { data, isLoading } = useOnboardingProgress()

  const { importStudentsFromLmsAsync } = useImportStudentsFromLms()
  const { importStudentGradebookData } = useImportStudentGradebookData()

  // todo: generate teams mutation

  if (!data || isLoading) {
    return {
      steps: ORDERED_STEPS.map((step) => BASE_STEPS[step]) as NonEmptyArray<StepDefinition>,
      isLoading,
      onboardingProgress: data,
    }
  }

  const actions: Partial<Record<StepKey, Action>> = {
    IMPORT_STUDENTS: {
      content: "Import students",
      onClick: () => importStudentsFromLmsAsync(undefined),
    },
    STUDENT_DATA: {
      content: "Import gradebook data",
      onClick: () => importStudentGradebookData(undefined),
    },
  }

  const currentStep = getCurrentStep(data)
  const steps = ORDERED_STEPS.map((step) => {
    return {
      ...(BASE_STEPS[step] as StepDefinition),
      current: currentStep === step,
      completed: STEP_COMPLETED[step](data),
      action: actions[step],
    }
  })

  return {
    steps: steps as NonEmptyArray<StepDefinition>,
    isLoading,
    onboardingProgress: data,
  }
}

function getCurrentStep(data: OnboardingProgress): StepKey | null {
  if (data.has_team_set) return null
  if (data.has_attribute_responses && !data.has_team_set)
    return STEP.GENERATE_TEAMS
  if (data.has_students && !data.has_attribute_responses)
    return STEP.STUDENT_DATA
  if (!data.has_students) return STEP.IMPORT_STUDENTS
  return STEP.IMPORT_STUDENTS
}

const STEP_COMPLETED: Record<StepKey, (data: OnboardingProgress) => boolean> = {
  IMPORT_STUDENTS: (data) => data.has_students,
  STUDENT_PROFILES: (data) => data.has_attribute,
  STUDENT_DATA: (data) => data.has_attribute_responses,
  PROJECT_SETUP: (data) => false,
  GENERATE_TEAMS: (data) => data.has_team_set,
}

const STEP = {
  IMPORT_STUDENTS: "IMPORT_STUDENTS",
  STUDENT_PROFILES: "STUDENT_PROFILES",
  STUDENT_DATA: "STUDENT_DATA",
  PROJECT_SETUP: "PROJECT_SETUP",
  GENERATE_TEAMS: "GENERATE_TEAMS",
} as const

const ORDERED_STEPS: StepKey[] = [
  STEP.IMPORT_STUDENTS,
  STEP.STUDENT_PROFILES,
  STEP.STUDENT_DATA,
  STEP.PROJECT_SETUP,
  STEP.GENERATE_TEAMS,
]

type StepKey = (typeof STEP)[keyof typeof STEP];

const BASE_STEPS: Record<StepKey, StepDefinition> = {
  [STEP.IMPORT_STUDENTS]: {
    title: "Import students",
    description: (
      <div className="flex flex-col gap-4 max-w-[55ch]">
        <p className="leading-relaxed">
          Import all students from your connected Canvas course into Teamable.
        </p>
        <p className="leading-relaxed">
          If you wish for students to opt-in to being imported into Teamable,
          you can do so by creating a quiz in Canvas here. Only students who
          respond affirmatively to this will be imported.
        </p>
        <GenerateOptInQuiz />
      </div>
    ),
    current: false,
    completed: false,
    enabled: true,
  },
  [STEP.STUDENT_PROFILES]: {
    title: "Define student profile",
    description:
      "Some generic information about completing this step goes here. Answer basic questions and then provide the relevant CTA.",
    current: false,
    completed: false,
    enabled: false,
  },
  [STEP.STUDENT_DATA]: {
    title: "Elicit student information",
    description: (
      <div className="flex flex-col gap-4 max-w-[55ch]">
        <p className="leading-relaxed">
          Gather student data for each attribute in the student profile.
        </p>
        <p className="leading-relaxed">
          Import Canvas gradebook data for each student. This will be processed
          into values indicating the relative performance of each student.
        </p>
      </div>
    ),
    current: false,
    completed: false,
    enabled: true,
  },
  [STEP.PROJECT_SETUP]: {
    title: "(Optional) Project setup",
    description:
      "Some generic information about completing this step goes here. Answer basic questions and then provide the relevant CTA.",
    current: false,
    completed: false,
    enabled: false,
  },
  [STEP.GENERATE_TEAMS]: {
    title: "Generate teams",
    description: (
      <div className="flex flex-col gap-4 max-w-[55ch]">
        <p className="leading-relaxed">
          A pre-configuration we have set up for your course will be used to
          automatically generate teams based on student gradebook data.
        </p>
      </div>
    ),
    current: false,
    completed: false,
    enabled: true,
  },
}
