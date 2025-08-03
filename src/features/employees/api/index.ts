import type { Status, Employee } from '@/entities/employee'

const API_URL = 'http://localhost:3001'

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await fetch(`${API_URL}/users`)

  if (!res.ok) {
    throw new Error('Error fetching employees.')
  }

  return res.json()
}

export const updateEmployeeStatus = async (id: number, status: Status) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) {
    throw new Error('Error updating employee status.')
  }

  return res.json()
}
