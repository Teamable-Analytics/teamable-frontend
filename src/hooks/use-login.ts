"use client"
import {
  LoginErrorResponse,
  LoginArgs,
  LoginResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

export const useLogin = () => {
  const { toast } = useToast()
  const mutation = useMutation<LoginResponse, LoginErrorResponse, LoginArgs>({
    mutationFn: async (args) => {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URI}/api/v1/accounts/log-in/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        },
      )

      const data = await res.json()

      if (!res.ok) {
        throw data
      }
      return data
    },
    onSuccess: (data) => {
      // todo: redirect the user somewhere
      document.cookie = `token=${data.token}`
    },
    onError: (error) => {
      if ("non_field_errors" in error) {
        toast({
          variant: "destructive",
          title: "Unable to login",
          description: error.non_field_errors?.join("\n"),
        })
      }
    },
  })

  return {
    loginAsync: mutation.mutateAsync,
    ...mutation,
  }
}
