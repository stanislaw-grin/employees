export const EmployeeStatuses = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
] as const

export type Status = typeof EmployeeStatuses[number]

export interface Employee {
  id: number
  name: string
  status: Status
  img: string
}