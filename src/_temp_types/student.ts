import { Relationship } from "@/_temp_types/relationship"
import { CourseSection } from "@/_temp_types/course"

export type Student = {
  id: number;
  lms_id: number;
  name: string;
  attributes?: Record<number, number[]>;
  relationships?: Record<number, Relationship>;
  projectPreferences?: number[];
  team?: number;
  sections?: CourseSection[];
};
