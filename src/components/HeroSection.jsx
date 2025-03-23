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
        <div className="relative mx-auto bg-[#F5F5F5] rounded-[20px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src="https://s3-alpha-sig.figma.com/img/9f1f/76e3/b61698bffc6cd22d281702b92a8b9be9?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UGFSRqx71ZMUAjkPtZ9qJIejsJ3W6Y6bxs5NO3w7-bc4cyyzKGDGv9iGoVvr4BWYGU~QdwNPQXv9hrNW2~6L3q6j5lk0-hwwhG6fzwGNF6vEK2T0cfKYki6Mb6X~KZU9DD5TJx0neyREbQ5v3cOb-1hswHnlzg35Z9mSILEXppS9TlyXz~pck~7~-vEIbo3o4AGEP9yWbkHeppo71a~rbhukBW9Osi9S-yr9w7A5sYONTA4IVc~8k-obNG6aF-KEhortC3ffq9ETGTo~k9Ml~eRcdeqeZk2VD9Avreo9hs4JTFW1LgQLOzte37IzFJrCk0CobMBfFbRHuguaJOMKTA__" 
              alt="Background Pattern" 
              className="w-full h-full object-cover opacity-15"
            />
          </div>
          
          <div className="max-w-content mx-auto px-4 py-16 flex flex-col items-center gap-6">
            <div 
              ref={el => elementsRef.current[0] = el} 
              className="fade-up px-[10px] mt-9 py-[7px] bg-[#EBEBF099] backdrop-blur-sm rounded-[37px] inline-flex items-center justify-center"
            >
              <span className="text-sm font-medium text-triimo-gray">No Credit Card Needed for Sign up</span>
            </div>
            
            <div className="text-center space-y-6">
            <h2 className="text-[48px] max-sm:text-[28px] font-bold mt-4 text-[#1A1A1A] w-full md:w-[80%] lg:w-[70%] leading-[60px] mx-auto">
          Effortless{" "}
          <span className="bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent">
            multi-channel{" "}
          </span>
          <span className="bg-gradient-to-r from-[#CB1E33] to-[#9A2444] bg-clip-text text-transparent">
            messaging{" "}
          </span>
          for your Business
        </h2>              
              <p 
                ref={el => elementsRef.current[2] = el} 
                className="fade-up text-lg font-medium text-triimo-gray max-w-[435px] mx-auto"
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
                  className="h-11 text-[#344054] text-lg px-[18px] py-[10px] border border-triimo-border rounded-lg font-medium flex items-center justify-center transition-colors hover:bg-gray-50"
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
            
          </div>
            <div 
              ref={el => elementsRef.current[4] = el} 
              className="w-full rounded-xl max-w-[90%] md:max-w-[1160px] translate-y-2 mx-auto mt-8"
            >
              <img src="/hero.svg" alt="Hero" className="bg-white" />  
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;