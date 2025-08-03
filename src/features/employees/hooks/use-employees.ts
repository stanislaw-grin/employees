import { startTransition, useCallback } from 'react'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { Employee, Status } from '@/entities/employee'
import { employeeQueryKeys } from '@/features/employees/api/query-keys'

import { useFilteredEmployees } from './use-filtered-employees'
import { fetchEmployees, updateEmployeeStatus } from '../api'

interface UpdateStatusPayload {
  id: number;
  status: Status;
}

export const useEmployees = () => {
  const { data: employees = [], isLoading, error } = useQuery<Employee[]>({
    queryKey: employeeQueryKeys.all,
    queryFn: fetchEmployees,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, status }: UpdateStatusPayload) => updateEmployeeStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: employeeQueryKeys.all })
      const previous = queryClient.getQueryData<Employee[]>(employeeQueryKeys.all)

      queryClient.setQueryData<Employee[]>(employeeQueryKeys.all, old =>
        old?.map(emp => (emp.id === id ? { ...emp, status } : emp)) ?? []
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(employeeQueryKeys.all, context.previous)
      }

      toast.error('Failed to update employee status.')
    },

    onSuccess: (updated: Employee[]) => {
      queryClient.setQueryData<Employee[]>(employeeQueryKeys.all, () => updated)
      toast.success('Status successfully updated.')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.all })
    },
  })

  const applyStatus = useCallback((id: number, status: Status) => {
    mutation.mutate({ id, status })
  }, [mutation])

  const {
    filteredEmployees,
    searchQuery,
    setSearchQuery: _setSearchQuery,
    statusFilter,
    setStatusFilter: _setStatusFilter,
  } = useFilteredEmployees(employees)

  const setSearchQuery = useCallback((query: string) => {
    startTransition(() => {
      _setSearchQuery(query)
    })
  }, [_setSearchQuery])

  const setStatusFilter = useCallback((status: Status | '') => {
    startTransition(() => {
      _setStatusFilter(status)
    })
  }, [_setStatusFilter])

  return {
    employees: filteredEmployees,
    isLoading,
    error,
    applyStatus,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  }
}