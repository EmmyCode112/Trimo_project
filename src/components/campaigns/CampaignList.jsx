import { useState } from "react"
import { MoreHorizontal, ChevronDown } from "lucide-react"
import SearchBar from "./SearchBar"
import Pagination from "./Pagination"

const campaigns = [
  {
    id: 1,
    name: "Spring Sale Blast",
    description: "Promote spring discounts on fashion items.",
    type: "SMS",
    status: "Sent",
    deliveryRate: "98%",
    openRate: "N/A",
    clickRate: "N/A",
  },
  {
    id: 2,
    name: "New Feature Update",
    description: "Notify users about our latest app features.",
    type: "Email",
    status: "Scheduled",
    deliveryRate: "N/A",
    openRate: "N/A",
    clickRate: "N/A",
  },
  {
    id: 3,
    name: "OTP Authentication",
    description: "Verify user accounts securely with OTPs.",
    type: "OTP",
    status: "Ongoing",
    deliveryRate: "95%",
    openRate: "N/A",
    clickRate: "N/A",
  },
  {
    id: 4,
    name: "Black Friday Deals",
    description: "Announce exclusive Black Friday sales.",
    type: "WhatsApp",
    status: "Draft",
    deliveryRate: "N/A",
    openRate: "N/A",
    clickRate: "N/A",
  },
  {
    id: 5,
    name: "Survey Invitation",
    description: "Invite users to complete a feedback survey.",
    type: "Email",
    status: "Sent",
    deliveryRate: "90%",
    openRate: "N/A",
    clickRate: "N/A",
  },
  {
    id: 6,
    name: "Abandoned Cart Reminder",
    description: "Remind customers about items left in their cart.",
    type: "Email",
    status: "Sent",
    deliveryRate: "85%",
    openRate: "65%",
    clickRate: "N/A",
  },
]

const MessageTypeBadge = ({ type }) => {
  const colors = {
    SMS: "bg-blue-100 text-blue-700",
    Email: "bg-yellow-100 text-yellow-700",
    OTP: "bg-pink-100 text-pink-700",
    WhatsApp: "bg-green-100 text-green-700",
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type]}`}>{type}</span>
}

const StatusBadge = ({ status }) => {
  const colors = {
    Sent: "bg-green-100 text-green-700",
    Scheduled: "bg-orange-100 text-orange-700",
    Ongoing: "bg-purple-100 text-purple-700",
    Draft: "bg-gray-100 text-gray-700",
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>
}

const CampaignList = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState(new Set())
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCampaigns(new Set(campaigns.map((c) => c.id)))
    } else {
      setSelectedCampaigns(new Set())
    }
  }

  const handleSelectCampaign = (id) => {
    const newSelected = new Set(selectedCampaigns)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedCampaigns(newSelected)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
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
              <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors">
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
          <SearchBar className="flex-1" />
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">Filter</button>
            <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">Sort</button>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">Campaigns</h2>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">15 campaigns</span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={handleSelectAll}
                      checked={selectedCampaigns.size === campaigns.length}
                    />
                  </th>
                  <th
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      Campaign Name
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message Type
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Rate
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Click Rate
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedCampaigns.has(campaign.id)}
                        onChange={() => handleSelectCampaign(campaign.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <MessageTypeBadge type={campaign.type} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{campaign.deliveryRate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{campaign.openRate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{campaign.clickRate}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="lg:hidden divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300"
                    checked={selectedCampaigns.has(campaign.id)}
                    onChange={() => handleSelectCampaign(campaign.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <MessageTypeBadge type={campaign.type} />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{campaign.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <StatusBadge status={campaign.status} />
                      <span className="text-sm text-gray-500">Delivery: {campaign.deliveryRate}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination disabled={false} />
        </div>
      </div>
    </div>
  )
}

export default CampaignList

