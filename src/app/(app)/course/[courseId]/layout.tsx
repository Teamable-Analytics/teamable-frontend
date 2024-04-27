"use client"

import { CourseProvider } from "./(hooks)/useCourse"

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
  }) {
  return (
    <>
      <CourseProvider>
        {children}
      </CourseProvider>
    </>
  )
}
