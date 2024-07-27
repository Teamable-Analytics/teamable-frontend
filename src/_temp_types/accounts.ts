
export interface LoginSuccessResponse {
    token: string
}

export interface LoginErrorResponse {
    non_field_errors?: string[]
}

export interface LoginArgs {
    username: string
    password: string
}

export interface SignUpSuccessResponse {
    success: true
    email: string;
}

export interface SignUpErrorResponse {
    email?: string[];
    password?: string[];
}

export interface SignUpArgs {
    email: string
    password: string
    token?: string | null
}

