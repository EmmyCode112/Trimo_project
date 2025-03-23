
import React from 'react';

const SubscriptionSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[24px] text-[#3F3E3E] font-semibold mb-2">Get notified when we launch</h2>
          <p className="text-[#767676] text-[20px]">Stay up to date with the latest news, announcements, and articles.</p>
        </div>
        <div className="mt-6 sm:mt-0 sm:flex sm:flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button className="bg-[#383268] text-white px-6 py-2 rounded-md font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
