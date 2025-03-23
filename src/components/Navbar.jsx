import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/Icons/trimo-logo.png"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 bg-white left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass border-b border-gray-200/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-layout mx-auto px-6 h-20 flex items-center justify-between">
          <img 
              src={Logo} 
              alt="Triimo Logo" 
              className="h-[26px] scale-150 object-cover w-[70px]"
            />
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-medium text-base link-hover ${
              isActive('/') ? 'text-[#383268]' : 'text-triimo-gray'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className={`font-medium text-base link-hover ${
              isActive('/features') ? 'text-[#383268]' : 'text-triimo-gray'
            }`}
          >
            Features
          </Link>
          <Link 
            to="/use-cases" 
            className={`font-medium text-base link-hover ${
              isActive('/use-cases') ? 'text-[#383268]' : 'text-triimo-gray'
            }`}
          >
            Use Cases
          </Link>
          <Link 
            to="/api-documentation" 
            className={`font-medium text-base link-hover ${
              isActive('/api-documentation') ? 'text-[#383268]' : 'text-triimo-gray'
            }`}
          >
            API Documentation
          </Link>
          <Link 
            to="/about-us" 
            className={`font-medium text-base link-hover ${
              isActive('/about-us') ? 'text-[#383268]' : 'text-triimo-gray'
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium text-base link-hover ${
              isActive('/contact') ? 'text-[#383268]' : 'text-triimo-gray'
            }`}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="h-11 px-[18px] py-[10px] border border-triimo-border rounded-lg text-sm font-medium hidden sm:flex items-center justify-center transition-colors hover:bg-gray-50"
          >
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="h-11 px-[18px] py-[10px] bg-[#383268] text-white rounded-lg text-sm font-medium hidden sm:flex items-center justify-center transition-colors hover:bg-[#2e295a]"
          >
            Sign up
          </Link>
          <button className="block md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;