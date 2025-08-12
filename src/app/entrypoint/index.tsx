import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { Providers } from '@/app/entrypoint/providers'
import { Toaster } from '@/shared/ui'
import './global.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
      <Toaster/>
    </Providers>
  </StrictMode>,
)
