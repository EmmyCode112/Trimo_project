import { useState, useEffect, useRef } from "react";
import { images } from "../assets/assets";
import { fadeIn, staggerChildren, scrollTriggerAnimation } from "@/utils/animations";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default
  const sectionRef = useRef(null);
  const faqsRef = useRef(null);

  const dropdownItem = [
    {
      question: "What messaging channels does Triimo support?",
      ans: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
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
    // Animate the section title
    scrollTriggerAnimation(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate the FAQs with stagger effect
    if (faqsRef.current) {
      const faqs = faqsRef.current.children;
      staggerChildren(faqsRef.current, faqs, 0.5);
    }
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={sectionRef} className="flex flex-col justify-center items-center mt-[96px] px-[20px] md:px-[65px] lg:px-[105px] gap-[64px]">
      <div className="flex flex-col gap-5 items-center text-center">
        <h2 className="text-[#101828] text-[26px] md:text-[32px] font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-[#767676] text-[18px] font-normal">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div ref={faqsRef} className="lg:px-8 flex flex-col gap-8 w-full lg:w-[60%] md:w-[80%]">
        {dropdownItem.map((item, index) => (
          <div
            key={index}
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
