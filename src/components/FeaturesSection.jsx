import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  {
    id: 1,
    title: "SMS Messaging",
    description: "Track delivery rates, open rates, and engagement metrics with ease.",
    bgColor: "#FBF1E6",
    transform: "translate(69px, 46px) scale(0.95)",
    width: "328px",
    borderRadius: "9.41px",
    borderWidth: "2px",
    borderColor: "#383268",
    padding: "8.94px 9.41px",
    zIndex: 5
  },
  {
    id: 2,
    title: "Email Messaging",
    description: "High delivery success rates and strong encryption for your data.",
    bgColor: "#FEF7CD",
    transform: "translate(63px, 48px) scale(1.05)",
    width: "425px",
    borderRadius: "10.33px",
    borderWidth: "2px",
    borderColor: "#383268",
    padding: "8.94px 9.41px",
    zIndex: 4
  },
  {
    id: 3,
    title: "WhatsApp Messaging",
    description: "Seamlessly integrate Triimo's capabilities into your applications.",
    bgColor: "#D3E4FD",
    transform: "translate(68.63px, 45.98px) scale(0.95)",
    width: "329px",
    borderRadius: "8px",
    borderWidth: "2px",
    borderColor: "#383268",
    padding: "9.41px",
    zIndex: 3
  },
  {
    id: 4,
    title: "OTP Messaging",
    description: "Track delivery rates, open rates, and engagement metrics with ease.",
    bgColor: "#E5DEFF",
    transform: "translate(66px, 46.28px) scale(0.98)",
    width: "356px",
    borderRadius: "8.65px",
    borderWidth: "2.51px",
    borderColor: "#383268",
    padding: "10.21px",
    zIndex: 2
  },
  {
    id: 5,
    title: "Secure & Reliable",
    description: "High delivery success rates and strong encryption for your data.",
    bgColor: "#FFDEE2",
    transform: "translate(72px, 46px) scale(0.9)",
    width: "248px",
    borderRadius: "7.11px",
    borderWidth: "0.36px",
    borderColor: "#383268",
    padding: "6.75px 7.11px",
    zIndex: 1
  },
  {
    id: 6,
    title: "Real-Time Analytics",
    description: "High delivery success rates and strong encryption for your data.",
    bgColor: "#FDE1D3",
    transform: "translate(137px, 40px) rotate(0deg) scale(1.1)",
    width: "558px",
    borderRadius: "10.49px",
    borderWidth: "0.52px",
    borderColor: "#383268",
    padding: "10.64px",
    zIndex: 0
  }
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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

    // Observe the section first
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Then observe each card with a delay
    cardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-[1440px] mx-auto fade-up" id="features">
      <div className="text-center mb-12">
        <div className="inline-block rounded-[37px] bg-[#EBEBF099] py-[7px] px-[10px] w-[131px] h-[34px] mb-4">
          <span className="text-[#484848] font-general font-medium text-[14px] leading-[20px]">Features</span>
        </div>
        <h2 className="text-[40px] font-general font-semibold leading-tight mb-8">
          The complete toolbox for customer engagement
        </h2>
      </div>

      <div className="max-w-[1217px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {featureCards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="fade-up"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <Card 
              className="w-full h-[375px] rounded-[15px] border border-[#F1F1F1] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div 
                className="w-full h-[231px] relative overflow-hidden"
                style={{ backgroundColor: card.bgColor }}
              >
                <div 
                  className="card-mockup absolute" 
                  style={{ 
                    transform: card.transform,
                    width: card.width,
                    borderRadius: card.borderRadius,
                    borderWidth: card.borderWidth,
                    padding: card.padding,
                    borderColor: card.borderColor,
                    backgroundColor: "white",
                    boxShadow: "0px 4px 17.6px 0px rgba(0,0,0,0.06)",
                    height: "auto",
                    minHeight: "120px"
                  }}
                >
                  {/* This is where card mockup UI would go */}
                  <div className="safari-toolbar">
                    <div className="safari-controls">
                      <div className="safari-controls-dot safari-controls-red"></div>
                      <div className="safari-controls-dot safari-controls-yellow"></div>
                      <div className="safari-controls-dot safari-controls-green"></div>
                    </div>
                  </div>
                  <div className="p-2">
                    {/* Placeholder content */}
                    <div className="w-1/2 h-4 bg-gray-100 rounded mb-2"></div>
                    <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-general font-semibold text-[24px] leading-[36px] mb-2">
                  {card.title}
                </h3>
                <p className="font-general font-medium text-[18px] leading-[28px] text-gray-600">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;