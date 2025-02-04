import { Filter, SlidersHorizontal } from "lucide-react"
import EmptyState from "@/components/campaigns/EmptyState"
import SearchBar from "@/components/campaigns/SearchBar"
import Pagination from "@/components/campaigns/Pagination"
import CampaignList from "@/components/campaigns/CampaignList"

const Campaigns = () => {
  const handleCreateCampaign = () => {
    // Handle campaign creation
    console.log("Create campaign clicked")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">View Campaigns</h1>
              <p className="mt-1 text-sm text-gray-500">
                Easily upload, enter, or organize your contact list for smooth campaign delivery.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">$0.00</span>
              <button
                onClick={handleCreateCampaign}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar className="max-w-xl" />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Sort
            </button>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">Campaigns</h2>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">0 campaigns</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Manage your team members and their account permissions here.</p>
          </div>

          {/* Empty State */}
          <EmptyState onCreateCampaign={handleCreateCampaign} />
          {/* Campaign List */}
          {/* <CampaignList /> */}

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Campaigns

