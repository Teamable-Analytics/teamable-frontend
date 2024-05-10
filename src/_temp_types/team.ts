import { Student } from "@/_temp_types/student"
import { ProjectRequirement } from "@/_temp_types/projects"

export type Team = {
  id: number;
  name?: string;
  projectId?: number;
  requirements?: ProjectRequirement[];
  students: Student[];
};
