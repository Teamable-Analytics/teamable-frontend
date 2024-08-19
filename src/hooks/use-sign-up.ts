"use client"
import {
  SignUpArgs,
  SignUpErrorResponse,
  SignUpResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useLogin } from "./use-login"
import { defaultMutationFn } from "@/app/providers/query-client-provider"

export const useSignUp = () => {
  const { toast } = useToast()
  const { loginAsync } = useLogin()

  const mutation = useMutation<SignUpResponse, SignUpErrorResponse, SignUpArgs>(
    {
      mutationFn: async (args) => defaultMutationFn(`accounts/sign-up/`, args),
      onSuccess: async (data, variables) => {
        toast({
          title: "Thank you!",
          description: "Your account has been created successfully.",
        })
        await loginAsync({
          email: data.email,
          password: variables.password,
        })
        // todo: route to setup page
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
