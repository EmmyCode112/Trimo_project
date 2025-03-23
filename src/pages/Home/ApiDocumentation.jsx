import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      
      <div className="flex flex-1 pt-20">
        {/* Left Sidebar */}
        <div className="hidden md:block w-[184px] min-w-[184px] border-r border-gray-200 p-4 pt-8">
          <div className="flex flex-col gap-3">
            <Tabs defaultValue="home" className="w-full">
              <TabsList className="flex flex-col items-start gap-3 bg-transparent p-0">
                <TabsTrigger 
                  value="home" 
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 font-medium"
                >
                  Home
                </TabsTrigger>
                <TabsTrigger 
                  value="switch" 
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 font-medium"
                >
                  Switch
                </TabsTrigger>
                <TabsTrigger 
                  value="conversations" 
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 font-medium"
                >
                  Conversations
                </TabsTrigger>
                <TabsTrigger 
                  value="sotel" 
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 font-medium"
                >
                  Sotel
                </TabsTrigger>
                <TabsTrigger 
                  value="libraries" 
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 font-medium"
                >
                  Libraries
                </TabsTrigger>
                <TabsTrigger 
                  value="join-loop" 
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 font-medium"
                >
                  Join Loop
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-blue-100 p-6 flex items-center justify-center h-32">
                        <div className="w-full h-16 bg-white rounded-md shadow-sm"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Messaging</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Send a quick, direct message with SMS. Perfect for concise updates and alerts.
                        </p>
                        <div className="flex justify-end">
                          <ChevronRight className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    {/* Token Card */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-yellow-50 p-6 flex items-center justify-center h-32">
                        <div className="w-full h-16 bg-white rounded-md shadow-sm"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Token</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Send a quick, direct message with SMS. Perfect for concise updates and alerts.
                        </p>
                        <div className="flex justify-end">
                          <ChevronRight className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    {/* Insights Card */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-blue-100 p-6 flex items-center justify-center h-32">
                        <div className="w-full h-16 bg-white rounded-md shadow-sm"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Insights</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Send a quick, direct message with SMS. Perfect for concise updates and alerts.
                        </p>
                        <div className="flex justify-end">
                          <ChevronRight className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    {/* Errors Card */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-yellow-50 p-6 flex items-center justify-center h-32">
                        <div className="w-full h-16 bg-white rounded-md shadow-sm"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Errors</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Send a quick, direct message with SMS. Perfect for concise updates and alerts.
                        </p>
                        <div className="flex justify-end">
                          <ChevronRight className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    {/* Events and Reports Card */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-blue-100 p-6 flex items-center justify-center h-32">
                        <div className="w-full h-16 bg-white rounded-md shadow-sm"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">Events and Reports</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Send a quick, direct message with SMS. Perfect for concise updates and alerts.
                        </p>
                        <div className="flex justify-end">
                          <ChevronRight className="text-gray-500" />
                        </div>
                      </div>
                    </div>
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
            <div className="hidden lg:block w-[184px] min-w-[184px] p-4 pt-8 border-l border-gray-200">
              <div className="sticky top-24">
                <h3 className="text-sm font-medium text-gray-500 mb-3">ON THIS PAGE</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => scrollToSection('introduction')}
                      className={`text-sm ${activeSection === 'introduction' ? 'text-purple-700 font-medium' : 'text-gray-600'} hover:text-purple-700`}
                    >
                      Introduction
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('basics')}
                      className={`text-sm ${activeSection === 'basics' ? 'text-purple-700 font-medium' : 'text-gray-600'} hover:text-purple-700`}
                    >
                      Basics
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('sdks')}
                      className={`text-sm ${activeSection === 'sdks' ? 'text-purple-700 font-medium' : 'text-gray-600'} hover:text-purple-700`}
                    >
                      SDKs
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('apiEndpoint')}
                      className={`text-sm ${activeSection === 'apiEndpoint' ? 'text-purple-700 font-medium' : 'text-gray-600'} hover:text-purple-700`}
                    >
                      API Endpoint
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('exploreProducts')}
                      className={`text-sm ${activeSection === 'exploreProducts' ? 'text-purple-700 font-medium' : 'text-gray-600'} hover:text-purple-700`}
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