import Navbar from "@/components/Navbar"
import {Separator} from "@/components/ui/separator"
import Footer from "@/components/Footer"

export default function CourseLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Separator />
      <Footer />
    </>
  )
}
