import React, { useRef, useEffect } from 'react';
import { Button } from './ui/button';

import { Skeleton } from './ui/skeleton';

const HowTriimoWorksSection = () => {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const statItemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer for the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observer for each step
    stepRefs.current.forEach((step) => {
      if (step) {
        observer.observe(step);
      }
    });

    // Observer for stats section
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    // Observer for each stat item
    statItemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-[1440px] mx-auto fade-up" id="how-it-works">
      <div className="text-center mb-12">
        <div className="inline-block rounded-[37px] bg-[#EBEBF099] py-[7px] px-[10px] mb-4">
          <span className="text-[#484848]  font-medium text-[14px] leading-[20px]">Step-by-Step</span>
        </div>
        <h2 className="text-[40px]  font-semibold leading-tight mb-8">
          How Triimo Works
        </h2>
        <p className="text-[18px] font-medium text-[#767676] max-w-[602px] mx-auto">
          Effortless communication in three simple steps—here's how TRIIMO makes messaging seamless.
        </p>
      </div>

      {/* Step 1: Sign up */}
      <div 
        ref={(el) => (stepRefs.current[0] = el)} 
        className="max-w-[1215px] mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-[58px] mb-24 fade-up"
        style={{ transitionDelay: '0.1s' }}
      >
        <div className="w-full md:w-[415px] h-auto md:h-[340px] relative">
          <div className="w-full h-full rounded-[10px] border border-[#F1F1F1] bg-[#FAFAFA] overflow-hidden relative">
            <div 
              className="absolute border-[#383268] rounded-[10px] overflow-hidden"
              style={{ 
                width: '433px',
                maxWidth: 'calc(100% + 50px)',
                left: '-97px',
                top: '42px' 
              }}
            >
              <img 
                src="/login.svg" 
                alt="Sign up interface" 
                className="w-full  h-auto"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-[30px] text-[#3F3E3E] font-semibold leading-tight mb-6">
            Sign up and choose your messaging needs
          </h3>
          <ul className="space-y-4 list-none">
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Create your TRIIMO account in minutes—no technical expertise needed.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Choose your preferred messaging channels: SMS, WhatsApp, Email, or OTPs.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Access a clean, intuitive dashboard tailored to your communication goals.
              </p>
            </li>
          </ul>
          <div className="mt-8">
            <Button className="bg-white text-[#344054] text-[16px] font-medium border h-[44px] rounded-[8px] border-triimo-border hover:bg-gray-50">
              Sign Up for Free
            </Button>
          </div>
        </div>
      </div>

      {/* Step 2: Upload contacts */}
      <div 
        ref={(el) => (stepRefs.current[1] = el)} 
        className="max-w-[1215px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-[58px] mb-24 fade-up"
        style={{ transitionDelay: '0.2s' }}
      >
        <div className="flex-1">
          <h3 className="text-[30px]  font-semibold leading-tight mb-6">
            Upload your contacts or connect via API
          </h3>
          <ul className="space-y-4 list-none">
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Upload your contact list in bulk using simple file formats like CSV, or manually add individual recipients.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Prefer automation? Connect TRIIMO to your system using our powerful API to sync contacts in real-time.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Group your contacts for targeted campaigns and save time with reusable contact lists.
              </p>
            </li>
          </ul>
          <div className="mt-8">
            <Button className="bg-white text-[#344054] text-[16px] font-medium border h-[44px] rounded-[8px] border-triimo-border hover:bg-gray-50">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-[415px] h-auto md:h-[340px] relative">
          <div className="w-full h-full rounded-[10px] border border-[#F1F1F1] bg-[#FAFAFA] overflow-hidden relative">
            <div 
              className="absolute border-[#383268] rounded-[10px] overflow-hidden"
              style={{ 
                width: '433px',
                maxWidth: 'calc(100% + 50px)',
                right: '-97px',
                top: '42px' 
              }}
            >
              <img 
                src="/modal.svg" 
                alt="Upload contacts interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Send messages */}
      <div 
        ref={(el) => (stepRefs.current[2] = el)} 
        className="max-w-[1215px] mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-[58px] mb-24 fade-up"
        style={{ transitionDelay: '0.3s' }}
      >
        <div className="w-full md:w-[415px] h-auto md:h-[340px] relative">
          <div className="w-full h-full rounded-[10px] border border-[#F1F1F1] bg-[#FAFAFA] overflow-hidden relative">
            <div 
              className="absolute border-[#383268] rounded-[10px] overflow-hidden"
              style={{ 
                width: '433px',
                maxWidth: 'calc(100% + 50px)',
                left: '-97px',
                top: '42px' 
              }}
            >
              <img 
                src="/message3.svg" 
                alt="Upload contacts interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-[30px]  font-semibold leading-tight mb-6">
            Send messages and monitor performance in real time
          </h3>
          <ul className="space-y-4 list-none">
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Create personalized messages using our easy-to-use template builder.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Send campaigns instantly or schedule them for the perfect moment.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Track your message delivery, open rates, and engagement metrics live on the dashboard.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#767676] mt-3"></span>
              <p className="text-[18px]  font-medium text-[#767676]">
                Use actionable insights to optimize future campaigns.
              </p>
            </li>
          </ul>
          <div className="mt-8">
            <Button className="bg-white text-[#344054] text-[16px] font-medium border h-[44px] rounded-[8px] border-triimo-border hover:bg-gray-50">
              Start Your First Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div 
        ref={statsRef} 
        className="max-w-[1215px] mx-auto mt-32 fade-up"
        style={{ transitionDelay: '0.4s' }}
      >
        <div className="text-center mb-8">
          <h2 className="text-[28px] font-semibold leading-tight mb-4">
            Build something great
          </h2>
          <p className="text-[18px] font-[400] text-[#767676] max-w-[750px] mx-auto">
            Everything you need to build modern UI and great products.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center text-center divide-y md:divide-y-0 md:divide-x divide-[#EAECF0]">
          <div 
            ref={(el) => (statItemRefs.current[0] = el)}
            className="w-full md:w-1/3 p-8 fade-up"
            style={{ transitionDelay: '0.5s' }}
          >
            <div className=" font-semibold text-[40px] text-[#DB7500] mb-2">1M+</div>
            <div className=" text-[18px] text-[#3F3E3E]">Messages Delivered Daily</div>
          </div>
          
          <div 
            ref={(el) => (statItemRefs.current[1] = el)}
            className="w-full md:w-1/3 p-8 fade-up"
            style={{ transitionDelay: '0.6s' }}
          >
            <div className=" font-semibold text-[40px] text-[#DB7500] mb-2">5000+</div>
            <div className=" text-[18px] text-[#3F3E3E]">Business Customers</div>
          </div>
          
          <div 
            ref={(el) => (statItemRefs.current[2] = el)}
            className="w-full md:w-1/3 p-8 fade-up"
            style={{ transitionDelay: '0.7s' }}
          >
            <div className=" font-semibold text-[40px] text-[#DB7500] mb-2">99.9%</div>
            <div className=" text-[18px] text-[#3F3E3E]">Delivery Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTriimoWorksSection;