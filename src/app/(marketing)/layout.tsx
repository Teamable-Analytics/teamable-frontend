import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footer"
import NavbarPlain from "@/components/NavbarPlain"

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPlain />
      <Separator />
      {children}
      <Separator />
      <Footer />
    </>
  )
}
