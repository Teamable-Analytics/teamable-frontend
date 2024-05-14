import {toast} from "@/hooks/use-toast"
import {type ApiTeamSetTemplate} from "@/_temp_types/api/teams"
import PageView from "@/components/views/Page"
import {
  ProjectRequirementsTable,
  ProjectSetSidebar,
} from "./(components)"
import {ProjectsProvider, ProjectSearchProvider} from "./(hooks)"

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
      <ProjectSearchProvider>
        <div className="container mx-auto p-0">
          <div className="flex w-full gap-10">
            <ProjectSetSidebar allProjectSets={await getOutlinedProjectSetsData()}/>
            <div className="border-r border-gray-300 h-[55vh]"/>
            <ProjectRequirementsTable />
          </div>
        </div>
      </ProjectSearchProvider>
    </ProjectsProvider>
  </PageView>
}

export default ProjectSetPage
