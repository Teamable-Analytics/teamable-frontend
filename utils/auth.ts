import { getCookie } from "cookies-next"

export function getTokenAuthHeader() {
  const token = getCookie("token")
  return token ? { Authorization: `Token ${token}` } : undefined
}
