import { Organization } from "@/_temp_types/organization"

export interface Course {
  id: number;
  name: string;
  organization: Organization;
  sections: CourseSection[];
  lms_course_id: string;
}

export interface CourseSection {
  id: number;
  name: string;
  description: string;
}
