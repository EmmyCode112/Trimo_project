import Button from "@/Components/buttons/transparentButton";
import { images } from "../assets/assets";
import { useEffect, useRef } from "react";
import { fadeIn, slideInLeft, slideInRight, staggerChildren, scrollTriggerAnimation } from "@/utils/animations";

const StepByStepSection = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    // Animate the section title
    scrollTriggerAnimation(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate the steps with stagger effect
    if (stepsRef.current) {
      const steps = stepsRef.current.children;
      staggerChildren(stepsRef.current, steps, 0.5);
    }
  }, []);

  return (
    <div ref={sectionRef} className="mt-[60px] px-[20px] md:px-[65px] lg:px-[105px] mb-[56px]">
      <div className="flex flex-col gap-[14px]">
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
      <div ref={stepsRef} className="flex flex-col gap-y-[50px] mt-[78px] w-full">
        <div className="flex items-center gap-x-[68px] max-lg:flex-col gap-y-[20px] w-full ">
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
            <div className="flex max-sm:justify-center">
              <Button
                label="Sign Up for Free"
                className="border border-[#C1BFD0] rounded-[8px] px-[18px] py-[10px] text-[#344054]"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-[68px] max-lg:flex-col-reverse gap-y-[20px] w-full ">
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
            <div className="flex max-sm:justify-center">
              <Button
                label="Learn More"
                className="border border-[#C1BFD0] rounded-[8px] px-[18px] py-[10px] text-[#344054]"
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
        <div className="flex items-center gap-x-[68px] max-lg:flex-col gap-y-[20px] w-full ">
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
            <div className="flex max-sm:justify-center">
              <Button
                label="Start Your First Campaign"
                className="border border-[#C1BFD0] rounded-[8px] px-[18px] py-[10px] text-[#344054]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStepSection;
