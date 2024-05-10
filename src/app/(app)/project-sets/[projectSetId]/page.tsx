import {toast} from "@/components/ui/use-toast"
import {redirect} from "next/navigation"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"

type ProjectPageParams = {
  params: {
    projectSetId: number
  },
  searchParams?: {
    [key: string]: string | undefined
  }
}

async function getRawProjectSetsData(): Promise<ApiTeamSetTemplate[]> {
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

const ProjectPage = async ({params, searchParams}: ProjectPageParams) => {
  const {projectSetId} = params
  const isEditMode = searchParams?.isEdit?.toLowerCase() === 'true' ?? false
  const sidebarSearchTerm = searchParams?.search ?? ''

  const rawProjectSets: ApiTeamSetTemplate[] = await getRawProjectSetsData()
  const currentProjectSetIdx = rawProjectSets.findIndex((projectSet) => projectSet.id === projectSetId)

  if (currentProjectSetIdx === -1) {
    toast({
      title: "Project set not found.",
      variant: "destructive",
    })
    redirect('/project-sets')
  }


}
