import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search by name, email"
        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#383268] focus:border-transparent"
      />
      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}

export default SearchBar

