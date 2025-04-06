import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footer"
import { AuthUserContextProvider } from "@/app/(providers)/auth-user-provider"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthUserContextProvider>
        {children}
        <Separator />
        <Footer />
      </AuthUserContextProvider>
    </>
  )
}
