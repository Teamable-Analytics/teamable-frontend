import {
  ProjectSetSelect,
  type ProjectSetSelectProps, SidebarProjectList,
} from "."

type ProjectSetSidebarProps = ProjectSetSelectProps

export const ProjectSetSidebar = ({ allProjectSets }: ProjectSetSidebarProps) => {
  return <>
    <ProjectSetSelect allProjectSets={allProjectSets} />
    <SidebarProjectList />
  </>
}
