"use client"

import { QueryClient, QueryClientProvider as TSQueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

interface QueryClientProviderProps {
    children: React.ReactNode
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <TSQueryClientProvider client={queryClient} >
      {children}
    </TSQueryClientProvider>
  )
}
