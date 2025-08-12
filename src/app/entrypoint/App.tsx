import { Employees } from '@/pages/employees'
import { Header, ErrorBoundary } from '@/shared/ui'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header/>
      <ErrorBoundary>
        <Employees/>
      </ErrorBoundary>
    </div>
  )
}
