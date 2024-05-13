import {useParams} from "next/navigation"
import {useEffect, useState} from "react"
import {type OutlinedTeamSetTemplate} from "@/_temp_types/api/teams"
import {toast} from "@/hooks/use-toast"

type ProjectSetDetailContextType = {
  projectSetId: number | null
  outlinedProjectSets: OutlinedTeamSetTemplate[]
  projectSetIdx: number
}


async function getOutlinedProjectSetsData(): Promise<OutlinedTeamSetTemplate[]> {
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
  const [outlinedProjectSets, setOutlinedProjectSets] = useState<OutlinedTeamSetTemplate[]>([])
  const [projectSetIdx, setProjectSetIdx] = useState<number>(-1)

  useEffect(() => {
    const fetchProjectSetDetail = async () => {
      try {
        const projectSetURL = new URL('/api/v1/teamset-templates/outlined', process.env.NEXT_PUBLIC_BACKEND_URL)
        const projectSet = await fetch(projectSetURL)
      } catch (e) {
        toast({
          title: "There was an error fetching the project set.",
          variant: "destructive",
        })
        console.error(e)
      }
    }
  }, [projectSetId])

  return {
    projectSetId: !isNaN(Number(projectSetId)) && Number(projectSetId) > 0 ? Number(projectSetId) : null,
    outlinedProjectSets,
    projectSetIdx,
  }
}
