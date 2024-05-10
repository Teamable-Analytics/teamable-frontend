import {useParams} from "next/navigation";
import {useEffect} from "react";
import {OutlinedTeamSetTemplate} from "@/_temp_types/api/teams";
import {toast} from "@/components/ui/use-toast";

type ProjectSetDetailContextType = {
  projectSetId: number
}


async function getRawOutlinedProjectSetsData(): Promise<OutlinedTeamSetTemplate[]> {
  const projectSetsURL = new URL('/api/v1/teamset-templates', process.env.NEXT_PUBLIC_BACKEND_URL as string)

  const response = await fetch(projectSetsURL, {cache: 'no-cache'})
  if (!response.ok) {
    const errMsg = "Unable to fetch project sets from API."
    toast({
      title: errMsg,
      variant: "destructive",
    })
    throw new Error(errMsg)
  }
  return await response.json()
}

const useProjectSetDetailProvider = (): ProjectSetDetailContextType => {
  const { projectSetId } = useParams<{ projectSetId: string }>()

  useEffect(() => {
    const fetchProjectSetDetail = async () => {
      try {
        const projectSetURL = new URL('/api/v1/teamset-templates', process.env.NEXT_PUBLIC_BACKEND_URL)
        const projectSet
      } catch (e) {
        toast({
          title: "There was an error fetching the project set.",
          variant: "destructive",
        })
        console.error(e)
      }
    }
  }, [projectSetId])
}
