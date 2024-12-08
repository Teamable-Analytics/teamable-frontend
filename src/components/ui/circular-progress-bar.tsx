"use client"

import React from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const progressBarStyles = buildStyles({
  rotation: -0.5,
  strokeLinecap: "round",
  textSize: "24px",
  pathColor: "#000",
  textColor: "#000",
  trailColor: "#e6e6e6",
})

interface CircularProgressProps {
  value: number;
  text: string;
}

const CircularProgressBar: React.FC<CircularProgressProps> = ({ value, text }) => {
  return (
    <CircularProgressbar value={value} text={text} styles={progressBarStyles} />
  )
}

export default CircularProgressBar
