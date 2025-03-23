import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UseCasesSection = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-content mx-auto px-4">
        <div className="w-full flex items-center justify-center">
          <div 
            ref={el => elementsRef.current[0] = el} 
            className="fade-up px-4 py-2 bg-[#EBEBF080] rounded-full inline-block mb-8 mx-auto"
          >
            <p className="text-sm font-medium text-center text-triimo-gray">Use Cases Section</p>
          </div>
        </div>
        
        <h2 
          ref={el => elementsRef.current[1] = el} 
          className="fade-up text-3xl md:text-4xl font-semibold text-center mb-16"
        >
          Triimo works for your team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marketing Teams */}
          <div 
            ref={el => elementsRef.current[2] = el} 
            className="fade-up bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl text-triimo-gray font-semibold mb-4">Marketing Teams</h3>
            <p className="text-triimo-gray leading-[28px] text-[16px] mb-8">
              They need to send promotional campaigns via SMS, email, and WhatsApp, and analyze delivery rates and engagement metrics.
            </p>
            <Link 
              to="/marketing-teams" 
              className="inline-flex items-center text-[#344054] border border-[#D0D5DD] rounded-lg px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
            >
              See More
            </Link>
          </div>
          
          {/* Developers */}
          <div 
            ref={el => elementsRef.current[3] = el} 
            className="fade-up bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl text-triimo-gray font-semibold mb-4">Developers</h3>
            <p className="text-triimo-gray leading-[28px] text-[16px] mb-8">
              They want API access to integrate messaging services with their own applications and websites.
            </p>
            <Link 
              to="/developers" 
              className="nline-flex items-center text-[#344054] border border-[#D0D5DD] rounded-lg px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
            >
              See More
            </Link>
          </div>
          
          {/* Customer Support Teams */}
          <div 
            ref={el => elementsRef.current[4] = el} 
            className="fade-up bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl text-triimo-gray font-semibold mb-4">Customer Support Teams</h3>
            <p className="text-triimo-gray leading-[28px] text-[16px] mb-8">
              They need to send automated messages and OTPs for customer verification or transactional updates.
            </p>
            <Link 
              to="/customer-support" 
              className="nline-flex items-center text-[#344054] border border-[#D0D5DD] rounded-lg px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;