import {toast} from "@/hooks/use-toast"
import {redirect, useParams} from "next/navigation"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"

const getRawProjectSetsData = async (): Promise<ApiTeamSetTemplate[]> => {
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

const ProjectPage = async () => {
  const {courseId, projectSetId} = useParams<{ courseId: string, projectSetId: string }>()


  const rawProjectSets: ApiTeamSetTemplate[] = await getRawProjectSetsData()
  const currentProjectSetIdx = rawProjectSets.findIndex((projectSet) => projectSet.id.toString() === projectSetId)

  if (currentProjectSetIdx === -1) {
    toast({
      title: "Project set not found.",
      variant: "destructive",
    })
    redirect(`/course/${courseId}/project-sets`)
  }


}
