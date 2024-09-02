"use client"

import { useToast } from "@/hooks/use-toast"
import { useCallback } from "react"
import { deleteCookie } from "cookies-next"
import { useAuthUser } from "@/app/(providers)/auth-user-provider"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export const useLogout = () => {
  const { toast } = useToast()
  const { refetch } = useAuthUser()
  const router = useRouter()

  const logoutSync = useCallback(() => {
    deleteCookie("token", { path: "/" })
    toast({
      title: "Logged out successfully",
    })
    void refetch()
    router.push(ROUTES.LOG_IN)
  }, [refetch, toast, router])

  return {
    logoutSync,
  }
}
