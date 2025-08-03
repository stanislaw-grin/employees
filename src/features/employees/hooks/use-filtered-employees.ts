import { useQueryState } from 'nuqs'

import type { Employee, Status } from '@/entities/employee'

function filterEmployees(
  employees: Employee[],
  statusFilter: Status | '',
  searchQuery: string
) {
  const lowerSearchQuery = searchQuery.toLowerCase()

  return employees.filter((employee) => {
    const matchesStatus = statusFilter === '' || employee.status === statusFilter
    const matchesNameText = employee.name.toLowerCase().includes(lowerSearchQuery)
    const matchesStatusText = employee.status.toLowerCase().includes(lowerSearchQuery)

    return matchesStatus && (matchesNameText || matchesStatusText)
  })
}

export const useFilteredEmployees = (employees: Employee[]) => {
  const [searchQuery, setSearchQuery] = useQueryState('query', { defaultValue: '' })
  const [statusFilter, setStatusFilter] = useQueryState<Status | ''>('filter', {
    defaultValue: '',
    parse: value => value as Status
  })

  const filteredEmployees = filterEmployees(employees, statusFilter, searchQuery)

  return {
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  }
}