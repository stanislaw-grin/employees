import { useState, useCallback, startTransition } from 'react'

import { ErrorState } from '@/components/error-state'
import type { Employee } from '@/entities/employee'
import { useEmployees } from '@/features/employees/hooks/use-employees'
import { EmployeeCard } from '@/features/employees/ui/components/employee-card'
import { EmployeeCardSkeleton } from '@/features/employees/ui/components/employee-card-skeleton'
import { Toolbar } from '@/features/employees/ui/components/toolbar'
import { UserModal } from '@/features/employees/ui/components/user-modal'

export function Employees() {
  const {
    employees,
    isLoading,
    error,
    applyStatus,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useEmployees()

  const [modalState, setModalState] = useState<{
    isOpen: boolean
    employee: Employee | null
  }>({ isOpen: false, employee: null })

  const openUserModal = useCallback(() => {
    startTransition(() => {
      setModalState({ isOpen: true, employee: null })
    })
  }, [])

  const editEmployee = useCallback((employee: Employee) => {
    startTransition(() => {
      setModalState({ isOpen: true, employee })
    })
  }, [])

  const closeUserModal = useCallback(() => {
    startTransition(() => {
      setModalState({ isOpen: false, employee: null })
    })
  }, [])

  const isModalVisible = modalState.isOpen || modalState.employee !== null

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Toolbar
          openCreateUserModal={openUserModal}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {error && (
          <ErrorState title="Error loading employees" description="Please try again later"/>
        )}

        {(!isLoading && !error && !employees.length) && (
          <div className="text-center text-gray-500 font-medium">
            No employees found
          </div>
        )}

        <div
          role="region"
          aria-label="Employee list"
          className="grid gap-x-6 gap-y-6 md:gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading && Array.from({ length: 6 }).map((_, i) => <EmployeeCardSkeleton key={i}/>)}

          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              applyStatus={applyStatus}
              onEdit={editEmployee}
            />
          ))}
        </div>
      </div>

      {isModalVisible && (
        <UserModal
          onClose={closeUserModal}
          editingEmployee={modalState.employee}
        />
      )}
    </>
  )
}
