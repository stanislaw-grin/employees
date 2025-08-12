import type { Employee } from '@/entities/employee'

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Working',
    img: 'https://example.com/john.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'OnVacation',
    img: 'https://example.com/jane.jpg',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    status: 'LunchTime',
    img: 'https://example.com/bob.jpg',
  },
]