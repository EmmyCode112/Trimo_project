import React from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";


const TopCampaignsTable = () => {
  const data = [
    { name: "Holiday Promo", type: "SMS", delivery: "90%", engagement: "35%" },
    { name: "Block Friday", type: "WhatsApp", delivery: "95%", engagement: "40%" },
    { name: "Winter Sale", type: "Email", delivery: "85%", engagement: "30%" },
    { name: "Holiday Promo", type: "OTP", delivery: "90%", engagement: "38%" },
  ];

  // Function to determine color based on type
  const getTypeColor = (type) => {
    switch (type) {
      case "SMS":
        return "bg-[#D7EDFF] text-[#0070CC]";
      case "WhatsApp":
        return "bg-[#D7FFE1] text-[#009E28]";
      case "Email":
        return "bg-yellow-200 text-yellow-700";
      case "OTP":
        return "bg-pink-200 text-pink-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div  className="w-full rounded-[15px] py-[20px] px-[20px] flex flex-col gap-[22px]  border-[5px] border-[#F1F1F1]">
      <h2 className="text-[#3F3E3E] text-[18px] font-medium mb-[5px]">Top Campaigns</h2>
      
      {
        data.length === 4 ? <> <div className="flex flex-col items-center gap-[24px] py-[20px]">
        <img
          src={Icons.emptyState}
          alt="No data"
          className="w-14 h-14 mb-4"
        />
        <div className="text-center">
          <p  className="text-[#3F3E3E] text-[18px] font-medium mb-[5px]">
            No Available Campaign
          </p>
          <p className="text-[#767676] text-sm">
            {"No Campaign found. Start your first Campaign"}
          </p>
        </div>
        <Button
          label="Create New Campaign"
          className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c]"
        />
      </div></> : 
        <div  className="overflow-x-scroll w-full scrollbar-hide">
      <table className="rounded-[8px] text-left whitespace-nowrap border-collapse w-full">
        <thead>
          <tr className="bg-[#F9FAFB] py-3 border-b border-top-radius border-b-[#EAECF0]">
            <th  className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">Campaign Name</th>
            <th  className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">Campaign Type</th>
            <th  className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">Delivery Rate</th>
            <th  className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">Engagement Rate</th>
            <th  className="px-[12px] py-3 text-[13px] font-medium text-[#767676]"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((campaign, index) => (
            <tr key={index} className="py-4 border-t border-t-[#EAECF0]">
              <td className="py-3 text-[13px] font-medium text-[#1A1A1A]">{campaign.name}</td>
              <td className="py-3">
                <span className={`text-xs font-medium py-1 px-2 rounded-[16px] w-[110px] whitespace-nowrap overflow-hidden text-ellipsis  text-[13px] text-[#1A1A1A] ${getTypeColor(campaign.type)}`}>
                  {campaign.type}
                </span>
              </td>
              <td className="py-3 text-[13px] font-medium text-[#1A1A1A]">{campaign.delivery}</td>
              <td className="py-3 text-[13px] font-medium text-[#1A1A1A]">{campaign.engagement}</td>
              <td className="py-3 text-[13px] font-medium text-[#1A1A1A]">
                <Button
                  label="View Details"
                  className="text-[#344054] text-[14px] font-medium rounded-[8px] hover:bg-[#eeeff0]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      </div>
      }
    </div>
  );
};

export default TopCampaignsTable;
