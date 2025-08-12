import { Search } from 'lucide-react'

interface Props {
  setSearchQuery: (query: string) => void
  searchQuery: string
}

export const SearchInput = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <div className="relative flex-1">
      <label htmlFor="employee-search" className="sr-only">
        Search employees
      </label>

      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search size={16} aria-hidden="true"/>
      </div>

      <input
        id="employee-search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Type to search"
        className="w-full pl-10 pr-4 py-4 border-none focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 font-light"
      />
    </div>
  )
}