import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "@/components/settings/EditProfileModal";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import TeamSettings from "@/components/settings/TeamSettings";
import TeamManagement from "@/components/settings/TeamManagement";
import RoleManagement from "@/components/settings/RoleManagement";

const Settings = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Settings" },
    { id: "team", label: "Role & Permissions" },
    { id: "management", label: "Team Management" },
    { id: "security", label: "Security Settings" },
    { id: "kyc", label: "KYC Verification" },
  ];

  const handleTabChange = (tabId) => {
    if (tabId === "kyc") {
      navigate("/dashboard/settings/kyc");
      return;
    }
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings onEditClick={() => setIsModalOpen(true)} />;
      case "security":
        return <SecuritySettings />;
      case "team":
        return <RoleManagement />;
      case "management":
        return <TeamManagement />;
      default:
        return <ProfileSettings onEditClick={() => setIsModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full px-6 py-4">
        <h1 className="text-[20px] text-[#1A1A1A] font-medium">
          Account Settings
        </h1>
        <p className="text-[#767676] font-normal text-[14px] mt-1">
          Manage your API keys securely for accessing Triimo&apos;s services.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Mobile Tabs */}
        <div className="lg:hidden -mx-6 mb-6">
          <div className="flex space-x-4 px-6 hidden-scrollbar overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 border w-auto px-3 h-[42px] rounded-[10px] text-[1rem] flex items-center justify-center text-[#1A1A1A] whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#EBEBF0] border-none"
                    : "border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="lg:grid lg:grid-cols-[240px,1fr] lg:gap-8">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex lg:flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 w-[221px] h-[42px] text-[#1A1A1A] text-[16px] font-medium px-4 flex items-center justify-start text-left rounded-[10px] ${
                  activeTab === tab.id ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              className="py-2 px-4 text-left text-[#CB1E33] mt-2 hover:bg-[#FAFAFA] rounded-lg"
  
            >
              Logout
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-[825px] rounded-[12px] max-h-[650px] border border-[#F1F1F1] bg-[#FAFAFA] p-2 flex items-center justify-center">
            <div className="w-full max-w-[813px] max-h-[630px] border rounded-[10px] border-[#F1F1F1] bg-white p-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Settings;
