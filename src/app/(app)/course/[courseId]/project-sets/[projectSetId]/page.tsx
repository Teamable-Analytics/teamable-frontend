import {toast} from "@/hooks/use-toast"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"
import PageView from "@/components/views/Page"
import {
  ProjectSetSidebar,
} from "./(components)"
import {ProjectsProvider, SearchTermProvider} from "./(hooks)"

const getOutlinedProjectSetsData = async (): Promise<ApiTeamSetTemplate[]> => {
  const projectSetsURL = new URL('/api/v1/teamset-templates', process.env.NEXT_PUBLIC_BACKEND_URL)
  const response = await fetch(projectSetsURL)
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

type ProjectPageType = {
  params: {
    courseId: string,
    projectSetId: string,
  },
}

const ProjectSetPage = async ({params: {courseId, projectSetId}}: ProjectPageType) => {
  return <PageView
    title="Project Sets"
    breadcrumbs={[
      {title: "Home", href: `/course/${courseId}`},
      {title: "Project Sets", href: `/course/${courseId}/project-sets`},
      {title: `Project Set Detail`, href: `/course/${courseId}/project-sets/${projectSetId}`},
    ]}
  >
    <ProjectsProvider>
      <SearchTermProvider>
        <ProjectSetSidebar allProjectSets={await getOutlinedProjectSetsData()}/>
      </SearchTermProvider>
    </ProjectsProvider>
  </PageView>
}

export default ProjectSetPage
