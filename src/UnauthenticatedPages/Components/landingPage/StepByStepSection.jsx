import Button from "@/Components/buttons/transparentButton";
import { images } from "../assets/assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const StepByStepSection = () => {
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

  const navigate = useNavigate();

  return (
    <div className="mt-[60px] px-[20px] md:px-[65px] lg:px-[105px] mb-[56px]">
      <div
        className="flex flex-col gap-[14px]"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <p className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[143px] mx-auto flex justify-center">
          Step-by-Step
        </p>
        <h2 className="text-[#1A1A1A] text-[32px] font-bold max-sm:text-[22px] text-center">
          How Triimo Works.
        </h2>
        <p className="text-center font-semibold text-[#767676] mx-auto w-full md:w-[70%] lg:w-[45%]">
          {`Effotless communication in three simple-here's how TRIIMO makes
          messaging seamless`}
        </p>
      </div>
      <div className="flex flex-col gap-y-[50px] mt-[78px] w-full">
        <div
          className="flex items-center gap-x-[68px] max-lg:flex-col gap-y-[20px] w-full "
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <div className="border border-[#F1F1F1] rounded-[10px] bg-[#FAFAFA] pt-[42px] pr-[78px]">
            <img
              src={images.Desktop1}
              alt="sign up overview"
              className="w-[281px]"
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
              Sign up and choose your messaging needs
            </h2>
            <ul className="list-disc flex flex-col gap-1">
              <li className="text-[#767676] font-normal mb-1">
                Create your TRIIMO account in minutes—no technical expertise
                needed.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Choose your preferred messaging channels: SMS, WhatsApp, Email,
                or OTPs.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Access a clean, intuitive dashboard tailored to your
                communication goals.
              </li>
            </ul>
            <div
              className="flex max-sm:justify-center"
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay="100"
            >
              <Button
                label="Sign Up for Free"
                onClick={() => navigate("/signup")}
                className="border border-[#C1BFD0] rounded-[8px] px-[18px] py-[10px] text-[#344054] hover:bg-[#383268] hover:text-white"
              />
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-x-[68px] max-lg:flex-col-reverse gap-y-[20px] w-full "
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <div className="flex flex-col gap-y-5">
            <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
              Upload your contact or connect via API
            </h2>
            <ul className="list-disc flex flex-col gap-1">
              <li className="text-[#767676] font-normal mb-1">
                Upload your contact list in bulk using simple file formats like
                CSV, or manually add individual recipients.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Prefer automation? Connect TRIIMO to your system using our
                powerful API to sync contacts in real-time.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Group your contacts for targeted campaigns and save time with
                reusable contact lists.
              </li>
            </ul>
            <div
              className="flex max-sm:justify-center"
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-delay="100"
            >
              <Button
                label="Learn More"
                className="border border-[#C1BFD0] rounded-[8px] px-[18px] py-[10px] text-[#344054] hover:bg-[#383268] hover:text-white"
              />
            </div>
          </div>

          <div className="border border-[#F1F1F1] rounded-[10px] bg-[#FAFAFA] pt-[42px] pr-[78px]">
            <img
              src={images.Desktop2}
              alt="sign up overview"
              className="w-[281px]"
            />
          </div>
        </div>
        <div
          className="flex items-center gap-x-[68px] max-lg:flex-col gap-y-[20px] w-full "
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <div className="border border-[#F1F1F1] rounded-[10px] bg-[#FAFAFA] pt-[42px] pr-[78px]">
            <img
              src={images.Desktop1}
              alt="sign up overview"
              className="w-[281px]"
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
              Send messages and monitor performance in real time
            </h2>
            <ul className="list-disc flex flex-col gap-1">
              <li className="text-[#767676] font-normal mb-1">
                Create personalized messages using our easy-to-use template
                builder.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Send campaigns instantly or schedule them for the perfect
                moment.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Track your message delivery, open rates, and engagement metrics
                live on the dashboard.
              </li>
              <li className="text-[#767676] font-normal mb-1">
                Use actionable insights to optimize future campaigns.
              </li>
            </ul>
            <div
              className="flex max-sm:justify-center"
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay="100"
            >
              <Button
                label="Start Your First Campaign"
                className="border border-[#C1BFD0] rounded-[8px] px-[18px] py-[10px] text-[#344054] hover:bg-[#383268] hover:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStepSection;
