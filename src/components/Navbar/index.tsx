'use client'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Logo from "@/components/Logo"

const Navbar = () => {
    return (
        <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky">
            <Logo />
            <NavigationMenuList className="flex justify-between">
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/students">
                        Students
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/profiles">
                        Profiles
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/projects">
                        Projects
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/teams">
                        Manage Teams
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar
