"use client"
import {
  SignUpArgs,
  SignUpErrorResponse,
  SignUpResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useLogin } from "./use-login"

export const useSignUp = () => {
  const { toast } = useToast()
  const { loginAsync } = useLogin()

  const mutation = useMutation<SignUpResponse, SignUpErrorResponse, SignUpArgs>(
    {
      mutationFn: async (args) => {
        const res = await fetch(
          `${process.env.BACKEND_BASE_URI}/api/v1/accounts/sign-up/`,
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
      onSuccess: async (data, variables) => {
        toast({
          title: "Thank you!",
          description: "Your account has been created successfully.",
        })
        await loginAsync({
          email: data.email,
          password: variables.password,
        })
      },
      onError: (error) => {
        if ("token" in error) {
          console.error(error.token.join(","))
          toast({
            variant: "destructive",
            title: "Unable to sign up",
            description: "Unverified sign up denied.",
          })
        }
        if ("non_field_errors" in error) {
          toast({
            variant: "destructive",
            title: "Unable to sign up",
            description: error.non_field_errors?.join("\n"),
          })
        }
      },
    },
  )

  return {
    signUpAsync: mutation.mutateAsync,
    ...mutation,
  }
}
