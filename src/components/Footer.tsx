import React from "react"
import { Text } from "@/components/ui/text"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-16 py-8">
      <Text element="p" as="smallText" className="p-0">
        Teamable, 2025.
      </Text>
      <div className="flex gap-4 items-center">
        <Link href="/privacy" className="p-0 mt-0">
          <Text element="p" as="mutedText" className="p-0 mt-0">
            Privacy policy
          </Text>
        </Link>
        <Text element="p" as="smallText" className="p-0 mt-0">
          ✨
        </Text>
      </div>
    </footer>
  )
}

export default Footer
