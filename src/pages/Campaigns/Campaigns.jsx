"use client"

import { useState } from "react"
// import { Filter, SlidersHorizontal } from "lucide-react"
import EmptyState from "@/components/campaigns/EmptyState"
import SearchBar from "@/components/campaigns/SearchBar"
import Pagination from "@/components/campaigns/Pagination"
import CampaignList from "@/components/campaigns/CampaignList"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Icons } from "../../assets/assets"
import { useNavigate } from "react-router-dom"


const Campaigns = () => {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [showEmptyState, setShowEmptyState] = useState(false)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    messageType: [],
    status: [],
  })
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleCreateCampaign = () => {
    console.log("Create campaign clicked")
    navigate("/campaigns/list")
  }

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }))
  }

  return (
    <div className="min-h-screen">
      {/*ah zxhhahd */}
      <div className="bg-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-0">
            <div className="flex items-center justify-between">
              <h1 className="text-[20px] font-medium text-[#1a1a1a]">View Campaigns</h1>
              <button
                onClick={handleCreateCampaign}
                className="bg-[#383268] w-[168px] h-[44px] text-white px-4 py-2 rounded-[8px] hover:bg-[#2a2a5a] transition-colors text-sm"
              >
                See Campaigns
              </button>
            </div>
            <p className="text-[14px] font-[100] text-[#767676]">
              Easily upload, enter, or organize your contact list for smooth campaign delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <div className="w-full sm:max-w-[371px]">
            <SearchBar />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "filter" ? null : "filter")}
                className="px-[18px] py-[10px] h-[44px] flex items-center gap-[10px] rounded-[8px] border border-[#C1BFD0] cursor-pointer text-[#3F3E3E] hover:bg-[#e7e7e7]"
              >
                <img src={Icons.filterIcon} alt="filter" />
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
            <button className="px-[18px] py-[10px] h-[44px] flex items-center gap-[10px] rounded-[8px] border border-[#C1BFD0] cursor-pointer text-[#3F3E3E] hover:bg-[#e7e7e7]">
              <img src={Icons.sortIcon} alt="filter" />
              {!isMobile && "Sort"}
            </button>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="max-w-[100%] rounded-[12px] max-h-[650px] border border-[#F1F1F1] bg-[#FAFAFA] p-1 flex items-center justify-center">
          <div className="w-full max-w-[100%] max-h-[630px] border rounded-[10px] border-[#F1F1F1] bg-white">
            <div className="bg-white rounded-lg">
              <div className="px-6 border-b  py-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-medium text-[#101828]">Campaigns</h2>
                  <span className="bg-[#F5E9EC] text-[#9A2444] text-[12px] font-medium flex items-center justify-center w-[87px] h-[22px] rounded-[16px]">
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
              <div className="hidden sm:block mt-6">
                <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
            
    </div>
  )
}

export default Campaigns