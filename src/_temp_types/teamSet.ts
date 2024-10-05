import { Team } from "@/_temp_types/team"
import { Student } from "@/_temp_types/student"

export interface TeamSet {
  id: number;
  name: string;
  teams: Team[];
  unassigned_students: Student[];
}
