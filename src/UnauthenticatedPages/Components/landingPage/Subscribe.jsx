import { images } from "../assets/assets";
import Button from "@/Components/buttons/transparentButton";

const Subscribe = () => {
  return (
    <div className="flex flex-col mt-[96px] px-[140px] gap-8">
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
      <div className="flex justify-between items-start gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div className="flex items-center gap-4">
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
