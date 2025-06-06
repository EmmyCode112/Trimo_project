import { images } from "../assets/assets";
import Button from "@/Components/buttons/transparentButton";
import { useEffect, useRef } from "react";
import { fadeIn, slideInLeft, slideInRight, scrollTriggerAnimation } from "@/utils/animations";

const Subscribe = () => {
  const sectionRef = useRef(null);
  const avatarRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animate the section
    scrollTriggerAnimation(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate the avatar group
    if (avatarRef.current) {
      fadeIn(avatarRef.current, 0.5);
    }

    // Animate the content
    if (contentRef.current) {
      slideInLeft(contentRef.current, 0.7);
    }

    // Animate the form
    if (formRef.current) {
      slideInRight(formRef.current, 0.9);
    }
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col mt-[96px] md:px-[65px] lg:px-[140px] gap-8">
      <div className="bg-[#FAFAFA] items-center justify-center flex flex-col gap-[32px] pt-[32px]">
        <img
          ref={avatarRef}
          src={images.avatarGroup}
          alt="avatar groups"
          className="w-[120px]"
        />
        <p className="text-[#3F3E3E] text-[18px] font-medium">
          Still have questions?
        </p>
      </div>
      <div className="flex justify-between items-start gap-8 flex-wrap">
        <div ref={contentRef} className="flex flex-col gap-2 max-sm:pl-2">
          <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div ref={formRef} className="flex items-center gap-1 lg:gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-[8px] placeholder:text-[#A3A3A3] placeholder:text-[16px] text-[14px] w-[272px] outline-[#383268]"
          />
          <Button
            label="Subscribe"
            className="bg-[#383268] text-white rounded-[8px] px-[14px] py-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
