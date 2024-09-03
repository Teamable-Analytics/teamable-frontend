"use client"
import React, { ReactNode, useEffect, useState } from "react"
import { Action, NonEmptyArray } from "@/types"
import Check from "@public/check.svg"
import { Button } from "@/components/ui/button"
export interface StepDefinition {
  enabled: boolean;
  current: boolean;
  completed: boolean;
  title: string;
  description: string | ReactNode;
  action?: Action;
}

interface StepDetailCardProps {
  steps: NonEmptyArray<StepDefinition>;
}

export const SetupStepDetailCard = ({ steps }: StepDetailCardProps) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0)
  const selectedStep = steps[selectedStepIndex]

  useEffect(() => {
    const initialIndex = steps.findIndex((step) => step.current)
    if (initialIndex === -1) return
    setSelectedStepIndex(initialIndex)
  }, [steps])

  return (
    <div className="lg:min-h-[60dvh] flex flex-col lg:flex-row border border-gray-300 rounded-xl">
      <div className="p-8 pt-10 lg:p-14 flex-[3] flex flex-col gap-8 justify-between border-b lg:border-r lg:border-b-0 border-gray-300">
        <div className="flex flex-col gap-6 text-sm lg:text-base leading-normal">
          <div className="flex flex-col gap-2">
            <p className="text-sm opacity-50">Step {selectedStepIndex + 1}</p>
            <p className="font-semibold text-lg lg:text-2xl">
              {selectedStep.title}
            </p>
          </div>
          {selectedStep.description}
        </div>
        <div className="flex gap-2 flex-wrap">
          {selectedStep.action && (
            <Button
              onClick={selectedStep.action.onClick}
              disabled={selectedStep.action.loading}
            >
              {selectedStep.action.content}
            </Button>
          )}
        </div>
      </div>
      <div className="flex-[2]">
        {steps.map((step, index) => {
          return (
            <div
              key={`step-${index}`}
              tabIndex={0}
              className={`
                flex items-center gap-4 px-6 py-4 border-b border-gray-300 transition
                lg:gap-5
                ${index === 0 ? "lg:rounded-tr-xl" : ""}
                ${index === steps.length - 1 ? "border-b-0 lg:border-b rounded-b-xl lg:rounded-b-none" : ""}
                ${step.enabled ? "hover:bg-gray-100 hover:cursor-pointer" : ""}
                ${index === selectedStepIndex ? "border-l-2 border-l-black bg-gray-50" : ""}
              `}
              onClick={() => step.enabled && setSelectedStepIndex(index)}
              aria-disabled={!step.enabled}
            >
              <div
                className={`
                  flex-shrink-0 inline-flex items-center justify-center rounded-full w-[2rem] h-[2rem] text-white text-sm
                  lg:w-[2.75rem] lg:h-[2.75rem]
                  ${step.enabled && step.completed ? "bg-green-500" : "bg-black"}
                  ${step.enabled ? "opacity-100" : "opacity-20"}
                `}
              >
                {step.enabled && step.completed ? (
                  <Check className="w-5 fill-current" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex gap-2 items-center justify-between w-full">
                <p
                  className={`
                    text-sm lg:text-base 
                    ${step.enabled ? "opacity-100" : "opacity-20"}
                  `}
                >
                  {step.title}
                </p>
                {step.current && (
                  <div className="px-[0.4rem] py-[0.2rem] bg-gray-200 text-xs text-gray-600 rounded-md">
                    Current
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {/* spacer so the steps don't get uncomfortably close to the bottom in the side-by-side view */}
        <div className="lg:min-h-[3rem]" />
      </div>
    </div>
  )
}
