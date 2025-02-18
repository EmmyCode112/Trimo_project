import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search by name, email"
        className="w-full max-w-[371px] h-[44px] pl-10 pr-4 py-2 border rounded-lg text-sm placeholder-[#A3A3A3] focus:outline-none focus:border-none focus:ring-1 focus:ring-[#383268] focus:border-transparent"
      />
      <Search className="w-[20px] h-[20px] text-[#A3A3A3] absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}

export default SearchBar

