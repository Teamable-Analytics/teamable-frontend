"use client"
import {
  LoginErrorResponse,
  LoginArgs,
  LoginResponse,
} from "@/_temp_types/accounts"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { defaultMutationFn } from "@/app/(providers)/query-client-provider"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export const useLogin = () => {
  const router = useRouter()
  const { toast } = useToast()
  const mutation = useMutation<LoginResponse, LoginErrorResponse, LoginArgs>({
    mutationFn: async (args) => defaultMutationFn(`accounts/log-in/`, args),
    onSuccess: async (data) => {
      setCookie("token", data.token, { path: "/" })
      router.push(ROUTES.BASE)
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
