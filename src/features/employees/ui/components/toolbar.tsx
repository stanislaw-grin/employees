import { memo } from 'react'

import { Plus } from 'lucide-react'

import { type Status } from '@/entities/employee'
import { SearchInput } from '@/features/employees/ui/components/search-input.tsx'
import { StatusFilter } from '@/features/employees/ui/components/status-filter.tsx'

interface Props {
  openCreateUserModal: () => void
  setSearchQuery: (query: string) => void
  searchQuery: string
  setStatusFilter: (status: Status | '') => void
  statusFilter: Status | ''
}

export const Toolbar = memo(({
  openCreateUserModal,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter
}: Props) => {
  return (
    <section
      role="search"
      aria-label="Employee search and filter"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5 md:mb-15"
    >
      <button
        onClick={openCreateUserModal}
        className="flex items-center gap-2 bg-brand hover:bg-sky-600 text-white font-medium px-8 py-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
      >
        Create <span className="sm:hidden">a new employee</span>
        <Plus size={24}/>
      </button>

      <div className="bg-white flex flex-1 items-center shadow-sm rounded">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

        <div className="w-px bg-gray-300 h-6 mx-2" role="presentation"/>

        <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>
      </div>
    </section>
  )
})

