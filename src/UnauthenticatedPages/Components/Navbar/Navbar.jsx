import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [activeLink, setActiveLink] = useState(location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { link: "Home", routes: "/" },
    { link: "Features", routes: "/features" },
    { link: "Use Cases", routes: "/use_cases" },
    { link: "API Documentation", routes: "api/docs" },
    { link: "About Us", routes: "/about-us" },
    { link: "Contact", routes: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (route) => {
    setActiveLink(route);
    navigate(route);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`fixed bg-white mb-[40px] top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "border-b border-gray-200/30" : "bg-transparent"
      }`}
    >
      <nav className="py-[18px] flex justify-between items-center px-[24px] md:px-[65px]">
        {/* Logo */}
        <div onClick={() => handleNavClick("/")} className="cursor-pointer">
          <img src={Icons.triimoWebsiteLogo} alt="logo" className="w-[70px]" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-[24px] relative">
          {links.map((link, index) =>
            link.link === "Features" ? (
              <li
                key={index}
                className="relative cursor-pointer"
                ref={dropdownRef}
              >
                <span
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`${
                    activeLink === link.routes
                      ? "bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent"
                      : "text-[#484848]"
                  }`}
                >
                  {link.link}
              </span>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-md w-[180px] z-50">
                    <div
                      onClick={() => handleNavClick("/features/sms")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-normal text-gray-500"
                    >
                      SMS Messaging
                    </div>
                    <div
                      onClick={() => handleNavClick("/features/email")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-normal text-gray-500"
                    >
                      Email Massaging
                    </div>
                    <div
                      onClick={() => handleNavClick("/features/whatsapp")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-normal text-gray-500"
                    >
                      WhatsApp
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li
                key={index}
                onClick={() => handleNavClick(link.routes)}
                className={`cursor-pointer ${
                  activeLink === link.routes
                    ? "bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent"
                    : "text-[#484848]"
                }`}
              >
                {link.link}
              </li>
            )
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            label="Log in"
            className="py-[10px] px-[18px] rounded-[8px] text-[#383268] border-[#383268] hover:bg-[#383268] hover:text-white"
            onClick={() => navigate("/sign-in")}
          />
          <Button
            label="Sign up"
            className="bg-[#383268] text-white py-[10px] px-[18px] rounded-[8px] border-none"
            onClick={() => navigate("/signup")}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white px-6 pb-4 pt-2 space-y-2 border-t shadow-sm transition-all duration-300 animate-slide-down">
          {links.map((link, index) =>
            link.link === "Features" ? (
              <div key={index} ref={dropdownRef}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <span
                    className={`${
                      activeLink === link.routes
                        ? "bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent"
                        : "text-[#484848]"
                    }`}
                  >
                    {link.link}
                  </span>
                  <span>
                    {isDropdownOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    <div
                      onClick={() => handleNavClick("/features/sms")}
                      className="text-[#484848] hover:underline cursor-pointer"
                    >
                      SMS Messaging
                    </div>
                    <div
                      onClick={() => handleNavClick("/features/email")}
                      className="text-[#484848] hover:underline cursor-pointer"
                    >
                      Email Messaging
                    </div>
                    <div
                      onClick={() => handleNavClick("/features/whatsapp")}
                      className="text-[#484848] hover:underline cursor-pointer"
                    >
                      WhatsApp
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={index}
                onClick={() => handleNavClick(link.routes)}
                className="text-[#484848] cursor-pointer"
              >
                {link.link}
              </div>
            )
          )}

          <div className="pt-4 flex flex-col gap-2">
            <Button
              label="Log in"
              className="w-full text-[#383268] border-[#383268] hover:bg-[#383268] hover:text-white"
              onClick={() => handleNavClick("/sign-in")}
            />
            <Button
              label="Sign up"
              className="w-full bg-[#383268] text-white"
              onClick={() => handleNavClick("/signup")}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
