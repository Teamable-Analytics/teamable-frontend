"use client"

import { createContext, ReactNode, useContext, useEffect } from "react"
import { AuthUser } from "@/_temp_types/user"
import { useAuthUserQuery } from "@/hooks/use-auth-user-query"
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { AUTH_PATHS, ROUTES } from "@/routes"

type QueryRefetchFn<TData, TError> = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<TData, TError>>;

type UserContextType = {
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  refetch: QueryRefetchFn<AuthUser, never>;
};

const AuthUserContext = createContext<UserContextType>({
  isAuthenticated: false,
  authUser: null,
  refetch: (() => {}) as QueryRefetchFn<AuthUser, never>,
})

export const AuthUserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: authUser, isLoading, refetch } = useAuthUserQuery()

  useEffect(() => {
    if (isLoading || pathname === ROUTES.AUTH_ERROR) return
    // redirect the user to auth routes if they are not logged in
    if (!authUser) {
      if (AUTH_PATHS.includes(pathname)) return
      return router.push(ROUTES.LOG_IN)
    }
    // don't let the user route to auth routes if they are already logged in
    if (authUser) {
      if (!AUTH_PATHS.includes(pathname)) return
      return router.push(ROUTES.BASE)
    }
  }, [authUser, isLoading, router, pathname])

  return (
    <AuthUserContext.Provider
      value={{
        isAuthenticated: Boolean(authUser),
        authUser: authUser ?? null,
        refetch: refetch as QueryRefetchFn<AuthUser, never>,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}

export const useAuthUser = () => {
  return useContext(AuthUserContext)
}
