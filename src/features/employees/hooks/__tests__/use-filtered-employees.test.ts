import { renderHook } from '@testing-library/react'
import * as nuqs from 'nuqs'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockEmployees } from '@/test/utils'

import { useFilteredEmployees } from '../use-filtered-employees'



vi.mock('nuqs', () => ({
  useQueryState: vi.fn(),
}))

describe('useFilteredEmployees', () => {
  const mockSetSearchQuery = vi.fn()
  const mockSetStatusFilter = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(nuqs.useQueryState).mockImplementation((key) => {
      if (key === 'query') {
        return ['', mockSetSearchQuery]
      }

      if (key === 'filter') {
        return ['', mockSetStatusFilter]
      }

      return ['', vi.fn()]
    })
  })

  it('returns all employees when no filters are applied', () => {
    const { result } = renderHook(() => useFilteredEmployees(mockEmployees))

    expect(result.current.filteredEmployees).toEqual(mockEmployees)
    expect(result.current.filteredEmployees.length).toBe(3)
  })

  it('filters employees by status', () => {
    vi.mocked(nuqs.useQueryState).mockImplementation((key) => {
      if (key === 'query') {
        return ['', mockSetSearchQuery]
      }

      if (key === 'filter') {
        return ['Working', mockSetStatusFilter]
      }

      return ['', vi.fn()]
    })

    const { result } = renderHook(() => useFilteredEmployees(mockEmployees))

    expect(result.current.filteredEmployees.length).toBe(1)
    expect(result.current.filteredEmployees[0].name).toBe('John Doe')
  })

  it('filters employees by search query matching name', () => {
    vi.mocked(nuqs.useQueryState).mockImplementation((key) => {
      if (key === 'query') {
        return ['Jane', mockSetSearchQuery]
      }

      if (key === 'filter') {
        return ['', mockSetStatusFilter]
      }

      return ['', vi.fn()]
    })

    const { result } = renderHook(() => useFilteredEmployees(mockEmployees))

    expect(result.current.filteredEmployees.length).toBe(1)
    expect(result.current.filteredEmployees[0].name).toBe('Jane Smith')
  })

  it('filters employees by search query matching status', () => {
    vi.mocked(nuqs.useQueryState).mockImplementation((key) => {
      if (key === 'query') {
        return ['vacation', mockSetSearchQuery]
      }

      if (key === 'filter') {
        return ['', mockSetStatusFilter]
      }

      return ['', vi.fn()]
    })

    const { result } = renderHook(() => useFilteredEmployees(mockEmployees))

    expect(result.current.filteredEmployees.length).toBe(1)
    expect(result.current.filteredEmployees[0].name).toBe('Jane Smith')
  })

  it('combines status filter and search query', () => {
    vi.mocked(nuqs.useQueryState).mockImplementation((key) => {
      if (key === 'query') {
        return ['John', mockSetSearchQuery]
      }

      if (key === 'filter') {
        return ['Working', mockSetStatusFilter]
      }

      return ['', vi.fn()]
    })

    const { result } = renderHook(() => useFilteredEmployees(mockEmployees))

    expect(result.current.filteredEmployees.length).toBe(1)
    expect(result.current.filteredEmployees[0].name).toBe('John Doe')
  })

  it('returns empty array when no employees match filters', () => {
    vi.mocked(nuqs.useQueryState).mockImplementation((key) => {
      if (key === 'query') {
        return ['NonExistent', mockSetSearchQuery]
      }

      if (key === 'filter') {
        return ['', mockSetStatusFilter]
      }

      return ['', vi.fn()]
    })

    const { result } = renderHook(() => useFilteredEmployees(mockEmployees))

    expect(result.current.filteredEmployees.length).toBe(0)
  })
})