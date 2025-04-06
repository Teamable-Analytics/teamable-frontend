"use client"

import Logo from "@/components/Logo"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import { Text } from "@/components/ui/text"
import Link from "next/link"

const NavbarPlain = () => {
  return (
    <NavigationMenu className="container my-4 mx-0 min-w-full flex justify-between gap-4 sticky">
      <Link href="/" className="flex gap-2 items-center">
        <Logo />
        <Text element="p" className="font-semibold">
          Teamable
        </Text>
      </Link>
    </NavigationMenu>
  )
}

export default NavbarPlain
