"use client"

import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"
import { useAuthUser } from "@/app/(providers)/auth-user-provider"
import Logo from "@/components/Logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Text } from "@/components/ui/text"
import { useLogout } from "@/hooks/use-logout"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const { logoutSync } = useLogout()
  const { courseId, courseName } = useCourse()

  return (
    <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Logo />
        </Link>
        <Text element="p">|</Text>
        <Badge variant="outline">{courseName}</Badge>
      </div>

      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              aria-label="Toggle navigation"
              className="focus:outline-none"
            >
              <HamburgerMenuIcon className="w-6 h-6"/>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuLabel className="flex justify-center">
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
            </DropdownMenuLabel>
            <NavigationMenuLink
              href={`/course/${courseId}/setup`}
              className={navigationMenuTriggerStyle()}
            >
                  Onboarding
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/course/${courseId}/students`}
              className={navigationMenuTriggerStyle()}
            >
                  Students
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/course/${courseId}/team-sets`}
              className={navigationMenuTriggerStyle()}
            >
                  Manage Teams
            </NavigationMenuLink>
            <DropdownMenuItem className={navigationMenuTriggerStyle()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-2 hidden md:flex">
        <NavigationMenuList className="flex justify-between">
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/course/${courseId}/setup`}
              className={navigationMenuTriggerStyle()}
            >
              Onboarding
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/course/${courseId}/students`}
              className={navigationMenuTriggerStyle()}
            >
              Students
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/course/${courseId}/team-sets`}
              className={navigationMenuTriggerStyle()}
            >
              Manage Teams
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
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
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logoutSync}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </NavigationMenu>
  )
}

export default Navbar
