import { useQuery } from "@tanstack/react-query"
import { AuthUser } from "@/_temp_types/user"
import { getTokenAuthHeader } from "../../utils/auth"

export const useAuthUserQuery = () => {
  const authHeader = getTokenAuthHeader()
  return useQuery<AuthUser | null, never, AuthUser | null>({
    queryKey: [`accounts/users/me/`, authHeader],
    queryFn: () => authUserQueryFn({ authHeader }),
  })
}

export const authUserQueryFn = async ({
  authHeader,
}: {
  authHeader?: { Authorization: string };
}): Promise<AuthUser | null> => {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URI}/api/v1/accounts/users/me/`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ?? {}),
      },
    },
  )
  if (res.status === 401) return null
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
