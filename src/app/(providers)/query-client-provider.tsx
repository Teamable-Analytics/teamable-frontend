"use client"

import {
  QueryClient,
  QueryClientProvider as TSQueryClientProvider,
} from "@tanstack/react-query"
import { getTokenAuthHeader } from "../../../utils/auth"

function appendTrailingSlashIfNeeded(path: string): string {
  if (path.includes("?")) {
    const [p, ...rest] = path.split("?")
    return `${appendTrailingSlashIfNeeded(p)}?${rest.join()}`
  }
  if (path.endsWith("/")) return path
  return `${path}/`
}

export async function defaultMutationFn<TArgs>(
  path: string,
  args?: TArgs,
  options?: { allowEmptyResponse?: boolean },
) {
  const res = await fetch(
    appendTrailingSlashIfNeeded(
      `${process.env.BACKEND_BASE_URI}/api/v1/${path}`,
    ),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(getTokenAuthHeader() ?? {}),
      },
      body: JSON.stringify(args),
    },
  )

  if (
    options?.allowEmptyResponse &&
    res.headers.get("Content-Length") === "0"
  ) {
    if (!res.ok) throw Error
    return
  }

  const data = await res.json()

  if (!res.ok) {
    throw data
  }
  return data
}

async function defaultQueryFn({ queryKey }: { queryKey: readonly any[] }) {
  const res = await fetch(
    appendTrailingSlashIfNeeded(
      `${process.env.BACKEND_BASE_URI}/api/v1/${queryKey[0] as string}`,
    ),
    {
      headers: {
        ...(getTokenAuthHeader() ?? {}),
      },
    },
  )
  return res.json()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { queryFn: defaultQueryFn },
  },
})

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <TSQueryClientProvider client={queryClient}>
      {children}
    </TSQueryClientProvider>
  )
}
