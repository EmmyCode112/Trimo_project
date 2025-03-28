import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from "@/UnauthenticatedPages/Components/Footer/Footer"
import { Link } from 'react-router-dom';
import HowTriimoWorksSection from '@/components/HowTriimoWorksSection';
import SubscriptionSection from '@/components/SubscriptionSection';

const SMSPage = () => {
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the fade-up class
    document.querySelectorAll('.fade-up').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-[1214px] mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-[106px]">
          {/* Text Content */}
          <div className="w-full md:w-[596px] space-y-9 fade-up">
            <h1 className="font-general font-semibold text-4xl md:text-5xl leading-[60px] tracking-[-2%] text-[#1A1A1A]">
              Powerful SMS Solutions for Your Business
            </h1>
            <p className="text-gray-700 text-lg max-w-lg">
              Reach customers instantly with reliable, scalable SMS messaging. Send notifications, alerts, and updates to thousands of recipients with ease.
            </p>
            <div>
              <Link 
                to="/get-started" 
                className="inline-flex h-12 px-6 py-3 bg-[#383268] text-white rounded-lg text-base font-medium items-center justify-center transition-colors hover:bg-[#2e295a]"
              >
                Get Started Free
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full md:w-[512px] h-auto md:h-[618px] fade-up">
            <img 
              src="/sms-image.png" 
              alt="SMS Platform" 
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-[1216px] mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <div className="px-4 py-2 bg-[#EBEBF080] rounded-full inline-block mb-4">
              <p className="text-sm font-medium text-triimo-gray">Use Cases Section</p>
            </div>
            <h2 className="text-3xl text-[#1A1A1A] md:text-4xl font-semibold">SMS Marketing Features</h2>
          </div>
          
          <div className="bg-[#FAFAFA] rounded-[20px] p-8 fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[73px]">
              {/* Feature 1 */}
              <div className="space-y-2 max-w-[330px]">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#484848] text-xl">Secure Delivery</h3>
                </div>
                <p className="text-[#484848] font-medium text-lg">
                  End-to-end encryption and compliance with global messaging standards
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="space-y-2 max-w-[330px]">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#484848] text-xl">Lightning Fast</h3>
                </div>
                <p className="text-[#484848] font-medium text-lg">
                  Instant delivery with real-time tracking and delivery reports
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="space-y-2 max-w-[330px]">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#484848] text-xl">Global Reach</h3>
                </div>
                <p className="text-gray-600">
                  Send messages to any country with competitive local rates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowTriimoWorksSection />
      <SubscriptionSection />

      <Footer />

      <style>
        {`
        .ripple-effect {
          position: relative;
        }
        
        .ripple-effect:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(244, 212, 176, 0.3);
          transform: translate(-50%, -50%) scale(1);
          animation: ripple 2s infinite;
        }
        
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
};

export default SMSPage;