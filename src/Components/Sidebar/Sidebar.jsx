import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideBarIcons, Icons } from "../../assets/assets";
import { useModal } from "@/redux/UseCampaignModal";
import { createPortal } from "react-dom";
import { useGroups } from "@/redux/GroupProvider/UseGroup";
import { useContacts } from "@/redux/ContactProvider/UseContact";
import { useNotification } from "@/redux/NotificationProvider/UseNotification";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { groups } = useGroups();
  const { contacts } = useContacts();
  const { notifications } = useNotification();
  const userDetailsString = localStorage.getItem("userDetails");
  const user = userDetailsString ? JSON.parse(userDetailsString) : null;
  const subnavTriggerRef = useRef(null);
  const [subnavPosition, setSubnavPosition] = useState({ top: 0, left: 263 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  console.log("user", user);
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
      const sidebar = sidebarRef.current;
      const subnav = document.querySelector(".subnav-portal");

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        !(subnav && subnav.contains(event.target))
      ) {
        setActiveDropdown(null);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (link, e) => {
    if (link.hasSubNav) {
      const newDropdownState = activeDropdown === link.key ? null : link.key;
      setActiveDropdown(newDropdownState);
      setIsExpanded(!!newDropdownState);

      const rect = e.currentTarget.getBoundingClientRect();
      setSubnavPosition({
        top: rect.top,
        left: rect.right,
      });
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

    if (isMobile) {
      // If on mobile, close the sidebar after navigating
      toggleSidebar();
    }
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getUserDisplayName = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname} ${user.lastname}`;
    } else if (user?.email) {
      return user.email;
    }
    return "User";
  };

  const getUserRole = () => {
    if (user?.company_name) {
      return user.company_name;
    } else if (user?.email) {
      return user.email;
    }
    return "User";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`bg-[#383268] h-full hide-scrollbar overflow-y-scroll  flex flex-col justify-between transition-all duration-300 ease-in-out group relative
        ${isExpanded ? "w-[263px]" : "w-[82px] hover:w-[263px]"}`}
    >
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

      <ul className="flex flex-col gap-3 px-3 w-full h-full z-10 mt-2">
        {links.map((link, index) => (
          <li key={index} className="relative z-10">
            <div
              onClick={(e) => handleNavClick(link, e)}
              ref={subnavTriggerRef}
              className={`flex items-center py-2 px-3 cursor-pointer z-10 rounded-[10px] justify-between text-[#EBEBF0] font-medium w-[50px] ${
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
            {link.hasSubNav &&
              activeDropdown === link.key &&
              (isMobile ? (
                // Mobile: Render inside the sidebar just below the nav item
                <div className="my-3 block bg-white rounded-lg w-full py-4">
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
              ) : (
                // Desktop: Use portal with fixed position
                createPortal(
                  <div
                    className="fixed z-50 bg-white w-[280px] shadow-lg rounded-lg py-4 subnav-portal"
                    style={{
                      top: `${subnavPosition.top}px`,
                      left: `${subnavPosition.left}px`,
                    }}
                  >
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
                              setActiveDropdown(null);
                              // Collapse sidebar only on mobile
                              if (isMobile) {
                                toggleSidebar();
                              }
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
                  </div>,
                  document.body
                )
              ))}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center px-4 group-hover:px-7 text-[#EBEBF0] font-medium py-[20px] border-t border-t-[#e9e9e92f] transition-all duration-300 mt-3">
        <div className="flex gap-3 items-center">
          <div className="w-[40px] h-[40px] min-w-[40px] bg-[#9A2444] text-white flex items-center justify-center rounded-full text-lg font-medium">
            {getUserInitial(getUserDisplayName())}
          </div>
          <div
            className={`transition-opacity duration-300 whitespace-nowrap ${
              isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <h3 className="text-sm">{getUserDisplayName()}</h3>
            <p className="text-[#E7E7E7] text-[13px] font-[300]">{getUserRole()}</p>
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

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;

