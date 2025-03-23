import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Track the active link based on the current URL
  const [activeLink, setActiveLink] = useState(location.pathname);

  const links = [
    { link: "Home", routes: "/" },
    { link: "Features", routes: "/features" },
    { link: "Use Cases", routes: "/use_cases" },
    { link: "API Documentation", routes: "/docs/api" },
    { link: "About Us", routes: "/about-us" },
    { link: "Contact", routes: "/contact-us" },
  ];

  return (
    <nav className="py-[18px] flex justify-between items-center px-[65px]">
      {/* Logo */}
      <div>
        <img
          src={Icons.triimoWebsiteLogo}
          alt="logo"
          className="w-[70px] cursor-pointer"
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center md:gap-[16px] lg:gap-[32px]">
        {links.map((link, index) => (
          <li
            key={index}
            onClick={() => {
              setActiveLink(link.routes);
              navigate(link.routes);
            }}
            className={`cursor-pointer ${
              activeLink === link.routes
                ? "bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent"
                : "text-[#484848]"
            }`}
          >
            {link.link}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Button
          label="Log in"
          className="py-[10px] px-[18px] rounded-[8px] text-[#383268] border-[#383268] hover:bg-[#383268] hover:text-white"
          onClick={() => navigate(`/sign-in`)}
        />
        <Button
          label="Sign up"
          className="bg-[#383268] text-white py-[10px] px-[18px] rounded-[8px]"
          onClick={() => navigate(`/signup`)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
