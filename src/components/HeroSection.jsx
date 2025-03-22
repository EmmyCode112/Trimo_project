import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
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
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative mx-auto bg-gray-100 rounded-[20px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src="https://s3-alpha-sig.figma.com/img/9f1f/76e3/b61698bffc6cd22d281702b92a8b9be9?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UGFSRqx71ZMUAjkPtZ9qJIejsJ3W6Y6bxs5NO3w7-bc4cyyzKGDGv9iGoVvr4BWYGU~QdwNPQXv9hrNW2~6L3q6j5lk0-hwwhG6fzwGNF6vEK2T0cfKYki6Mb6X~KZU9DD5TJx0neyREbQ5v3cOb-1hswHnlzg35Z9mSILEXppS9TlyXz~pck~7~-vEIbo3o4AGEP9yWbkHeppo71a~rbhukBW9Osi9S-yr9w7A5sYONTA4IVc~8k-obNG6aF-KEhortC3ffq9ETGTo~k9Ml~eRcdeqeZk2VD9Avreo9hs4JTFW1LgQLOzte37IzFJrCk0CobMBfFbRHuguaJOMKTA__" 
              alt="Background Pattern" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          
          <div className="relative max-w-content mx-auto px-4 py-16 flex flex-col items-center gap-12 md:gap-16">
            <div 
              ref={el => elementsRef.current[0] = el} 
              className="fade-up px-[10px] py-[7px] bg-[#EBEBF099] backdrop-blur-sm rounded-[37px] inline-flex items-center justify-center"
            >
              <span className="text-sm font-medium text-triimo-gray">No Credit Card Needed for Sign up</span>
            </div>
            
            <div className="text-center space-y-6">
              <h1 
                ref={el => elementsRef.current[1] = el} 
                className="fade-up text-3xl md:text-5xl font-semibold leading-tight tracking-tight"
              >
                Effortless <span className="font-figma-hand font-bold gradient-text">Multi-Channel <br/> Messaging</span> for Your Business
              </h1>
              
              <p 
                ref={el => elementsRef.current[2] = el} 
                className="fade-up text-lg font-medium text-gray-700 max-w-2xl mx-auto"
              >
                Send bulk messages across SMS, WhatsApp, Email, <br className="hidden md:block" />
                and OTPs from one centralized platform.
              </p>
              
              <div 
                ref={el => elementsRef.current[3] = el} 
                className="fade-up flex flex-col sm:flex-row gap-4 justify-center mt-8"
              >
                <Link 
                  to="/request-demo" 
                  className="h-11 px-[18px] py-[10px] border border-triimo-border rounded-lg font-medium flex items-center justify-center transition-colors hover:bg-gray-50"
                >
                  Request a Demo
                </Link>
                <Link 
                  to="/get-started" 
                  className="h-11 px-[18px] py-[10px] bg-[#383268] text-white rounded-lg font-medium flex items-center justify-center transition-colors hover:bg-[#2e295a]"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
            
            <div 
              ref={el => elementsRef.current[4] = el} 
              className="fade-up w-full max-w-[90%] md:max-w-[1000px] mt-8 safari-mockup"
            >
              <div className="safari-toolbar">
                <div className="safari-controls">
                  <div className="safari-controls-dot safari-controls-red"></div>
                  <div className="safari-controls-dot safari-controls-yellow"></div>
                  <div className="safari-controls-dot safari-controls-green"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-500 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    app.triimo.com/overview
                  </div>
                </div>
              </div>
              <img 
                src="/lovable-uploads/598b9ad3-edbd-4483-b09a-c3be1c5a8f04.png" 
                alt="Triimo Dashboard" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;