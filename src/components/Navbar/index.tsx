'use client'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Logo from "@/components/Logo"

const Navbar = () => {
    return (
        <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky">
            <Logo />
            <NavigationMenuList className="flex justify-between">
                <NavigationMenuItem>
                    <NavigationMenuLink href="/students" className={navigationMenuTriggerStyle()}>
                        Students
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/profiles" className={navigationMenuTriggerStyle()}>
                        Profiles
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/projects" className={navigationMenuTriggerStyle()}>
                        Projects
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/teams" className={navigationMenuTriggerStyle()}>
                        Manage Teams
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar
