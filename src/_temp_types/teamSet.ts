import { Team } from "@/_temp_types/team"

export interface TeamSet {
  id: number;
  name: string;
  teams: Team[];
}

export interface CourseTeamSets {
  team_sets: Omit<TeamSet, "teams">[];
}
