import { DjangoErrorResponse } from "@/_temp_types/django"

export interface LoginResponse {
  token: string;
}

export type LoginErrorResponse = DjangoErrorResponse<"email" | "password">;

export interface LoginArgs {
  email: string;
  password: string;
}

export interface SignUpResponse {
  email: string;
}

export type SignUpErrorResponse = DjangoErrorResponse<"email" | "password" | "token">;

export interface SignUpArgs {
  email: string;
  password: string;
  token?: string | null;
}
