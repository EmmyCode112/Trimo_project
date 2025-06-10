import { images } from "../assets/assets";
import Button from "@/Components/buttons/transparentButton";
import AOS from "aos";
import "aos/dist/aos.css";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Subscribe = () => {
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

  // const navigate = useNavigate();
  return (
    <div className="flex flex-col mt-[96px] md:px-[65px] lg:px-[140px] gap-8">
      <div className="bg-[#FAFAFA] items-center justify-center flex flex-col gap-[32px] pt-[32px]">
        <img
          src={images.avatarGroup}
          alt="avatar groups"
          className="w-[120px]"
        />
        <p className="text-[#3F3E3E] text-[18px] font-medium">
          Still have questions?
        </p>
      </div>
      <div className="flex justify-between items-start gap-8 flex-wrap">
        <div
          className="flex flex-col gap-2 max-sm:pl-2"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div
          className="flex items-center gap-1 lg:gap-4"
          data-aos="fade-left"
          data-aos-duration="500"
        >
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
