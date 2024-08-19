import { redirect } from "next/navigation"

export default async function Home() {
  // todo: redirect to onboarding
  redirect(`/course/31084/setup`)
}
