// import { Gift } from "lucide-react"
import { Icons } from "@/assets/assets"


const EmptyState = ({ onCreateCampaign }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center mb-4">
        <img src={Icons.EmptyStateIcon} alt="" className="w-full h-full" />
      </div>
      <h3 className="text-[16px] font-medium text-[#3F3E3E]">No Available Campaign</h3>
      <p className="text-[14px] text-[#767676] mt-1 mb-6">No campaigns found. Start your first campaign</p>
      <button
        onClick={onCreateCampaign}
        className="bg-[#383268] w-[204px] h-[44px] text-white px-4 py-2 rounded-[8px] hover:bg-[#2a2a5a] transition-colors text-sm"
      >
        Create New Campaign
      </button>
    </div>
  )
}

export default EmptyState

