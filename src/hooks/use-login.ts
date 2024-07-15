"use client"
import {
  LoginErrorResponse,
  LoginArgs,
  LoginSuccessResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

type UseLoginResponse = LoginErrorResponse | LoginSuccessResponse;

export const useLogin = () => {
  const { toast } = useToast()
  const mutation = useMutation<UseLoginResponse, never, LoginArgs>({
    mutationFn: (args) =>
      fetch(`${process.env.BACKEND_BASE_URI}/api/v1/accounts/log-in/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!("token" in data)) {
        toast({
          variant: "destructive",
          title: "Unable to login with provided credentials",
          description:
            "There was a problem with your request. Please double-check your details and try again.",
        })
        return
      }

      document.cookie = `token=${data.token}`
    },
  })

  return {
    loginAsync: mutation.mutateAsync,
    ...mutation,
  }
}
