import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from "./(providers)/query-client-provider"
import { AuthUserContextProvider } from "@/app/(providers)/auth-user-provider"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Teamable",
  description:
    "A team formation and analytics tool for students and educators.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <QueryClientProvider>
          <AuthUserContextProvider>
            {children}
            <Toaster />
          </AuthUserContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
