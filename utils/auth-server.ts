import { cookies } from "next/headers"

export function getTokenAuthHeaderServer() {
  const token = cookies().get("token" as any)?.value
  return token ? { Authorization: `Token ${token}` } : undefined
}
