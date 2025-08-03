import { StrictMode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'

import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <App />
        <Toaster position="bottom-right"/>
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>,
)
