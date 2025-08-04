import { SelectArrow } from '@/components/select-arrow.tsx'
import { EmployeeStatuses, EmployeeStatusLabels, type Status } from '@/entities/employee'

interface Props {
  setStatusFilter: (status: Status | '') => void
  statusFilter: Status | ''
}

export const StatusFilter = ({ statusFilter, setStatusFilter }: Props) => {
  return (
    <div className="relative flex items-center">
      <label htmlFor="employee-status" className="sr-only">
        Filter by status
      </label>

      <select
        id="employee-status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as Status | '')}
        className="px-3 py-4 pr-10 text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none bg-transparent"
      >
        <option value="" disabled hidden>
          Filter by status
        </option>
        <option value="">All</option>
        {EmployeeStatuses.map((s) => (
          <option key={s} value={s}>
            {EmployeeStatusLabels[s]}
          </option>
        ))}
      </select>

      <SelectArrow className="right-3"/>
    </div>
  )
}
