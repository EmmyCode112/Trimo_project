import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ disabled = true }) => {
  const pages = [1, 2, 3, "...", 8, 9, 10]

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={disabled}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={disabled}
          className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              disabled={disabled}
              className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 border hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Previous</span>
            </button>
            {pages.map((page, idx) => (
              <button
                key={idx}
                disabled={disabled}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                  page === 1 ? "bg-purple-50 text-purple-600 border-purple-500" : "text-gray-500 hover:bg-gray-50"
                } disabled:opacity-50`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={disabled}
              className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 border hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="mr-2">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination

