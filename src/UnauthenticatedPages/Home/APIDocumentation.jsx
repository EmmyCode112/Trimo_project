import React, { useRef, useState, useEffect } from 'react';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, ChevronRight } from 'lucide-react';

const ApiDocumentation = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const contentRefs = {
    introduction: useRef(null),
    basics: useRef(null),
    sdks: useRef(null),
    apiEndpoint: useRef(null),
    exploreProducts: useRef(null)
  };

  // Handle scroll to specific section
  const scrollToSection = (sectionId) => {
    const sectionRef = contentRefs[sectionId];
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Check each section's position
      for (const section in contentRefs) {
        const sectionRef = contentRefs[section];
        if (sectionRef.current) {
          const { offsetTop, offsetHeight } = sectionRef.current;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1 pt-20 max-w-[1280px] mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:block w-[184px] min-w-[184px] border-r border-gray-200 p-4 pt-8 h-fit sticky top-24">
          <div className="flex flex-col gap-3">
            <button className="w-full text-left px-3 py-2 bg-[#383268] text-white rounded-md font-medium">
              Home
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
              Switch
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
              Conversations
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
              Sotel
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
              Libraries
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium">
              Join Loop
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col-reverse md:flex-row">
            <ScrollArea className="flex-1 h-full">
              <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Introduction Section */}
                <div ref={contentRefs.introduction} className="mb-16">
                  <h1 className="text-3xl font-semibold tracking-tight mb-6 text-[#3F3E3E]">Introduction</h1>
                  <p className="text-base text-[#767676] mb-6">
                    These docs will give you a deep dive into our full API Reference Documentation and how to 
                    seamlessly integrate our messaging channels and verification functionalities into your 
                    product.
                  </p>
                </div>

                {/* Basics Section */}
                <div ref={contentRefs.basics} className="mb-16">
                  <h2 className="text-xl font-semibold mb-4 text-[#3F3E3E]">Basics</h2>
                  <p className="text-base text-[#767676] mb-4">
                    Our API is organised around using HTTP verbs and REST. Our API accepts and returns JSON 
                    formatted payload.
                  </p>
                  <p className="text-base text-[#767676] mb-4">
                    We provide sample code snippets and API calls that can serve as guide during your 
                    integration process.
                  </p>
                  <p className="text-base text-[#767676] mb-4">
                    We also advice running some tests using Postman. Postman is a collaboration platform for 
                    API development which makes testing endpoints easy. We have also provided a Postman 
                    Collection you can easily import to your postman and start testing.
                  </p>
                </div>

                {/* SDKs Section */}
                <div ref={contentRefs.sdks} className="mb-16">
                  <h2 className="text-xl font-semibold mb-4 text-[#3F3E3E]">SDKs</h2>
                  <p className="text-base text-[#767676] mb-4">
                    Ship your products faster & in any language you are proficient in by using SDKs provided 
                    by our community of open source developers. You can submit & view available ones here.
                  </p>
                </div>

                {/* API Endpoint Section */}
                <div ref={contentRefs.apiEndpoint} className="mb-16">
                  <h2 className="text-xl font-semibold mb-4 text-[#3F3E3E]">API Endpoint</h2>
                  <p className="text-base text-[#767676] mb-4">
                    In order to use Termii's APIs, you need to first create an account for free at termii.com.
                  </p>
                  
                  <h3 className="text-lg font-semibold my-4 text-[#3F3E3E]">BASE URL</h3>
                  <p className="text-base text-[#767676] mb-4">
                    Your Termii account has its own base URL, which you should use in all API requests.
                    Your base URL can be found on your dashboard.
                  </p>
                  <p className="text-base text-[#767676] mb-4">
                    The base URL is used to route your request to the appropriate "regulatory region" and to 
                    optimize traffic between data centers in the region.
                  </p>
                </div>

                {/* Explore Products Section */}
                <div ref={contentRefs.exploreProducts} className="mb-16">
                  <h2 className="text-xl font-semibold mb-4 text-[#3F3E3E]">Explore Products</h2>
                  <p className="text-base text-[#767676] mb-6">
                    These docs will give you a deep dive into our full API Reference Documentation and how to 
                    seamlessly integrate our messaging channels and verification functionalities into your 
                    product.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Messaging Card */}
                    <img src="/f1.svg" alt="" className="" />

                    {/* Token Card */}
                    <img src="/f2.svg" alt="" className="" />

                    {/* Insights Card */}
                    <img src="/f3.svg" alt="" className="" />

                    {/* Errors Card */}
                    <img src="/f4.svg" alt="" className="" />

                    {/* Events and Reports Card */}
                    <img src="/f5.svg" alt="" className="" />
                  </div>

                  <p className="text-sm text-gray-500 mb-8">
                    Updated at, Wednesday, November 20, 2024
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Contact Sales
                    </button>
                    <button className="px-6 py-2 text-white bg-[#383268] rounded-lg hover:bg-[#2e295a] transition-colors">
                      Authentication
                    </button>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Right sidebar (Table of Contents) */}
            <div className="hidden lg:block w-[184px] min-w-[184px] p-4 pt-8 border-l border-gray-200 h-fit sticky top-24">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">ON THIS PAGE</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => scrollToSection('introduction')}
                      className={`text-sm ${activeSection === 'introduction' ? 'text-[#383268] font-medium' : 'text-gray-600'} hover:text-[#383268]`}
                    >
                      Introduction
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('basics')}
                      className={`text-sm ${activeSection === 'basics' ? 'text-[#383268] font-medium' : 'text-gray-600'} hover:text-[#383268]`}
                    >
                      Basics
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('sdks')}
                      className={`text-sm ${activeSection === 'sdks' ? 'text-[#383268] font-medium' : 'text-gray-600'} hover:text-[#383268]`}
                    >
                      SDKs
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('apiEndpoint')}
                      className={`text-sm ${activeSection === 'apiEndpoint' ? 'text-[#383268] font-medium' : 'text-gray-600'} hover:text-[#383268]`}
                    >
                      API Endpoint
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('exploreProducts')}
                      className={`text-sm ${activeSection === 'exploreProducts' ? 'text-[#383268] font-medium' : 'text-gray-600'} hover:text-[#383268]`}
                    >
                      Explore Products
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApiDocumentation;