import { OnboardingProgress } from "@/_temp_types/onboarding"
import { GenerateTeamsAttributeSelector } from "@/app/(app)/course/[courseId]/components/GenerateTeamsAttributeSelector"
import { GenerateOptInQuiz } from "@/app/(app)/course/[courseId]/setup/(components)/GenerateOptInQuiz"
import { StepDefinition } from "@/app/(app)/course/[courseId]/setup/(components)/SetupStepDetailCard"
import { useGenerateTeams } from "@/hooks/use-generate-teams"
import { useImportStudentGradebookData } from "@/hooks/use-import-student-gradebook-data"
import { useImportStudentsFromLms } from "@/hooks/use-import-students-from-lms"
import { useOnboardingProgress } from "@/hooks/use-onboarding-progress"
import { Action, NonEmptyArray } from "@/types"
import { ReactNode, useState } from "react"

interface UseSetupStepsReturnType {
  steps: NonEmptyArray<StepDefinition>;
  isLoading: boolean;
  onboardingProgress?: OnboardingProgress;
  addedComponents: ReactNode;
}

export const useSetupSteps = (): UseSetupStepsReturnType => {
  const { data, isLoading, refetch } = useOnboardingProgress()

  const {
    importStudentsAsync,
    isPending: importStudentsFromLmsPending,
  } = useImportStudentsFromLms()
  const {
    importGradebookDataAsync,
    isPending: importStudentGradebookDataPending,
  } = useImportStudentGradebookData()
  const { generateTeamsAsync, isPending: generateTeamsPending } =
    useGenerateTeams()

  const [selectGradeSourceDialogOpen, setSelectGradeSourceDialogOpen] =
    useState(false)

  if (!data || isLoading) {
    return {
      steps: ORDERED_STEPS.map(
        (step) => BASE_STEPS[step],
      ) as NonEmptyArray<StepDefinition>,
      isLoading,
      onboardingProgress: data,
      addedComponents: null,
    }
  }

  const actions: Partial<Record<StepKey, Action>> = {
    IMPORT_STUDENTS: {
      content: "Import students",
      onClick: async () => {
        await importStudentsAsync()
        await refetch()
      },
      loading: importStudentsFromLmsPending,
    },
    STUDENT_DATA: {
      content: "Import gradebook data",
      onClick: async () => {
        await importGradebookDataAsync()
        await refetch()
      },
      loading: importStudentGradebookDataPending,
    },
    GENERATE_TEAMS: {
      content: "Generate teams",
      onClick: async () => {
        setSelectGradeSourceDialogOpen(true)
      },
      loading: generateTeamsPending,
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

  const addedComponents = (
    <GenerateTeamsAttributeSelector
      open={selectGradeSourceDialogOpen}
      setOpen={setSelectGradeSourceDialogOpen}
      isPending={generateTeamsPending}
      onSubmit={async ({ attribute }) => {
        await generateTeamsAsync({ attribute })
        void refetch()
      }}
    />
  )

  return {
    steps: steps as NonEmptyArray<StepDefinition>,
    isLoading,
    onboardingProgress: data,
    addedComponents,
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

const ImportStudentsComponent = () => {
  const { data, isLoading } = useOnboardingProgress()
  return (
    <div className="flex flex-col gap-4 max-w-[55ch]">
      <p className="leading-relaxed">
        Import all students from your connected Canvas course into Teamable.
      </p>
      <p className="leading-relaxed">
        If you wish for students to opt-in to being imported into Teamable, you
        can do so by creating a quiz in Canvas here. Only students who respond
        affirmatively to this will be imported.
      </p>
      {!isLoading && !data?.has_students && <GenerateOptInQuiz />}
    </div>
  )
}

const BASE_STEPS: Record<StepKey, StepDefinition> = {
  [STEP.IMPORT_STUDENTS]: {
    title: "Import students",
    description: <ImportStudentsComponent />,
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
