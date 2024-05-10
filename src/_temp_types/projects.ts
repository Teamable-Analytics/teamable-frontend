/**
 * A requirement for a student with a specific attribute to work on a project
 */
export type ProjectRequirement = {
  attribute: number;
  operator: RequirementOperator;
  // The number of students with this attribute required as described by the RequirementOperator
  value: number;
};

export enum RequirementOperator {
  GT = "Greater Than",
  GTE = "Greater Than or Equal",
  LT = "Less Than",
  LTE = "Less Than or Equal",
  IN = "In",
  NOT_IN = "Not In",
  CONTAINS = "Contains",
  EQ = "Equal",
}

/**
 * A model for a project with requirements that a Team may work on
 */
export type Project = {
  id: number;
  name: string;
  // Specifies the number of teams that can work on this project
  numberOfTeams: number;
  requirements?: ProjectRequirement[];
};

export type ProjectSet = {
  id: number;
  name: string;
  numProjects: number;
};
