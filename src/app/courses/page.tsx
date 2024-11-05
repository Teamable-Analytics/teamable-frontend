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
import { Text } from "@/components/ui/text"
import { useAuthUserQuery } from "@/hooks/use-auth-user-query"
import { useLogout } from "@/hooks/use-logout"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Separator } from "@/components/ui/separator"

export default function CoursesPage() {
  const { authUser } = useAuthUser()
  const { logoutSync } = useLogout()
  const { data: userData, isLoading, error } = useAuthUserQuery()
  const router = useRouter()
  const openCourseHomePageRouter = (courseId: number) => {
    router.push(`/course/${courseId}/setup`)
  }

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
      <div className="w-full lg:grid lg:grid-cols-2 h-screen px-6 sm:px-0">
        <div className="hidden bg-muted lg:block bg-zinc-900" />
        <div className="hidden md:block m-12">
          <div className="w-auto h-auto">
            <h1 className="text-foreground scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0 text-2xl lg:text-3xl border-0 mb-4">Your Courses</h1>
            {isLoading && <p>Loading courses...</p>}
            {error && <p>Failed to load courses</p>}
            <div className="flex flex-wrap space-y-4">
              {userData?.course_memberships && userData.course_memberships.map((membership) => (
                <Card
                  key={membership.course.id}
                  className="w-full cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => openCourseHomePageRouter(membership.course.id)}
                >
                  <CardHeader>
                    <CardTitle className="font-semibold text-lg lg:text-2xl">
                      {membership.course.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <h1 className="text-foreground scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0 text-2xl lg:text-3xl border-0 m-4">Your Courses</h1>
          {isLoading && <p>Loading courses...</p>}
          {error && <p>Failed to load courses</p>}
          <div className="w-full flex flex-col items-center">
            {userData?.course_memberships && userData.course_memberships.map((membership) => (
              <Card
                key={membership.course.id}
                className="w-[350px] mb-4 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => openCourseHomePageRouter(membership.course.id)}
              >
                <CardHeader>
                  <CardTitle className="font-semibold text-lg lg:text-2xl">
                    {membership.course.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
