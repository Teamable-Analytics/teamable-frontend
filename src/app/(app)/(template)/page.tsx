import { redirect } from "next/navigation"

const getFakeData = async () => {
  return [
    { id: 1, name: "John Doe", numericValue: 123 },
    { id: 2, name: "Jane Doe", numericValue: 456 },
    { id: 3, name: "John Smith", numericValue: 789 },
  ]
}

export default async function Home() {
  redirect(`/course/31084/setup`)
}
