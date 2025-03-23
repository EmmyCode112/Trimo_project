import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from 'lucide-react';

const ApiHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1 pt-20">
        {/* Left Sidebar - We'll create a separate component for this later */}
        <div className="hidden md:block w-[184px] min-w-[184px] border-r border-gray-200 p-4 pt-8">
          <div className="flex flex-col gap-3">
            <button className="w-full text-left px-3 py-2 bg-purple-100 text-purple-900 rounded-md font-medium">
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
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto px-6 py-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-6 text-[#3F3E3E]">API Documentation</h1>
              <p className="text-base text-[#767676] mb-6">
                Welcome to our API documentation. Here you'll find comprehensive guides and documentation to help you start working with our API as quickly as possible, as well as support if you get stuck.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-3 text-[#3F3E3E]">Getting Started</h2>
                  <p className="text-[#767676] mb-4">
                    Learn the fundamentals of our API and start building your integration.
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a href="/api-documentation" className="text-purple-700 hover:underline flex items-center">
                        API Overview <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="/api-documentation" className="text-purple-700 hover:underline flex items-center">
                        Authentication <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="/api-documentation" className="text-purple-700 hover:underline flex items-center">
                        Making Your First Request <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-3 text-[#3F3E3E]">Guides</h2>
                  <p className="text-[#767676] mb-4">
                    Detailed guides for common use cases and integration scenarios.
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a href="/api-documentation" className="text-purple-700 hover:underline flex items-center">
                        Sending Messages <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="/api-documentation" className="text-purple-700 hover:underline flex items-center">
                        Handling Webhooks <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="/api-documentation" className="text-purple-700 hover:underline flex items-center">
                        Error Handling <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 text-[#3F3E3E]">API References</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <a href="/api-documentation" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-[#3F3E3E]">Messaging API</h3>
                  <p className="text-[#767676] text-sm">
                    Send SMS, WhatsApp, and other messaging channels.
                  </p>
                </a>
                
                <a href="/api-documentation" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-[#3F3E3E]">Verification API</h3>
                  <p className="text-[#767676] text-sm">
                    Implement OTP and other verification methods.
                  </p>
                </a>
                
                <a href="/api-documentation" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-[#3F3E3E]">Analytics API</h3>
                  <p className="text-[#767676] text-sm">
                    Access delivery metrics and engagement data.
                  </p>
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-12">
                <h2 className="text-xl font-semibold mb-3 text-[#3F3E3E]">Developer Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3F3E3E]">SDKs & Libraries</h3>
                    <p className="text-[#767676] mb-3">
                      Client libraries to accelerate your integration in your preferred language.
                    </p>
                    <ul className="space-y-1">
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">JavaScript SDK</a>
                      </li>
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">Python SDK</a>
                      </li>
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">PHP SDK</a>
                      </li>
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">View all SDKs</a>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#3F3E3E]">Resources</h3>
                    <p className="text-[#767676] mb-3">
                      Additional tools to help you build faster.
                    </p>
                    <ul className="space-y-1">
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">API Testing Tool</a>
                      </li>
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">Postman Collection</a>
                      </li>
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">Status Page</a>
                      </li>
                      <li>
                        <a href="/api-documentation" className="text-purple-700 hover:underline">Changelog</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-8">
                Last updated: Wednesday, November 20, 2024
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApiHome;