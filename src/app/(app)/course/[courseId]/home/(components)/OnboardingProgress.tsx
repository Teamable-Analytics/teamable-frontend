import CircularProgressBar from "@/components/ui/circular-progress-bar"

interface OnboardingProgressProps {
  completionPercentage: number;
  nextStepTitle: string;
  courseId: string | number;
}

const OnboardingProgress = ({
  completionPercentage,
  nextStepTitle,
  courseId,
}: OnboardingProgressProps) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">
        Welcome back!{" "}
        {completionPercentage === 100 ? (
          <a
            href={`/course/${courseId}/setup`}
            className="text-gray-500 hover:underline"
          >
            Wanting to start a new team formation?
          </a>
        ) : (
          <span className="text-gray">
            Your onboarding process is incomplete...
          </span>
        )}
      </h2>

      {completionPercentage !== 100 && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
          <div className="w-20 h-20 md:w-12 md:h-12">
            <CircularProgressBar
              value={completionPercentage}
              text={`${completionPercentage}`}
            />
          </div>
          <div className="text-sm text-center sm:text-left">
            <p>
              You are <b>{completionPercentage}%</b> done with your current onboarding process.
            </p>
            <p className="font-semibold">
              <span className="text-gray-800">Next step: </span>
              <a
                href={`/course/${courseId}/setup`}
                className="underline hover:font-bold"
              >
                {nextStepTitle}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default OnboardingProgress
