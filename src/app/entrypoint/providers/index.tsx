import { QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'

import { queryClient } from '@/shared/api'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        { children }
      </NuqsAdapter>
    </QueryClientProvider>
  )
}