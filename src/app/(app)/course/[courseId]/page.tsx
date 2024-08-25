import { redirect } from "next/navigation"

const CourseHomepage = async ({ params }: { params: { courseId: string } }) => {
  redirect(`/course/${params.courseId}/setup`)
}

export default CourseHomepage
