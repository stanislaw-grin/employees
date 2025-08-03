import { useCallback, useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'

import { SelectArrow } from '@/components/select-arrow.tsx'
import { EmployeeStatuses, EmployeeStatusLabels, type Employee } from '@/entities/employee'

interface Props {
  onClose: () => void
  editingEmployee: Employee | null
}

export function UserModal({ onClose, editingEmployee }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      status: EmployeeStatuses[0],
    },
    mode: 'onChange',
  })

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [onClose, reset])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      handleClose()
    }
  }

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', onEsc)

    return () => { window.removeEventListener('keydown', onEsc); }
  }, [handleClose])

  const onSubmit = (data: { name: string; status: string }) => {
    console.log('Form submitted:', data)
    handleClose()
  }

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md outline-none"
        tabIndex={-1}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 id="modal-title" className="text-lg text-gray-900">
            {editingEmployee ? 'Edit User' : 'Create New User'}
          </h2>
          <p id="modal-desc" className="sr-only">
            Modal dialog to {editingEmployee ? 'edit' : 'create'} an employee.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4" aria-live="polite">
          <div>
            <label htmlFor="user-name" className="text-xs text-gray-500">User name:</label>

            <input
              id="user-name"
              autoFocus
              {...register('name', {
                required: 'Name is required',
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: 'Only English letters and spaces are allowed.',
                },
              })}
              type="text"
              className="block w-full border-b border-gray-300 focus:outline-none py-1 font-light"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />

            {errors.name && (
              <p id="name-error" className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <label htmlFor="user-status" className="text-xs text-gray-500">Status:</label>

          <div className="relative flex items-center">
            <select
              id="user-status"
              {...register('status')}
              className="block w-full border-b border-gray-300 focus:outline-none py-1 font-light appearance-none"
            >
              {EmployeeStatuses.map((s) => (
                <option key={s} value={s}>{EmployeeStatusLabels[s]}</option>
              ))}
            </select>

            <SelectArrow/>
          </div>

          <div className="flex justify-start gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !!errors.name}
              className="bg-brand hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
            >
              {editingEmployee ? 'Save' : 'Create'}
            </button>

            <button
              type="button"
              className="text-gray-600 py-2 px-4"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
