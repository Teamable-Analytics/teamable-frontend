"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Logo from "@/components/Logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthUser } from "@/app/(providers)/auth-user-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/use-logout"
import { useParams } from "next/navigation"

const Navbar = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { authUser } = useAuthUser()
  const { logoutSync } = useLogout()

  return (
    <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky">
      <Logo />
      <div className="flex gap-2">
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
