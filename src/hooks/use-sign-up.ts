"use client"
import {
  SignUpArgs,
  SignUpErrorResponse,
  SignUpSuccessResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

type UseSignUpResponse = SignUpErrorResponse | SignUpSuccessResponse;

export const useSignUp = () => {
  const { toast } = useToast()
  const mutation = useMutation<UseSignUpResponse, never, SignUpArgs>({
    mutationFn: (args) =>
      fetch(`${process.env.BACKEND_BASE_URI}/api/v1/accounts/sign-up/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      }).then((res) => res.json()),
    onSuccess: async (data) => {
      if (!("success" in data)) {
        toast({
          variant: "destructive",
          title: "Unable to sign up.",
          // todo: list out errors per field
          description: "",
        })
        return
      }

      toast({
        title: "Thank you!",
        description: "Your account has been created successfully.",
      })
    },
  })

  return {
    signUpAsync: mutation.mutateAsync,
    ...mutation,
  }
}
