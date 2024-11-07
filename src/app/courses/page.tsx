"use client"

import { useAuthUser } from "@/app/(providers)/auth-user-provider"
import Logo from "@/components/Logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { useLogout } from "@/hooks/use-logout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { ReloadIcon } from "@radix-ui/react-icons"

export default function CoursesPage() {
  const { authUser } = useAuthUser()
  const { logoutSync } = useLogout()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authUser?.course_memberships) {
      setLoading(false)
    }
  }, [authUser])

  return (
    <>
      <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky border-1">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <Text element="p">|</Text>
          <h2>Teamable</h2>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {authUser ? (
                <Avatar>
                  <AvatarFallback>
                    {authUser.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="animate-pulse">
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuItem onClick={logoutSync}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </NavigationMenu>
      <Separator />
      <div className="w-full h-screen px-6 sm:px-0">
        <div className="hidden md:block m-12">
          <div className="min-h-screen pb-8">
            <h1 className="text-foreground scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0 text-2xl lg:text-3xl border-0 mb-4">Your Courses</h1>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <ReloadIcon className="mr-2 h-10 w-10 animate-spin text-gray-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {authUser?.course_memberships.map((membership) => (
                  <Card
                    key={membership.id}
                    className="w-full h-full pb-14 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => router.push(`/course/${membership.id}/setup`)}
                  >
                    <CardHeader>
                      <CardTitle className="font-semibold text-base lg:text-xl">
                        {membership.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden mt-4">
          <h1 className="text-foreground scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0 text-2xl lg:text-3xl border-0 m-4">Your Courses</h1>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <ReloadIcon className="mr-2 h-10 w-10 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              {authUser?.course_memberships.map((membership) => (
                <Card
                  key={membership.id}
                  className="w-[350px] m-2 pb-14"
                  onClick={() => router.push(`/course/${membership.id}/setup`)}
                >
                  <CardHeader>
                    <CardTitle className="font-semibold text-lg lg:text-2xl">
                      {membership.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
