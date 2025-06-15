import { images } from "../assets/assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import featuredChart from "../assets/images/featured-chart.png";
import featuredContent from "../assets/images/featured-content.png";
import featuredLogo from "../assets/images/featured-logo.png";
const FeatureSection = () => {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
      easing: "ease-in-out", // Easing function for the animation
      offset: 100, // Offset (in pixels) from the original trigger point
      disable: "mobile", // Disable animations on mobile devices
    });
    // Cleanup AOS on component unmount

    return () => {
      AOS.refresh(); // Refresh AOS to ensure it works correctly on re-render
    };
  }, []);

  const cardItems = [
    {
      image: images.sms,
      title: "SMS Messaging",
      content:
        "Track delivery rate, open rate and engagement metrics with ease",
    },

    {
      image: images.email,
      title: "Email Messaging",
      content: "High delivery success rate and strong encryption for your data",
    },
    {
      image: images.whatsApp,
      title: "WhatsApp Messaging",
      content:
        "Seamlessly integrate Triimo's capability into your applications",
    },
    {
      image: images.otp,
      title: "OTP Messaging",
      content:
        "Track delivery rate, open rate and engagement metrics with ease",
    },
    {
      image: images.secure,
      title: "Secure & Reliable",
      content: "High delivery success rate and strong encryption for your data",
    },
    {
      image: images.analytics,
      title: "Real-Time Analytics",
      content: "High delivery success rate and strong encryption for your data",
    },
  ];
  return (
    <div className="mt-[60px] flex flex-col gap-y-[42px] px-[65px]">
      <div className="flex flex-col gap-[14px]">
        <p className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[143px] mx-auto flex justify-center">
          Features Section
        </p>
        <h2 className="text-[#1A1A1A] text-[32px] font-bold max-sm:text-[22px] text-center">
          Why Triimo?
        </h2>
      </div>
      <div className="border-[#F1F1F1] border rounded-[20px] p-2 bg-[#F1F1F1] flex max-sm:flex-col gap-6">
        <div className="w-full lg:w-[65%]">
          <div className="bg-white border w-full border-[#F1F1F1] rounded-[15px] pt-7 px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-[1.5rem] text-[#3F3E3E] font-semibold">
                Real-Time Analytics
              </h2>
              <p className="text-[#969696] w-full md:max-w-[400px] ">
                Track delivery rates, open rates, and engagement metrics with
                ease.
              </p>
            </div>
            <div className="relative mt-8">
              <img
                src={featuredContent}
                alt="chart"
                className="max-md:hidden absolute top-[-50%] right-0"
              />
              <img src={featuredChart} alt="chart" className="w-full" />
            </div>
          </div>
          <div className="flex mt-6 gap-7 max-lg:flex-col w-full justify-between">
            <div className="border border-[#F1F1F1] bg-white rounded-[15px] p-7">
              <h2 className="text-[1.5rem] text-[#3F3E3E] font-semibold">
                API Integration
              </h2>
              <p className="mt-2 w-full md:max-w-[300px] text-[#969696] font-medium">
                Seamlessly integrate Triimo’s capabilities into your
                applications.
              </p>
              <div className="flex justify-between gap-[40px] mt-10 h-[130px] md:px-8">
                <div className="flex flex-col h-full justify-between">
                  <img
                    src={featuredLogo}
                    alt=""
                    className="w-[52px] h-[52px]"
                  />
                  <img
                    src={featuredLogo}
                    alt=""
                    className="w-[52px] h-[52px]"
                  />
                </div>
                <div className="flex items-center h-full">
                  <img
                    src={featuredLogo}
                    alt=""
                    className="w-[52px] h-[52px]"
                  />
                </div>

                <div className="flex flex-col h-full justify-between">
                  <img
                    src={featuredLogo}
                    alt=""
                    className="w-[52px] h-[52px]"
                  />
                  <img
                    src={featuredLogo}
                    alt=""
                    className="w-[52px] h-[52px]"
                  />
                </div>
              </div>
            </div>
            <div className="border border-[#F1F1F1] bg-white rounded-[15px] p-7">
              <h2 className="text-[1.5rem] text-[#3F3E3E] font-semibold">
                Secure & Reliable
              </h2>
              <p className="mt-2 w-full md:max-w-[300px] text-[#969696] font-medium">
                High delivery success rates and strong encryption for your data.
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#F1F1F1] bg-white rounded-[15px] pl-7 pr-7 pt-7 md:pr-[55px]">
          <div>
            <h2 className="text-[1.5rem] text-[#3F3E3E] font-semibold">
              Unified Messaging
            </h2>
            <p className="mt-2 w-full md:max-w-[300px] text-[#969696] font-medium">
              Send and manage SMS, Email, WhatsApp, and OTPs from one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

// <div className=" flex gap-5 ">
//       <div className=" flex gap-5 lg:flex-wrap justify-between">
//         {cardItems.map((items, index) => (
//           <div
//             key={index}
//             data-aos="fade-up"
//             data-aos-delay={index * 100} // Stagger animations
//             data-aos-duration="500"
//             className="lg:basis-[30%] w-full md:w-1/2 border border-[#F1F1F1] rounded-[15px] pb-[21px]"
//           >
//             <img
//               src={items.image}
//               alt={items.title}
//               className="rounded-t-[15px] h-[202px]"
//             />
//             <div className="flex flex-col gap-y-2 pt-[23px] px-[20px] md:pl-4 lg:pl-7 lg:pr-[60px] md:pr-[30px]">
//               <h2 className="text-[22px] font-semibold text-[#3F3E3E]">
//                 {items.title}
//               </h2>
//               <p className="text-[#969696] text-[16px] font-normal">
//                 {items.content}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className=" flex gap-5"></div>
//     </div>
