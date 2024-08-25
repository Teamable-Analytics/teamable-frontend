export interface AuthUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  course_memberships: Array<{ course: number }>;
}

export interface AnonUser {
  id: null;
  username: "";
  is_staff: false;
}
