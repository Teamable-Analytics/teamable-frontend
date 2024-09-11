import { CourseSection } from "@/_temp_types/course"
import { CourseRole } from "@/_temp_types/courseMember"

export type Student = {
  id: number;
  lms_id: string;
  sis_user_id: string;
  lms_link: string | null;
  name: string;
  sections?: CourseSection[];
  role: CourseRole;
};
