"use client"
import { LoginArgs, Token } from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"


export const useLogin = () => {
  const mutation = useMutation<Token, never, LoginArgs>({
    mutationFn: (args) => fetch(`${process.env.BACKEND_BASE_URI}/api/v1/accounts/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((res) => res.json()),
    onSuccess: (data) => {
      document.cookie = `token=${data.token}`
    },
  })

  return {
    loginAsync: mutation.mutateAsync,
    ...mutation,
  }
}
