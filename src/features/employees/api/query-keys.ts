export const employeeQueryKeys = {
  all: ['employees'] as const,
  byId: (id: number) => [...employeeQueryKeys.all, id] as const,
}
