import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="flex flex-col mt-5 gap-[30px] md:gap-[60px] px-[20px] md:px-[37px] lg:px-[85px] pt-[40px] md:pt-[62px] lg:pt-[112px] rounded-[20px] hero-section relative mx-[65px]">
      <div className=" absolute w-full h-full left-0 top-0 z-[-1] bg-[#ebebf0c4] rounded-[20px]"></div>
      <div className="text-center">
        <p className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[270px] mx-auto flex justify-center">
          No Credit Card Needed for Sign up
        </p>
        <h2 className="text-[48px] max-sm:text-[28px] font-bold mt-4 text-[#1A1A1A] w-full md:w-[80%] lg:w-[70%] leading-[60px] mx-auto">
          Effortless{" "}
          <span className="bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent">
            multi-channel{" "}
          </span>
          <span className="bg-gradient-to-r from-[#CB1E33] to-[#9A2444] bg-clip-text text-transparent">
            messaging{" "}
          </span>
          for your Business
        </h2>
        <h6 className="text-[#484848] w-full sm:w-[80%] md:w-[70%] lg:w-[38%] mt-4 text-[18px] font-medium leading-[28px] mx-auto ">
          Send bulk messages across SMS, WhatsApp, Email, and OTPs from one
          centralized platform.
        </h6>
        <div className="flex items-center mt-[27px] gap-3 mx-auto text-center justify-center">
          <Button
            label="Request a Demo"
            className="text-[#344054] font-medium border-[#C1BFD0]  px-[18px] py-[10px] rounded-[8px] cursor-pointer"
          />
          <Button
            label="Get Started Free"
            className="text-white font-medium bg-[#383268] px-[18px] py-[10px] rounded-[8px] cursor-pointer"
          />
        </div>
      </div>
      <img
        src={Icons.dashboardPreview}
        alt="dashboard preview"
        className="rounded-t-[20px]"
      />
    </div>
  );
};

export default HeroSection;
