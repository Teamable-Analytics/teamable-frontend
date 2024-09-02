"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useParams } from "next/navigation"
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
              href={`/course/${courseId}/students`}
              className={navigationMenuTriggerStyle()}
            >
              Students
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/course/${courseId}/teams`}
              className={navigationMenuTriggerStyle()}
            >
              Manage Teams
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        {authUser && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {authUser.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={logoutSync}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </NavigationMenu>
  )
}

export default Navbar
