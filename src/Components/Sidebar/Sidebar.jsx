import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideBarIcons, Icons } from "../../assets/assets";
import CampaignModal from "../CampaignModal";
import { useModal } from "@/redux/UseCampaignModal";

import { useGroups } from "@/redux/GroupProvider/UseGroup";
import { useContacts } from "@/redux/ContactProvider/UseContact";
import { useNotification } from "@/redux/NotificationProvider/UseNotification";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { groups } = useGroups();
  const { contacts } = useContacts();
  const { notifications } = useNotification();

  // Define the sub-navigation items for each main nav item that has them
  const subNavItems = {
    campaigns: [
      { label: "New Campaign", route: "/campaigns/new" },
      { label: "View All Campaigns", route: "/dashboard/campaigns", count: 10 },
    ],
    contacts: [
      {
        label: "All Contacts",
        route: "/dashboard/contacts",
        count: contacts.length,
      },
      { label: "Groups", route: "/dashboard/groups", count: groups.length },
    ],
    templates: [
      { label: "Manage Template", route: "/dashboard/campaigns/email" },
      { label: "Create New Template", route: "/dashboard/campaigns/template" },
    ],
    analytics: [
      { label: "Dashboard Analytics", route: "/dashboard/analytics" },
      { label: "Detailed Report", route: "/dashboard/analytics/report" },
    ],
    wallet: [
      { label: "Wallet Overview", route: "/dashboard/wallet" },
      { label: "Transaction History", route: "/dashboard/wallet/history" },
    ],
    integration: [
      { label: "API Documentation", route: "/dashboard/integration/docs" },
      { label: "API Key Management", route: "/dashboard/integration/keys" },
      { label: "Webhook Setup", route: "/dashboard/integration/webhooks" },
    ],
    notifications: [
      {
        label: "All Notifications",
        route: "/dashboard/notifications",
        count: notifications.length,
      },
      {
        label: "Notification Settings",
        route: "/dashboard/notifications/settings",
      },
    ],
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeRoute") || "/dashboard";
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const { openCampaignModal, openModal, closeCampaignModal } = useModal();
  const handleCreateCampaign = (action) => {
    if (action === "Start Campaign") {
      openCampaignModal(); // ✅ Opens modal when "Start Campaign" is clicked
    }
  };

  const links = [
    {
      label: "Home",
      Icon: SideBarIcons.homeIcon,
      route: "/dashboard/overview",
    },
    {
      label: "Campaigns",
      Icon: SideBarIcons.campaignIcon,
      route: "/dashboard/campaigns",
      hasSubNav: true,
      key: "campaigns",
    },
    {
      label: "Contacts",
      Icon: SideBarIcons.contactIcon,
      route: "/dashboard/contacts",
      hasSubNav: true,
      key: "contacts",
    },
    {
      label: "Templates",
      Icon: SideBarIcons.templateIcon,
      hasSubNav: true,
      key: "templates",
    },
    {
      label: "Analytics",
      Icon: SideBarIcons.analyticsIcon,
      route: "/dashboard/analytics",
      hasSubNav: true,
      key: "analytics",
    },
    {
      label: "Wallet",
      Icon: SideBarIcons.walletIcon,
      route: "/dashboard/wallet",
      hasSubNav: true,
      key: "wallet",
    },
    {
      label: "Integration",
      Icon: SideBarIcons.integrationIcon,
      hasSubNav: true,
      key: "integration",
    },
    {
      label: "Notification",
      Icon: SideBarIcons.notificationIcon,
      route: "/dashboard/notifications",
      hasSubNav: true,
      key: "notifications",
      count: notifications.length,
    },
    {
      label: "Settings",
      Icon: SideBarIcons.settingIcon,
      route: "/dashboard/settings",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (link) => {
    if (link.hasSubNav) {
      const newDropdownState = activeDropdown === link.key ? null : link.key;
      setActiveDropdown(newDropdownState);
      setIsExpanded(!!newDropdownState);
    } else if (link.route) {
      setActiveLink(link.route);
      localStorage.setItem("activeRoute", link.route);
      navigate(link.route);
      setActiveDropdown(null);
      setIsExpanded(false);
    }
  };

  const handleSubNavClick = (route) => {
    setActiveLink(route);
    localStorage.setItem("activeRoute", route);
    navigate(route);
    setActiveDropdown(null);
    setIsExpanded(false);
    toggleSidebar();
  };

  const user = {
    id: 1,
    name: "EmmyCode",
    avatar: null,
    role: "Admin",
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div
      ref={sidebarRef}
      className={`bg-[#383268] h-full hide-scrollbar overflow-y-scroll flex flex-col justify-between transition-all duration-300 ease-in-out group relative
        ${isExpanded ? "w-[263px]" : "w-[82px] hover:w-[263px]"}`}
    >
      <div className="w-full h-full flex flex-col gap-y-3">
        <div className="w-full flex items-center">
          <img
            src={SideBarIcons.TriimoIcon}
            alt="Logo"
            className={`w-[24px] transition-all duration-300 ${
              isExpanded
                ? "w-full"
                : "group-hover:w-full hidden group-hover:block"
            }`}
          />
          <img
            src={SideBarIcons.HeaderIcon}
            alt="Logo"
            className={`w-full mt-3 transition-all duration-300 ${
              isExpanded ? "hidden" : "block group-hover:hidden"
            }`}
          />
        </div>

        <ul className="flex flex-col gap-3 px-3 w-full h-full">
          {links.map((link, index) => (
            <li key={index} className="relative">
              <div
                onClick={() => handleNavClick(link)}
                className={`flex items-center py-2 px-3 cursor-pointer rounded-[10px] justify-between text-[#EBEBF0] font-medium w-[50px] ${
                  isExpanded ? "w-auto" : "group-hover:w-auto"
                }
                  hover:bg-[#e9e9e92f] ${
                    activeLink === link.route || activeDropdown === link.key
                      ? "bg-[#e9e9e92f]"
                      : ""
                  } ${link.label === "Settings" ? "mt-auto" : ""}`}
              >
                <div className="flex gap-3 items-center min-w-[24px]">
                  <img
                    src={link.Icon}
                    alt={link.label}
                    className="w-[24px] h-[24px]"
                  />
                  <span
                    className={`transition-opacity duration-300 whitespace-nowrap font-['General Sans'] ${
                      isExpanded
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {link.count && (
                    <span className="bg-[#F4F4F5] text-[#383268] text-xs px-2 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                  {link.hasSubNav && (
                    <img
                      src={Icons.arrowRight}
                      alt=""
                      className={`w-[20px] h-[20px] transition-all duration-300 transform ${
                        isExpanded
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } ${activeDropdown === link.key ? "rotate-90" : ""}`}
                    />
                  )}
                </div>
              </div>
              {link.hasSubNav && activeDropdown === link.key && (
                <div className="max-md:my-3 md:absolute md:left-[263px] md:top-0 bg-white md:shadow-lg rounded-lg w-full md:w-[280px] py-4 z-50">
                  <h3 className="px-4 mb-2 font-['General Sans'] font-medium text-[16px] leading-[24px]">
                    {link.label}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {subNavItems[link.key].map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => {
                          if (subItem.route === "/campaigns/new") {
                            handleCreateCampaign("Start Campaign");
                            toggleSidebar();
                          } else {
                            handleSubNavClick(subItem.route);
                          }
                        }}
                        className={`mx-3 px-3 py-2 rounded-[6px] flex items-center justify-between font-['General Sans'] text-[14px] transition-colors
                          ${
                            activeLink === subItem.route
                              ? "bg-[#383268] text-white"
                              : "hover:bg-[#383268] hover:text-white"
                          }`}
                      >
                        <span>{subItem.label}</span>
                        {subItem.count && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              activeLink === subItem.route
                                ? "bg-white text-[#383268]"
                                : "bg-[#F4F4F5] text-[#383268]"
                            }`}
                          >
                            {subItem.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center px-4 group-hover:px-7 text-[#EBEBF0] font-medium py-[20px] border-t border-t-[#e9e9e92f] transition-all duration-300 mt-3">
        <div className="flex gap-3 items-center">
          <div className="w-[40px] h-[40px] min-w-[40px] bg-[#9A2444] text-white flex items-center justify-center rounded-full text-lg font-medium">
            {getUserInitial(user.name)}
          </div>
          <div
            className={`transition-opacity duration-300 whitespace-nowrap ${
              isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <h3 className="text-sm">{user.name}</h3>
            <p className="text-[#E7E7E7] text-[13px] font-[300]">{user.role}</p>
          </div>
        </div>
        <img
          src={Icons.arrowRight}
          alt=""
          className={`rotate-90 w-[20px] h-[20px] transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>

      {/* {openModal && (
        <CampaignModal
          onClose={closeCampaignModal}
          onOpen={openCampaignModal}
        />
      )} */}
    </div>
  );
};

export default Sidebar;
