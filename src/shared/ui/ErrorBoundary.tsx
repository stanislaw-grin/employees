import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function FallbackComponent() {
  return (
    <div className="text-center text-red-600 p-4">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="mb-4">Please try reloading the page.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  )
}

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ReactErrorBoundary FallbackComponent={FallbackComponent}>{children}</ReactErrorBoundary>
}
