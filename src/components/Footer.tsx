import React from "react"
import { Text } from "@/components/ui/text"

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-16 py-8">
      <Text element="p" as="smallText" className="p-0">
        Teamable, 2025.
      </Text>
      <Text element="p" as="smallText" className="p-0 mt-0">
        ✨
      </Text>
    </footer>
  )
}

export default Footer
