"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useParams } from 'next/navigation'
import Logo from "@/components/Logo"

const Navbar = () => {
  const { courseId } = useParams<{ courseId: string }>()
  return (
    <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky">
      <Logo />
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
            href={`/course/${courseId}/profiles`}
            className={navigationMenuTriggerStyle()}
          >
            Profiles
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={`/course/${courseId}/project-sets`}
            className={navigationMenuTriggerStyle()}
          >
            Projects
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
    </NavigationMenu>
  )
}

export default Navbar
