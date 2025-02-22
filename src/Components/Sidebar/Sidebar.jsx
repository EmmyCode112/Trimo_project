import { useState, useEffect } from "react";
import { SideBarIcons } from "../../assets/assets";
import { Icons } from "../../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const links = [
    { label: "Home", Icon: SideBarIcons.homeIcon, route: "/" },
    { label: "Campaigns", Icon: SideBarIcons.campaignIcon, route: "/campaigns" },
    { label: "Contacts", Icon: SideBarIcons.contactIcon, route: "/contacts" },
    { label: "Templates", Icon: SideBarIcons.templateIcon },
    { label: "Analytics", Icon: SideBarIcons.analyticsIcon, route: "/analytics" },
    { label: "Wallet", Icon: SideBarIcons.walletIcon, route: "/wallet" },
    { label: "Integration", Icon: SideBarIcons.integrationIcon },
    { label: "Notification", Icon: SideBarIcons.notificationIcon, route: "/notifications" },
    { label: "Settings", Icon: SideBarIcons.settingIcon, route: "/settings" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeRoute") || "/dashboard";
  });

  useEffect(() => {
    if (links.some(link => link.route === location.pathname)) {
      setActiveLink(location.pathname);
      localStorage.setItem("activeRoute", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div 
      className="bg-[#383268] h-full flex flex-col justify-between w-[82px] hover:w-[263px] transition-all duration-300 ease-in-out overflow-hidden group"
    >
      <div>
        <div className="pt-[32px] pb-[24px] pl-[24px]">
          <img 
            src={SideBarIcons.TriimoIcon}
            alt="Logo" 
            className="w-[24px] group-hover:w-auto transition-all duration-300"
          />
        </div>

        <ul className="flex flex-col gap-3 px-3 relative h-full">
          {links.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                if (link.route) {
                  setActiveLink(link.route);
                  localStorage.setItem("activeRoute", link.route);
                  navigate(link.route);
                }
              }}
              className={`flex items-center py-2 px-3 cursor-pointer rounded-[10px] justify-between text-[#EBEBF0] font-medium 
                hover:bg-[#e9e9e92f] ${activeLink === link.route ? "bg-[#e9e9e92f]" : ""} 
                ${link.label === "Settings" ? "absolute bottom-0 w-[90%]" : ""}`}
            >
              <div className="flex gap-3 items-center min-w-[24px]">
                <img src={link.Icon} alt={link.label} className="w-[24px] h-[24px]" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.label}
                </span>
              </div>
              <img 
                src={Icons.arrowRight}
                alt="" 
                className="w-[20px] h-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center px-4 group-hover:px-7 text-[#EBEBF0] font-medium py-[20px] border-t border-t-[#e9e9e92f] transition-all duration-300">
        <div className="flex gap-3 items-center">
          <img src={SideBarIcons.CodeRigiIcon} alt="" className="w-[40px] h-[40px] min-w-[40px]" />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <h3 className="text-sm">CodeRigi</h3>
            <p className="text-[#E7E7E7] text-[13px] font-[300]">Admin</p>
          </div>
        </div>
        <img 
          src={Icons.arrowRight}
          alt="" 
          className="rotate-90 w-[20px] h-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        />
      </div>
    </div>
  );
};

export default Sidebar;

