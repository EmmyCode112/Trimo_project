import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700" disabled>
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      <span className="text-sm text-gray-700">Page 1 of 10</span>
      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
}

export default Pagination

