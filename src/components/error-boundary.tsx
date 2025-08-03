import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function FallbackComponent() {
  return (
    <div className="text-center text-red-600 p-4">
      Something went wrong. Please reload the page.
    </div>
  )
}

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ReactErrorBoundary FallbackComponent={FallbackComponent}>{children}</ReactErrorBoundary>
}
