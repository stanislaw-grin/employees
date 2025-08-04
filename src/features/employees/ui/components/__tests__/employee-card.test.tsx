import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { type Employee, EmployeeStatusLabels } from '@/entities/employee'

import { EmployeeCard } from '../employee-card'

describe('EmployeeCard Component', () => {
  const mockEmployee: Employee = {
    id: 1,
    name: 'John Doe',
    status: 'Working',
    img: 'https://example.com/john.jpg',
  }

  const mockApplyStatus = vi.fn()
  const mockOnEdit = vi.fn()

  it('renders employee information correctly', () => {
    render(
      <EmployeeCard
        employee={mockEmployee}
        applyStatus={mockApplyStatus}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()

    const image = screen.getByAltText('John Doe')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/john.jpg')

    const statusSelect = screen.getByDisplayValue(EmployeeStatusLabels.Working)
    expect(statusSelect).toHaveValue('Working')
  })

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <EmployeeCard
        employee={mockEmployee}
        applyStatus={mockApplyStatus}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getByLabelText('Edit employee')
    await user.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(mockEmployee)
  })

  it('shows apply button when status is changed', async () => {
    const user = userEvent.setup()

    render(
      <EmployeeCard
        employee={mockEmployee}
        applyStatus={mockApplyStatus}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.queryByRole('button', { name: 'Toggle status' })).not.toBeInTheDocument()

    const statusSelect = screen.getByDisplayValue(EmployeeStatusLabels.Working)
    await user.selectOptions(statusSelect, EmployeeStatusLabels.OnVacation)

    expect(screen.getByRole('button', { name: 'Toggle status' })).toBeInTheDocument()
  })

  it('calls applyStatus when apply button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <EmployeeCard
        employee={mockEmployee}
        applyStatus={mockApplyStatus}
        onEdit={mockOnEdit}
      />
    )

    const statusSelect = screen.getByDisplayValue(EmployeeStatusLabels.Working)
    await user.selectOptions(statusSelect, EmployeeStatusLabels.OnVacation)

    const applyButton = screen.getByRole('button', { name: 'Toggle status' })
    await user.click(applyButton)

    expect(mockApplyStatus).toHaveBeenCalledWith({ id: 1, status: 'OnVacation' })
  })

  it('displays all status options in dropdown', () => {
    render(
      <EmployeeCard
        employee={mockEmployee}
        applyStatus={mockApplyStatus}
        onEdit={mockOnEdit}
      />
    )

    const statusSelect = screen.getByDisplayValue(EmployeeStatusLabels.Working)
    const options = Array.from(statusSelect.querySelectorAll('option'))

    expect(options.length).toBe(4)

    expect(options.map(option => option.textContent)).toEqual([
      EmployeeStatusLabels.Working,
      EmployeeStatusLabels.OnVacation,
      EmployeeStatusLabels.LunchTime,
      EmployeeStatusLabels.BusinessTrip,
    ])
  })

  it('applies yellow background when status is changed', async () => {
    const user = userEvent.setup()

    const { container } = render(
      <EmployeeCard
        employee={mockEmployee}
        applyStatus={mockApplyStatus}
        onEdit={mockOnEdit}
      />
    )

    expect(container.firstChild).not.toHaveClass('bg-yellow-100/60')

    const statusSelect = screen.getByDisplayValue(EmployeeStatusLabels.Working)
    await user.selectOptions(statusSelect, EmployeeStatusLabels.OnVacation)

    expect(container.firstChild).toHaveClass('bg-yellow-100/60')
  })
})
