"use client"

import { useState } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import EmptyState from "@/components/campaigns/EmptyState"
import SearchBar from "@/components/campaigns/SearchBar"
import Pagination from "@/components/campaigns/Pagination"
import CampaignList from "@/components/campaigns/CampaignList"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const Campaigns = () => {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    messageType: [],
    status: [],
  })
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleCreateCampaign = () => {
    console.log("Create campaign clicked")
  }

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter((v) => v !== value) : [...prev[type], value],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">View Campaigns</h1>
              <button
                onClick={handleCreateCampaign}
                className="bg-[#383268] text-white px-4 py-2 rounded-lg hover:bg-[#2a2a5a] transition-colors text-sm"
              >
                Create Campaign
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Easily upload, enter, or organize your contact list for smooth campaign delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <div className="w-full sm:max-w-[400px]">
            <SearchBar />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "filter" ? null : "filter")}
                className="inline-flex items-center px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 sm:mr-2" />
                {!isMobile && "Filter"}
              </button>
              {activeDropdown === "filter" && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border">
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Message Type</h3>
                      <div className="space-y-2">
                        {["SMS", "Email", "WhatsApp", "OTP"].map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.messageType.includes(type)}
                              onChange={() => handleFilterChange("messageType", type)}
                              className="rounded border-gray-300 mr-2"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Status</h3>
                      <div className="space-y-2">
                        {["Sent", "Scheduled", "Ongoing", "Draft"].map((status) => (
                          <label key={status} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.status.includes(status)}
                              onChange={() => handleFilterChange("status", status)}
                              className="rounded border-gray-300 mr-2"
                            />
                            <span className="text-sm text-gray-700">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFilters({ messageType: [], status: [] })
                        setActiveDropdown(null)
                      }}
                      className="mt-4 w-full text-center text-sm text-[#383268] hover:text-[#2a2a5a]"
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="inline-flex items-center px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <SlidersHorizontal className="w-4 h-4 sm:mr-2" />
              {!isMobile && "Sort"}
            </button>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">Campaigns</h2>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                {showEmptyState ? "0" : "15"} campaigns
              </span>
            </div>
          </div>

          {showEmptyState ? (
            <EmptyState onCreateCampaign={handleCreateCampaign} />
          ) : (
            <CampaignList filters={filters} onPageChange={setCurrentPage} currentPage={currentPage} />
          )}
        </div>

        {/* Pagination - Only show outside white box on desktop when not empty */}
        {!showEmptyState && (
          <div className="hidden sm:block border-t mt-6">
            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Campaigns

