import { Text } from "@/components/ui/text"

const AuthenticationErrorPage = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col items-center">
        <Text element="h3" as="h3">
          Authentication error
        </Text>
        <Text element="p" as="smallText">
          We have encountered an error processing your authentication. Please
          contact us or try again.
        </Text>
      </div>
    </div>
  )
}

export default AuthenticationErrorPage
