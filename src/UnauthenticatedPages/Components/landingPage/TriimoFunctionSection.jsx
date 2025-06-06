import Button from "@/Components/buttons/transparentButton";
import { images } from "../assets/assets";
import { useEffect, useRef } from "react";
import { fadeIn, slideInLeft, slideInRight, staggerChildren, scrollTriggerAnimation } from "@/utils/animations";

const TriimoFunctionSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    // Animate the section
    scrollTriggerAnimation(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate the content
    if (contentRef.current) {
      slideInLeft(contentRef.current, 0.5);
    }

    // Animate the image
    if (imageRef.current) {
      slideInRight(imageRef.current, 0.7);
    }

    // Animate the features
    if (featuresRef.current) {
      const features = featuresRef.current.children;
      staggerChildren(featuresRef.current, features, 0.9);
    }

    // Animate the logos
    if (logosRef.current) {
      const logos = logosRef.current.children;
      staggerChildren(logosRef.current, logos, 1.2);
    }
  }, []);

  return (
    <div ref={sectionRef} className="w-full px-[25px] sm:px-[45px] md:px-[65px] lg:px-[105px] py-[20px] sm:py-[50px] py-[96px] bg-[#410F1D] flex flex-col gap-[42px] mt-[60px]">
      <div className="flex justify-between w-full items-center max-md:flex-col gap-y-[40px]">
        <div ref={contentRef} className="flex flex-col gap-[23px] basis-[40%]">
          <h1 className="leading-[48px] text-[32px] text-white font-semibold">
            Send your first text message in a matter of minutes
          </h1>
          <p className="text-[#F1F1F1] leading-[25px] text-[15px] font-medium">
            Sign up for a free Twilio account and grab one of our seven official
            server-side SDKs to get started. Send your first text message, phone
            call, or email in minutes and when you're ready to launch your app,
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
        <div ref={imageRef} className="basis-[50%]">
          <img src={images.functionReview} alt="" className="" />
        </div>
      </div>
      <div ref={featuresRef} className="flex justify-between w-full bg-[#310C16] py-[25px] gap-y-3 px-[27px] rounded-[15px] flex-wrap">
        <div className="flex flex-col gap-[14px] lg:basis-[30%]">
          <h2 className="text-white text-[24px] font-semibold">
            Officail SDKs
          </h2>
          <p className="text-[#F1F1F1] text-[15px] font-medium">
            Build quickly and confidently with our SDKs for Node.js, Python, C#,
            Java, PHP, Ruby, and Go.
          </p>
        </div>
        <div className="flex flex-col gap-[14px] lg:basis-[30%]">
          <h2 className="text-white text-[24px] font-semibold">
            Triimo Functions
          </h2>
          <p className="text-[#F1F1F1] text-[15px] font-medium">
            Bring idea to life without having to host your own code by deploying
            with Triimo functions.
          </p>
        </div>

        <div className="flex flex-col gap-[14px] lg:basis-[30%]">
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
      <div ref={logosRef} className="flex justify-between w-full items-center gap-x-5 gap-y-2 flex-wrap">
        <img src={images.coinbase} className="cursor-pointer" />
        <img src={images.spotify} className="cursor-pointer" />
        <img src={images.slack} className="cursor-pointer" />
        <img src={images.dropbox} className="cursor-pointer" />
        <img src={images.weblfow} className="cursor-pointer" />
        <img src={images.zoom} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TriimoFunctionSection;
