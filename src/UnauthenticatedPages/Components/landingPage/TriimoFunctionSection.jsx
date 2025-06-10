import Button from "@/Components/buttons/transparentButton";
import { images } from "../assets/assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const TriimoFunctionSection = () => {
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

  return (
    <div className="w-full lg:px-[105px] py-[96px] bg-[#410F1D] flex flex-col gap-[42px] mt-[60px]">
      <div className="flex justify-between w-full items-start max-md:flex-wrap-reverse md:gap-x-[50px] lg:gap-[106px] gap-y-[40px]">
        <div
          className="flex flex-col gap-[23px] basis-[40%]"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <h1 className="leading-[48px] text-[32px] text-white font-semibold">
            Send your first text message in a matter of minutes
          </h1>
          <p className="text-[#F1F1F1] leading-[25px] text-[15px] font-medium">
            Sign up for a free Twilio account and grab one of our seven official
            server-side SDKs to get started. Send your first text message, phone
            call, or email in minutes and when you’re ready to launch your app,
            upgrade to a pay-as-you-go plan.
          </p>
          <div className="flex items-center gap-3">
            <Button
              label="View docs"
              className="py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] font-normal bg-white text-[#3F3E3E]"
            />
            <Button
              label="Sign up"
              className="py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] text-white font-normal border-white hover:bg-white hover:text-[#3F3E3E] transition-all duration-500"
            />
          </div>
        </div>
        <div
          className="basis-[50%]"
          data-aos="fade-left"
          data-aos-duration="500"
        >
          <img src={images.functionReview} alt="" className="w-full" />
        </div>
      </div>
      <div className="flex justify-between w-full bg-[#310C16] py-[25px] px-[27px] rounded-[15px] flex-wrap">
        <div
          className="flex flex-col gap-[14px] lg:basis-[30%]"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <h2 className="text-white text-[24px] font-semibold">
            Officail SDKs
          </h2>
          <p className="text-[#F1F1F1] text-[15px] font-medium">
            Build quickly and confidently with our SDKs for Node.js, Python, C#,
            Java, PHP, Ruby, and Go.
          </p>
        </div>
        <div
          className="flex flex-col gap-[14px] lg:basis-[30%]"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <h2 className="text-white text-[24px] font-semibold">
            Triimo Functions
          </h2>
          <p className="text-[#F1F1F1] text-[15px] font-medium">
            Bring idea to life without having to host your own code by deploying
            with Triimo functions.
          </p>
        </div>

        <div
          className="flex flex-col gap-[14px] lg:basis-[30%]"
          data-aos="fade-left"
          data-aos-duration="500"
        >
          <h2 className="text-white text-[24px] font-semibold">
            99.95% API uptime
          </h2>
          <p className="text-[#F1F1F1] text-[15px] font-medium">
            Reliable availabities you can trust to power you app's most
            important features.
          </p>
        </div>
      </div>
      <div className="text-center text-[#EAECF0] text-[18px] font-medium">
        Join 4,000+ companies already growing
      </div>
      <div className="flex justify-between w-full items-center gap-5 lg:flex-wrap">
        <img
          src={images.coinbase}
          className="cursor-pointer hover:scale-75 transition-scale duration-75"
        />
        <img
          src={images.spotify}
          className="cursor-pointer hover:scale-75 transition-scale duration-75"
        />
        <img
          src={images.slack}
          className="cursor-pointer hover:scale-75 transition-scale duration-75"
        />
        <img
          src={images.dropbox}
          className="cursor-pointer hover:scale-75 transition-scale duration-75"
        />
        <img
          src={images.weblfow}
          className="cursor-pointer hover:scale-75 transition-scale duration-75"
        />
        <img
          src={images.zoom}
          className="cursor-pointer hover:scale-75 transition-scale duration-75"
        />
      </div>
    </div>
  );
};

export default TriimoFunctionSection;
// This code defines a React component for the Triimo Function Section of a landing page.
// It includes a header, a description, a call to action with buttons, and a list of official SDKs and features.
