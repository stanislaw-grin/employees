import { ErrorBoundary } from '@/components/error-boundary.tsx'
import { Header } from '@/components/header'
import { Employees } from '@/features/employees/ui/views/employees'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <ErrorBoundary>
        <Employees/>
      </ErrorBoundary>
    </div>
  )
}
