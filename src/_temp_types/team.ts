import { CourseRole } from "@/_temp_types/courseMember"

export interface Team {
  id: number;
  name: string;
  slug: string;
  members: {
    id: number;
    lms_id: number | `${number}`;
    name: string;
    role: CourseRole;
  }[];
}
