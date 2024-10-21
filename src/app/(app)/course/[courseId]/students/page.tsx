"use client"

import PageView from "@/components/views/Page"
import { useImportStudentGradebookData } from "@/hooks/use-import-student-gradebook-data"
import { useImportStudentsFromLms } from "@/hooks/use-import-students-from-lms"
import { StudentsProvider, useStudents } from "./(hooks)/useStudents"
import { StudentTable } from "./(table)/student-table"

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
    importStudentsWithToast,
    isPending: importStudentsFromLmsPending,
  } = useImportStudentsFromLms()

  const {
    importGradebookDataWithToast,
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
            await importStudentsWithToast()
            await refetch()
          },
          loading: importStudentsFromLmsPending,
        },
        {
          content: "Import gradebook data",
          onClick: async () => {
            await importGradebookDataWithToast()
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
