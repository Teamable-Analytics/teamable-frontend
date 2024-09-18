"use client"

import React from "react"
import { StudentsProvider, useStudents } from "./(hooks)/useStudents"
import PageView from "@/components/views/Page"
import { StudentTable } from "./(table)/student-table"
import { useImportStudentsFromLms } from "@/hooks/use-import-students-from-lms"
import { useImportStudentGradebookData } from "@/hooks/use-import-student-gradebook-data"

export default function StudentsPage() {
  return (
    <StudentsProvider>
      <StudentsPageView />
    </StudentsProvider>
  )
}

const StudentsPageView = () => {
  const { refetch } = useStudents()
  const {
    importStudentsFromLmsAsync,
    isPending: importStudentsFromLmsPending,
  } = useImportStudentsFromLms()

  const {
    importStudentGradebookDataAsync,
    isPending: importStudentGradebookDataPending,
  } = useImportStudentGradebookData()

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
          onClick: async () => {
            await importStudentsFromLmsAsync(undefined)
            await refetch()
          },
          loading: importStudentsFromLmsPending,
        },
        {
          content: "Import gradebook data",
          onClick: async () => {
            await importStudentGradebookDataAsync(undefined)
            await refetch()
          },
          loading: importStudentGradebookDataPending,
        },
      ]}
    >
      <StudentTable />
    </PageView>
  )
}
