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
                    <Link href="/students" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Students
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/profiles" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Profiles
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/projects" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Projects
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/teams" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Manage Teams
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar
