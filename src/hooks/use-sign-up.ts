"use client"
import {
  SignUpArgs,
  SignUpErrorResponse,
  SignUpSuccessResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useLogin } from "./use-login"

type UseSignUpResponse = SignUpErrorResponse | SignUpSuccessResponse;


export const useSignUp = () => {
  const { toast } = useToast()
  const { loginAsync } = useLogin()

  const mutation = useMutation<SignUpSuccessResponse, SignUpErrorResponse, SignUpArgs>({
    mutationFn: async (args) => {
      const res = await fetch(`${process.env.BACKEND_BASE_URI}/api/v1/accounts/sign-up/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      })
      const data = await res.json()
      if (!res.ok) {
        throw data
      }
      return data
    },
    onSuccess: async (data, variables) => {
      toast({
        title: "Thank you!",
        description: "Your account has been created successfully.",
      })
      await loginAsync({
        username: data.email,
        password: variables.password,
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Unable to sign up.",
        description: [...(error.email ?? []), ...(error.password ?? [])].join("\n"),
      })
    },
  })

  return {
    signUpAsync: mutation.mutateAsync,
    ...mutation,
  }
}
