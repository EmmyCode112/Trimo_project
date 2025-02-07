import { Gift } from "lucide-react"

const EmptyState = ({ onCreateCampaign }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-[72px] h-[72px] bg-[#383268]/10 rounded-full flex items-center justify-center mb-4">
        <Gift className="w-9 h-9 text-[#383268]" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">No Available Campaign</h3>
      <p className="text-sm text-gray-500 mt-1 mb-6">No campaigns found. Start your first campaign</p>
      <button
        onClick={onCreateCampaign}
        className="bg-[#383268] text-white px-4 py-2 rounded-lg hover:bg-[#2a2a5a] transition-colors text-sm"
      >
        Create New Campaign
      </button>
    </div>
  )
}

export default EmptyState

