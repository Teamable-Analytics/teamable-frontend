"use client"

import React from "react"
import { StudentsProvider } from "./(hooks)/useStudents"
import PageView from "@/components/views/Page"
import { StudentTable } from "./(table)/student-table"
import { useImportStudentsFromLms } from "@/hooks/use-import-students-from-lms"

export default function StudentsPage() {
  const {
    importStudentsFromLmsAsync,
    isPending: importStudentsFromLmsPending,
  } = useImportStudentsFromLms()

  return (
    <PageView
      title="Students"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Students", href: "/students" },
      ]}
      actions={[
        {
          content: "Import students",
          onClick: () => importStudentsFromLmsAsync(undefined),
          loading: importStudentsFromLmsPending,
        },
      ]}
    >
      <StudentsProvider>
        <StudentTable />
      </StudentsProvider>
    </PageView>
  )
}
