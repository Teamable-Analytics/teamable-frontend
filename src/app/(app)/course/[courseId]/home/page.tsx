"use client"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import PageView from "@/components/views/Page"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { CalculateOnboardingCompletion } from "./(hooks)/calculateOnboardingCompletion"
import { usePastAttributes } from "./(hooks)/use-attributes"
import { useTotalStudents } from "./(hooks)/useTotalStudents"
const HomePage = () => {
  const { courseId } = useCourse()
  const { completionPercentage, nextStepTitle } = CalculateOnboardingCompletion()
  const { totalStudents, error: totalStudentsError } = useTotalStudents()
  const { data: pastAttributes, error: pastAttributesError } = usePastAttributes()
  const {toast} = useToast()

  useEffect(() => {
    if (totalStudentsError) {
      toast({
        title: "Error fetching students",
        description: "There was an error fetching the number of students enrolled on your LMS.",
      })
    }
    if (pastAttributesError) {
      toast({
        title: "Error fetching attributes",
        description: "There was an error fetching the attributes used in previous team formation.",
      })
    }
  }, [totalStudentsError, pastAttributesError, toast])


  const noTeamSets = !pastAttributes || Object.keys(pastAttributes).length === 0

  return (
    <PageView title={"Your dashboard,"}>
      <h2 className="text-lg font-semibold mb-4">
                Welcome back!{" "}
        {completionPercentage === 100 ? (
          <a href={`/course/${courseId}/setup`} className="text-gray-500 hover:underline">
                        Wanting to start a new team formation?
          </a>
        ) : (
          <span className="text-gray-500">Your onboarding process is incomplete...</span>
        )}
      </h2>

      {completionPercentage !== 100 && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
          <div className="w-20 h-20 md:w-12 md:h-12">
            <CircularProgressbar
              value={completionPercentage}
              text={`${completionPercentage}`}
              styles={buildStyles({
                rotation: -0.5,
                strokeLinecap: 'round',
                textSize: '24px',
                pathColor: '#000',
                textColor: '#000',
                trailColor: '#e6e6e6',
              })}
            />
          </div>
          <div className="text-sm text-center sm:text-left">
            <p className="text-gray-700">
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


      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Sign up Stats</h3>
        <div className="border border-gray-300 p-4 rounded-md">
          <ul className="list-disc list-inside space-y-2">
            <li>Students Enrolled on Your LMS: <b>30</b></li>
            <li>Total Team Formation Acceptions: <b>{totalStudents}</b></li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Previous Team Formation</h3>
        <div className="border border-gray-300 p-4 rounded-md">
          <ul className="list-disc list-inside space-y-2">
            <li>Number of Adopted Attributes: <b>{pastAttributes?.total_attributes_used}</b></li>
            <li>Team Formation Date: <b>{pastAttributes?.formation_date}</b></li>
          </ul>
        </div>
      </div>

      {!noTeamSets && pastAttributes && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Attributes Used</h3>
          <div className="border border-gray-300 p-4 rounded-md">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {pastAttributes.attributes.length > 0 ? (
                pastAttributes.attributes.map(
                  (attribute: { name: string }, index: number) => (
                    <ul key={index} className="list-disc list-inside space-y-1">
                      <li>{attribute.name}</li>
                    </ul>
                  )
                )
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  <li>No attributes used</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

    </PageView>
  )
}

export default HomePage
