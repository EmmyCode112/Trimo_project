import { useLocation } from "react-router-dom";
import { Icons, SideBarIcons } from "../../assets/assets";
import {useState, useEffect} from "react"

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const wallet = [
    {
      balance: 0,
      currency: "$",
    },
  ];


  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1030);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1030);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const location = useLocation();
  const routesMap = {
    "/campaigns": [SideBarIcons.homeIconActive, "Campaigns"],
    "/contacts": [SideBarIcons.homeIconActive, "Contacts"],
    "/templates": [SideBarIcons.homeIconActive, "Templates"],
    "/settings": [SideBarIcons.homeIconActive, "Settings"],
    "/wallet": [SideBarIcons.homeIconActive, "Wallet"],
    "/analytics": [SideBarIcons.homeIconActive, "Analytics"],
    };
  const breadcrumb = routesMap[location.pathname] || [
    SideBarIcons.homeIconActive,
  ];

  return (
    <div className="flex justify-between px-[31px] py-[19px] border-b border-b-[#F1F1F1] items-center">
      <div className="flex items-center gap-2">
        {/* Mobile menu trigger */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-3 text-gray-600"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Home Icon */}
        <img src={SideBarIcons.homeIconActive} alt="Home" onClick={isSmallScreen ? toggleSidebar : null}/>
        <img src={Icons.arrowRight} alt="Arrow Right" />
        {breadcrumb.length > 1 && (
          <>
            <span className="text-[#A3A3A3] text-[14px] font-medium">{breadcrumb[1]}</span>
          </>
        )}
      </div>
      <div className="bg-[#F1F1F1] flex items-center py-[7px] px-2 gap-2 rounded-[6px] cursor-pointer">
        <img src={Icons.emptyWallet} alt="wallet" />

        {wallet.map((item, index) => (
          <p key={index} className="text-[14px] font-medium">
            {item.currency} {item.balance.toFixed(2)}
          </p>
        ))}
        <img src={Icons.addWallet} alt="deposit" />
      </div>
    </div>
  );
};

export default Navbar;