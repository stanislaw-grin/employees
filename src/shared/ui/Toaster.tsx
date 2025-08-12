import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

export const Toaster = ({ position = 'bottom-right', ...props }: ToasterProps) => (
  <SonnerToaster position={ position } { ...props } />
)