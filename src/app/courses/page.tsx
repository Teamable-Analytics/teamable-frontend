"use client"

import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useAuthUser } from "@/app/(providers)/auth-user-provider"
import Logo from "@/components/Logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { useLogout } from "@/hooks/use-logout"
import Link from "next/link"


import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function CoursesPage() {
  const { authUser } = useAuthUser()
  const { logoutSync } = useLogout()
  const { courseId, courseName } = useCourse()

  return (
    <>
      <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky border-1">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <Text element="p">|</Text>
          <h2>Teamable</h2>
          {/* <Badge variant="outline">Teamable</Badge> */}
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
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>

      <div className="hidden md:block m-12">
        <div className="w-auto h-auto">
          <h1 className="text-foreground scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0 text-2xl lg:text-3xl border-0 mb-4">Your Courses</h1>
          <div className="flex flex-wrap">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="w-[350px] mr-4 mb-4 pb-14">
                <CardHeader>
                  <CardTitle className="font-semibold text-lg lg:text-2xl">Course Number</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden mt-4">
        <h1 className="text-foreground scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0 text-2xl lg:text-3xl border-0 m-4">Your Courses</h1>
        <div className="w-full flex flex-col items-center ">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="w-[350px] m-2 pb-14">
              <CardHeader>
                <CardTitle className="font-semibold text-lg lg:text-2xl">Course Number</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

const CoursesPageView = () => {
  // return (
  //   <PageView

  //   </PageView>
  // )
}
