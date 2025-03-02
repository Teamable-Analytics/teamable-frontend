import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export async function GET(request: NextRequest) {
  const authToken = request.nextUrl.searchParams.get("token")
  const redirectPath = request.nextUrl.searchParams.get("path")

  if (!authToken || !redirectPath) {
    return {
      status: 400,
      body: "Malformed request",
    }
  }

  cookies().set("token", authToken, { path: "/" })
  redirect(redirectPath)
}
