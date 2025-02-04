import { Gift } from "lucide-react"

const EmptyState = ({ onCreateCampaign }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
        <Gift className="w-8 h-8 text-purple-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Available Campaign</h3>
      <p className="text-gray-500 text-center mb-6">No campaigns found. Start your first campaign</p>
      <button
        onClick={onCreateCampaign}
        className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
      >
        Create New Campaign
      </button>
    </div>
  )
}

export default EmptyState

