import { useState } from "react";
import { images } from "../assets/assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const dropdownItem = [
    {
      question: "What messaging channels does Triimo support?",
      ans: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I try Triimo for free?",
      ans: "Personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "How secure is the platform?",
      ans: "Personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ];

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

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[96px] px-[20px] md:px-[65px] lg:px-[105px] gap-[64px]">
      <div className="flex flex-col gap-5 items-center text-center">
        <h2 className="text-[#101828] text-[26px] md:text-[32px] font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-[#767676] text-[18px] font-normal">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="lg:px-8 flex flex-col gap-8 w-full lg:w-[60%] md:w-[80%]">
        {dropdownItem.map((item, index) => (
          <div
            key={index}
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay={index * 100}
            className="border border-[#EAECF0] shadow py-6 px-3 flex flex-col gap-2 w-full"
          >
            {/* Clickable Question */}
            <div
              className="flex items-center justify-between gap-5 cursor-pointer w-full"
              onClick={() => toggleDropdown(index)}
            >
              <p className="text-[#3F3E3E] text-[18px] font-medium">
                {item.question}
              </p>
              <img
                src={openIndex === index ? images.openIcon : images.plusIcon}
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Animated Answer Section */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="max-w-[95%] text-[#767676] text-[15px] font-normal mt-2">
                {item.ans}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
