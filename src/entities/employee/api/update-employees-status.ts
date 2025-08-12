import type { Employee, Status } from '@/entities/employee'
import { apiClient } from '@/shared/api'

export const updateEmployeeStatus = async (id: number, status: Status): Promise<Employee[]> => {
  try {
    const res = await apiClient.post<Employee[]>(`/users/${id}`, { status })

    return res
  } catch {
    throw new Error('Error updating employee status.')
  }
}