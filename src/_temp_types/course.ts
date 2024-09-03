import { Organization } from "@/_temp_types/organization"

export interface Course {
  id: number;
  name: string;
  organization: Organization;
  lms_course_id: string;
}
