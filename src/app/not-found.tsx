import { Text } from "@/components/ui/text"

const Custom404 = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col items-center gap-3 pb-16">
        <Text element="h3" as="h3">
          Page Not Found
        </Text>
        <Text element="p" as="smallText">
          { errorMessage }
        </Text>
      </div>
    </div>
  )
}

export default Custom404
