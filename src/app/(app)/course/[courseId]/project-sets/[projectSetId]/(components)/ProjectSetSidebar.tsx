import {
  ProjectSetSelect,
  type ProjectSetSelectProps, SidebarProjectList,
} from "."
import {Text} from "@/components/ui/text"

type ProjectSetSidebarProps = ProjectSetSelectProps

export const ProjectSetSidebar = ({allProjectSets}: ProjectSetSidebarProps) => {
  return (
    <div className="max-w-96 min-w-60">
      <div className="flex flex-col w-full">
        <div>
          <Text element="h5" as="h5" className="pb-2">
            Project Set
          </Text>
          <ProjectSetSelect allProjectSets={allProjectSets}/>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Text element="h5" as="h5" className="pb-2">
          Projects
        </Text>
        <SidebarProjectList/>
      </div>
    </div>)
}
