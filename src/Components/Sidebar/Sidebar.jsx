import { useState } from "react";
import { SideBarIcons } from "../../assets/assets";
import { Icons } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { label: "Home", Icon: SideBarIcons.homeIcon, route: "/dashboard" },
    {
      label: "Campaigns",
      Icon: SideBarIcons.campaignIcon,
      route: "/campaigns",
    },
    { label: "Contacts", Icon: SideBarIcons.contactIcon },
    { label: "Templates", Icon: SideBarIcons.templateIcon },
    {
      label: "Analytics",
      Icon: SideBarIcons.analyticsIcon,
      route: "/analytics",
    },
    { label: "Wallet", Icon: SideBarIcons.walletIcon },
    { label: "Integration", Icon: SideBarIcons.integrationIcon },
    { label: "Notification", Icon: SideBarIcons.notificationIcon },
    { label: "Settings", Icon: SideBarIcons.settingIcon, route: "/settings" },
  ];

  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();

  return (
    <div className="bg-[#605B86] h-[100vh] flex flex-col justify-between w-[263px]">
      <div>
        <div className="pt-[32px] pb-[24px] pl-[24px]">
          <img src={SideBarIcons.TriimoIcon} alt="Triimo Logo" />
        </div>

        <ul className="flex flex-col gap-1 px-3 relative h-full">
          {links.map((link, index) => (
            <li
              onClick={() => {
                setActiveLink(link.label);
                navigate(`${link.route}`);
              }}
              key={index}
              className={`flex items-center py-2 px-3 cursor-pointer rounded-[10px] justify-between text-[#EBEBF0] font-medium 
                hover:bg-[#e9e9e92f]  ${
                  activeLink === link.label ? "bg-[#e9e9e92f]" : ""
                } ${
                link.label === "Settings"
                  ? "absolute bottom-0 w-[90%]"
                  : ""
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={link.Icon}
                  alt={link.label}
                  className="w-[24px] h-[24px]"
                />
                <p>{link.label}</p>
              </div>
              <img
                src={Icons.arrowRight}
                alt=""
                className="w-[20px] h-[20px]"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center px-4 text-[#EBEBF0] font-medium py-[20px] border-t">
        <div className="flex gap-3 items-center">
          <img
            src={SideBarIcons.CodeRigiIcon}
            alt=""
            className="w-[40px] h-[40px]"
          />
          <div>
            <h3>CodeRigi</h3>
            <p className="text-[#E7E7E7] text-[13px] font-[300]">Admin</p>
          </div>
        </div>
        <img src={Icons.arrowRight} alt="" className="rotate-[90deg]" />
      </div>
    </div>
  );
};

export default Sidebar;
