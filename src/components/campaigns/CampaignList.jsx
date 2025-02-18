"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  ChevronDown,
  Edit,
  Copy,
  Trash,
  X,
  SlidersHorizontal,
  ArrowDown,
} from "lucide-react";
import { MessageTypeBadge, StatusBadge } from "./badges";
import CampaignDetails from "./CampaignDetails";
import Pagination from "./Pagination";
import { Icons } from "@/assets/assets";

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
];

const CampaignList = ({ filters, currentPage, onPageChange }) => {
  const [selectedCampaigns, setSelectedCampaigns] = useState(new Set());
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCampaigns(new Set(campaigns.map((c) => c.id)));
    } else {
      setSelectedCampaigns(new Set());
    }
  };

  const handleSelectCampaign = (id) => {
    const newSelected = new Set(selectedCampaigns);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCampaigns(newSelected);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAction = (campaign, action) => {
    switch (action) {
      case "edit":
        console.log("Edit campaign:", campaign.id);
        break;
      case "delete":
        console.log("Delete campaign:", campaign.id);
        break;
      case "cancel":
        console.log("Cancel campaign:", campaign.id);
        break;
      case "duplicate":
        console.log("Duplicate campaign:", campaign.id);
        break;
      default:
        break;
    }
    setActiveDropdown(null);
  };

  const actionIcons = {
    edit: <Edit size={16} className="mr-2 text-gray-500" />,
    duplicate: <Copy size={16} className="mr-2 text-gray-500" />,
    delete: <Trash size={16} className="mr-2 text-red-500" />,
    cancel: <X size={16} className="mr-2 text-red-500" />,
  };

  const getAvailableActions = (status) => {
    switch (status) {
      case "Sent":
      case "Ongoing":
        return ["duplicate"];
      case "Scheduled":
        return ["edit", "cancel", "duplicate"];
      case "Draft":
        return ["edit", "delete", "duplicate"];
      default:
        return [];
    }
  };

  const handleFilterChange = (type, value) => {
    //This function is not used in the updated code, but it's kept here for completeness in case it's needed later.
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const messageTypeMatch =
      filters.messageType.length === 0 ||
      filters.messageType.includes(campaign.type);
    const statusMatch =
      filters.status.length === 0 || filters.status.includes(campaign.status);
    return messageTypeMatch && statusMatch;
  });

  return (
    <>
      <div className="">
        {/* Main Content */}
        <div className="">
          {/* Campaigns Table */}
          <div className=" border">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full cursor-pointer">
                <thead>
                  <tr className="border-b bg-[#FAFAFA] border-[#EAECF0]">
                    <th className="pl-6 pr-2 py-3 text-left">
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] appearance-none border border-[#D0D5DD] rounded-[6px] checked:bg-[#383268] checked:border-[#383268]"
                        onChange={handleSelectAll}
                        checked={selectedCampaigns.size === campaigns.length}
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-left text-[12px] font-medium text-[#919090]"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Campaign Name
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-[12px] font-medium text-[#919090]">
                      Message Type
                    </th>
                    <th className="px-4 py-3 text-left text-[12px] font-medium text-[#919090]">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-[12px] font-medium text-[#919090]">
                      Delivery Rate
                    </th>
                    <th className="px-4 py-3 text-left text-[12px] font-medium text-[#919090]">
                      Open Rate
                    </th>
                    <th className="px-4 py-3 text-left text-[12px] font-medium text-[#919090]">
                      Click Rate
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <td
                        className="pl-6 pr-2 py-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="w-[20px] h-[20px] appearance-none border border-[#D0D5DD] rounded-[6px] checked:bg-[#383268] checked:border-[#383268]"
                          checked={selectedCampaigns.has(campaign.id)}
                          onChange={() => handleSelectCampaign(campaign.id)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-[400] text-[14px] text-[#101828]">
                            {campaign.name}
                          </div>
                          <div className="text-sm font-normal text-[#919191]">
                            {campaign.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <MessageTypeBadge type={campaign.type} />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={campaign.status} />
                      </td>
                      <td className="px-4 py-4 text-sm text-[#666666]">
                        {campaign.deliveryRate}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#666666]">
                        {campaign.openRate}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#666666]">
                        {campaign.clickRate}
                      </td>
                      <td
                        className="px-4 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === campaign.id
                                  ? null
                                  : campaign.id
                              )
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <img
                              src={Icons.More}
                              alt="..."
                              className="w-[20px] h-[20px]"
                            />
                          </button>
                          
                                {activeDropdown === campaign.id && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                                    <div className="py-1">
                                      {getAvailableActions(campaign.status).map(
                                        (action) => (
                                          <button
                                            key={action}
                                            onClick={() =>
                                              handleAction(campaign, action)
                                            }
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-[#666666] hover:bg-gray-100 capitalize"
                                          >
                                            {actionIcons[action]} {/* Icon */}
                                            {action}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-4 cursor-pointer"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300"
                      checked={selectedCampaigns.has(campaign.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectCampaign(campaign.id);
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">
                          {campaign.name}
                        </div>
                        <MessageTypeBadge type={campaign.type} />
                      </div>
                      <p className="mt-1 text-sm text-[#666666]">
                        {campaign.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <StatusBadge status={campaign.status} />
                        <span className="text-sm text-[#666666]">
                          Delivery: {campaign.deliveryRate}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(
                          activeDropdown === campaign.id ? null : campaign.id
                        );
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <img
                        src={Icons.More}
                        alt="..."
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Details Modal */}
        {selectedCampaign && (
          <CampaignDetails
            campaign={selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
          />
        )}
      </div>
    </>
  );
};

export default CampaignList;
