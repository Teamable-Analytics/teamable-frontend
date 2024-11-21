"use client"

import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
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
  const { courseId } = useCourse()
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
        { title: "Home", href: `/course/${courseId}/home` },
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
