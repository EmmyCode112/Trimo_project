import { Search } from "lucide-react"

const SearchBar = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="search by name, email"
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}

export default SearchBar

