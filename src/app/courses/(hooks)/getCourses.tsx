"use client"


export const getCourses = () => {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URI}/courses`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
