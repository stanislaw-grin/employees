import type { Employee } from '@/entities/employee'
import { apiClient } from '@/shared/api'

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const res = await apiClient.get<Employee[]>('/users')

    return res
  } catch {
    throw new Error('Error fetching employees.')
  }
}