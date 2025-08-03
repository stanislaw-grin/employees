import { useState } from 'react'

import { CheckIcon, Pencil } from 'lucide-react'

import { cn } from '@/lib/utils'

import { SelectArrow } from '@/components/select-arrow.tsx'
import { type Employee, EmployeeStatusLabels, EmployeeStatuses, type Status } from '@/entities/employee'

const statusColors: Record<Status, string> = {
  Working: 'border-green-500',
  OnVacation: 'border-red-500',
  LunchTime: 'border-yellow-400',
  BusinessTrip: 'border-purple-500',
}

interface Props {
  employee: Employee,
  applyStatus: (id: number, status: Status) => void,
  onEdit: (employee: Employee) => void,
}

export const EmployeeCard = ({ employee, applyStatus, onEdit }: Props) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(employee.status)

  const isStatusDirty = employee.status !== currentStatus

  return (
    <div
      className={
      cn(
        'group relative w-full flex items-center bg-white rounded shadow-lg hover:shadow-sky-500/20' +
        ' transition-shadow p-4',
        isStatusDirty && 'bg-yellow-100/60'
      )
    }>

      <button
        aria-label="Edit employee"
        onClick={() => { onEdit(employee); }}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil size={16}/>
      </button>

      <img
        src={employee.img}
        alt={employee.name}
        className="w-[130px] h-[130px] rounded-full object-cover flex-shrink-0"
      />

      <div className="ml-8 self-end flex-1">
        <p className="text-lg truncate">{employee.name}</p>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center flex-1 gap-1 border-b border-gray-400 relative">
            <span
              className={`w-2 h-2 rounded-full border-2 shrink-0 ${statusColors[currentStatus]}`}
              role="presentation"
            />

            <label htmlFor={`${employee.id}-status-select`} className="sr-only">Employee Status</label>

            <select
              id={`${employee.id}-status-select`}
              value={currentStatus}
              onChange={(e) => { setCurrentStatus(e.target.value as Status); }}
              className="text-sm w-full bg-transparent px-1 py-0.5 pr-4 focus:outline-none appearance-none truncate"
            >
              {EmployeeStatuses.map((s) => (
                <option key={s} value={s}>{EmployeeStatusLabels[s]}</option>
              ))}
            </select>

            {isStatusDirty && (
              <button
                className="relative group right-4 hover:text-green-600 transition-colors rounded-full"
                onClick={() => { applyStatus(employee.id, currentStatus); }}
                aria-label="Toggle status">
                <CheckIcon size={14}/>

                <span
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition z-50">
                  Apply Status
                </span>
              </button>
            )}

            <SelectArrow/>
          </div>
        </div>
      </div>
    </div>
  )
}
