import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'
import './globals.css'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {Separator} from "@/components/ui/separator"

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Teamable Analytics',
    description: 'A team formation and analytics tool for students and educators.',
}

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${manrope.className}`}>
                <Navbar/>
                <Separator/>
                {children}
                <Separator/>
                <Footer />
            </body>
        </html>
    )
}
