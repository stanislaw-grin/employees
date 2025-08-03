import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import * as employeesHooks from '@/features/employees/hooks/use-employees'
import { renderWithProviders, mockEmployees } from '@/test/utils'

import { Employees } from '../employees'

vi.mock('@/features/employees/hooks/use-employees', () => ({
  useEmployees: vi.fn(),
}))

describe('Employees Component', () => {
  const mockSetSearchQuery = vi.fn()
  const mockSetStatusFilter = vi.fn()
  const mockApplyStatus = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(employeesHooks.useEmployees).mockReturnValue({
      employees: mockEmployees,
      isLoading: false,
      error: null,
      applyStatus: mockApplyStatus,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })
  })

  it('renders employee cards when data is loaded', () => {
    renderWithProviders(<Employees />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  it('shows loading state when data is loading', () => {
    vi.mocked(employeesHooks.useEmployees).mockReturnValue({
      employees: [],
      isLoading: true,
      error: null,
      applyStatus: mockApplyStatus,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })

    renderWithProviders(<Employees />)

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()

    const region = screen.getByRole('region', { name: 'Employee list' })
    expect(region.children.length).toBe(6)
  })

  it('shows error state when there is an error', () => {
    vi.mocked(employeesHooks.useEmployees).mockReturnValue({
      employees: [],
      isLoading: false,
      error: new Error('Test error'),
      applyStatus: mockApplyStatus,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })

    renderWithProviders(<Employees />)
    
    expect(screen.getByText('Error loading employees')).toBeInTheDocument()
  })

  it('shows "No employees found" when there are no employees', () => {
    vi.mocked(employeesHooks.useEmployees).mockReturnValue({
      employees: [],
      isLoading: false,
      error: null,
      applyStatus: mockApplyStatus,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })

    renderWithProviders(<Employees />)
    
    expect(screen.getByText('No employees found')).toBeInTheDocument()
  })

  it('opens user modal when "Create" is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Employees />)

    const createButton = screen.getByRole('button', { name: /create/i })
    await user.click(createButton)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})