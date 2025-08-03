import type { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import type { Employee } from '@/entities/employee'

export function renderWithProviders(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Working',
    img: 'https://example.com/john.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'OnVacation',
    img: 'https://example.com/jane.jpg',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    status: 'LunchTime',
    img: 'https://example.com/bob.jpg',
  },
]