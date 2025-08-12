import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { Employee, Status } from '@/entities/employee'

import { useFilteredEmployees } from './use-filtered-employees'
import { fetchEmployees, updateEmployeeStatus } from '../api'
import { employeeQueries } from '../api/query-keys.ts'

interface UpdateStatusPayload {
  id: number;
  status: Status;
}

export const useEmployees = () => {
  const { data: employees = [], isLoading, error } = useQuery<Employee[]>({
    queryKey: employeeQueries.all(),
    queryFn: fetchEmployees,
  })

  const queryClient = useQueryClient()

  const applyStatusMutation = useMutation({
    mutationFn: ({ id, status }: UpdateStatusPayload) => updateEmployeeStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: employeeQueries.all() })
      const previous = queryClient.getQueryData<Employee[]>(employeeQueries.all())

      queryClient.setQueryData<Employee[]>(employeeQueries.all(), old =>
        old?.map(emp => (emp.id === id ? { ...emp, status } : emp)) ?? []
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(employeeQueries.all(), context.previous)
      }

      toast.error('Failed to update employee status.')
    },

    onSuccess: (updated: Employee[]) => {
      queryClient.setQueryData<Employee[]>(employeeQueries.all(), () => updated)
      toast.success('Status successfully updated.')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeeQueries.all() })
    },
  })

  const {
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useFilteredEmployees(employees)

  return {
    employees: filteredEmployees,
    isLoading,
    error,
    applyStatus: applyStatusMutation.mutate,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  }
}