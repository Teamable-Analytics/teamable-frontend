import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

interface ErrorState {
  totalStudentsError?: any;
  pastAttributesError?: any;
}

export const useHandleErrors = ({ totalStudentsError, pastAttributesError }: ErrorState) => {
  const { toast } = useToast()

  useEffect(() => {
    if (totalStudentsError) {
      toast({
        title: "Error fetching students",
        description: "There was an error fetching the number of students enrolled on your LMS.",
      })
    }
    if (pastAttributesError) {
      toast({
        title: "Error fetching attributes",
        description: "There was an error fetching the attributes used in previous team formation.",
      })
    }
  }, [totalStudentsError, pastAttributesError, toast])
}
