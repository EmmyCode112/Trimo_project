import Button from "@/Components/buttons/transparentButton";
import { images } from "../assets/assets";

const TriimoFunctionSection = () => {
  return (
    <div className="w-full lg:px-[105px] py-[96px] bg-[#410F1D] flex flex-col gap-[42px] mt-[60px]">
      <div className="flex justify-between w-full items-start md:flex-wrap-reverse md:gap-x-[50px] lg:gap-[106px] gap-y-[40px]">
        <div className="flex flex-col gap-[23px] basis-[40%]">
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
        <div className="basis-[50%]">
          <img src={images.functionReview} alt="" className="" />
        </div>
      </div>
      <div className="flex justify-between w-full bg-[#310C16] py-[25px] px-[27px] rounded-[15px] flex-wrap">
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
      <div className="flex justify-between w-full items-center gap-5 lg:flex-wrap">
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
