import { redirect } from "next/navigation"
import { ROUTES } from "@/routes"
import { authUserQueryFn } from "@/hooks/use-auth-user-query"
import { getTokenAuthHeaderServer } from "../../utils/auth-server"

export default async function Home() {
  const authHeader = getTokenAuthHeaderServer()
  const user = await authUserQueryFn({ authHeader })

  if (!user) redirect(ROUTES.SIGN_UP)
  if (!user.course_memberships.length) redirect(ROUTES.AUTH_ERROR)

  redirect(`/course/${user.course_memberships[0].course}/setup`)
}
