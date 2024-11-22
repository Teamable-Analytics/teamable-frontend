"use client"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import PageView from "@/components/views/Page"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { CalculateOnboardingCompletion } from "./(hooks)/calculateOnboardingCompletion"
const HomePage = () => {
  const { courseId } = useCourse()
  const { completionPercentage, nextStepTitle } = CalculateOnboardingCompletion()

  const attributes = [
    "Requirement #1",
    "Requirement #2",
    "Requirement #3",
    "Requirement #4",
    "Requirement #5",
    "Requirement #6",
    "Requirement #7",
    "Requirement #8",
    "Requirement #9",
    "Requirement #10",
  ]

  const groupedAttributes = []
  for (let i = 0; i < attributes.length; i += 4) {
    groupedAttributes.push(attributes.slice(i, i + 4))
  }

  return (
    <PageView title={"Course home"}>
      <h2 className="text-lg font-semibold mb-4">
                Welcome back!{" "}
        <a href={`/course/${courseId}/setup`} className="underline hover:font-bold">
                    Wanting to start a new team formation?
        </a>
      </h2>

      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12">
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
        <div className="text-sm">
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

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Sign up Stats</h3>
        <div className="border border-gray-300 p-4 rounded-md">
          <ul className="list-disc list-inside space-y-2">
            <li>Number of Students Enrolled on Your LMS: <b>50</b></li>
            <li>Total Team Formation Acceptions: <b>10</b></li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Previous Team Formation</h3>
        <div className="border border-gray-300 p-4 rounded-md">
          <ul className="list-disc list-inside space-y-2">
            <li>Number of Adopted Attributes: <b>16</b></li>
            <li>Team Formation Date: <b>10/09/2023</b></li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Attributes Used</h3>
        <div className="border border-gray-300 p-4 rounded-md">
          <div className="grid grid-cols-4 gap-4">
            {groupedAttributes.map((group, index) => (
              <ul key={index} className="list-disc list-inside space-y-1">
                {group.map((attribute, idx) => (
                  <li key={idx}>{attribute}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </PageView>
  )
}

export default HomePage
