import * as react from 'react'

import * as reactQuery from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'


import { mockEmployees } from '@/test/utils'

import * as api from '../../api'
import { useEmployees } from '../use-employees'
import * as filteredHooks from '../use-filtered-employees'



vi.mock('../../api', () => ({
  fetchEmployees: vi.fn(),
  updateEmployeeStatus: vi.fn(),
}))

vi.mock('../use-filtered-employees', () => ({
  useFilteredEmployees: vi.fn(),
}))

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')

  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(),
  }
})

vi.mock('react', async () => {
  const actual = await vi.importActual('react')

  return {
    ...actual,
    startTransition: vi.fn((callback) => callback()),
  }
})

describe('useEmployees', () => {
  const mockQueryClient: Partial<reactQuery.QueryClient> = {
    invalidateQueries: vi.fn(),
    cancelQueries: vi.fn(),
  }

  const mockSetSearchQuery = vi.fn()
  const mockSetStatusFilter = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(reactQuery.useQuery).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    } as reactQuery.UseQueryResult)

    vi.mocked(reactQuery.useMutation).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
      isSuccess: false,
    } as unknown as reactQuery.UseMutationResult)

    vi.mocked(reactQuery.useQueryClient).mockReturnValue(mockQueryClient as reactQuery.QueryClient)

    vi.mocked(filteredHooks.useFilteredEmployees).mockReturnValue({
      filteredEmployees: mockEmployees,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })

    vi.mocked(api.fetchEmployees).mockResolvedValue(mockEmployees)
    vi.mocked(api.updateEmployeeStatus).mockResolvedValue(mockEmployees)
  })

  it('returns employees data from useQuery', () => {
    const { result } = renderHook(() => useEmployees())

    expect(result.current.employees).toEqual(mockEmployees)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('returns loading state from useQuery', () => {
    vi.mocked(reactQuery.useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as reactQuery.UseQueryResult)

    vi.mocked(filteredHooks.useFilteredEmployees).mockReturnValue({
      filteredEmployees: [],
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })

    const { result } = renderHook(() => useEmployees())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.employees).toEqual([])
  })

  it('returns error state from useQuery', () => {
    const testError = new Error('Test error')

    vi.mocked(reactQuery.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: testError,
    } as reactQuery.UseQueryResult)

    vi.mocked(filteredHooks.useFilteredEmployees).mockReturnValue({
      filteredEmployees: [],
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      statusFilter: '',
      setStatusFilter: mockSetStatusFilter,
    })

    const { result } = renderHook(() => useEmployees())

    expect(result.current.error).toBe(testError)
    expect(result.current.employees).toEqual([])
  })

  it('calls mutation.mutate when applyStatus is called', () => {
    const mockMutate = vi.fn()

    vi.mocked(reactQuery.useMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      isSuccess: false,
    } as unknown as reactQuery.UseMutationResult)

    const { result } = renderHook(() => useEmployees())

    result.current.applyStatus(1, 'Working')

    expect(mockMutate).toHaveBeenCalledWith({ id: 1, status: 'Working' })
  })

  it('wraps setSearchQuery in startTransition', () => {
    const { result } = renderHook(() => useEmployees())

    result.current.setSearchQuery('test')

    expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
    expect(react.startTransition).toHaveBeenCalled()
  })

  it('wraps setStatusFilter in startTransition', () => {
    const { result } = renderHook(() => useEmployees())

    result.current.setStatusFilter('Working')

    expect(mockSetStatusFilter).toHaveBeenCalledWith('Working')
    expect(react.startTransition).toHaveBeenCalled()
  })
})
