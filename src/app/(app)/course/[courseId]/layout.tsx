"use client"

import { CourseProvider } from "./(hooks)/useCourse"
import Navbar from "@/components/Navbar"
import { Separator } from "@/components/ui/separator"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CourseProvider>
        <Navbar />
        <Separator />
        {children}
      </CourseProvider>
    </>
  )
}
