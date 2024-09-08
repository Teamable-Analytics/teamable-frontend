import { Student } from "@/_temp_types/student"

export interface Team {
  id: number;
  name: string;
  slug: string;
  members: Student[];
}
