export function EmployeeCardSkeleton() {
  return (
    <div
      className="flex items-center bg-white rounded shadow p-4 animate-pulse space-x-4"
      aria-label="Loading employee data"
    >
      <div className="w-[130px] h-[130px] bg-gray-200 rounded-full"/>

      <div className="flex-1 ml-8 min-w-0 space-y-6 self-end">
        <div className="h-4 bg-gray-200 rounded w-3/4"/>
        <div className="h-3 bg-gray-100 rounded w-full"/>
      </div>
    </div>
  )
}