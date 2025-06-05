import Button from "@/Components/buttons/transparentButton";

const Subscribe = () => {
  return (
    <div className=" pt-[96px] lg:px-[140px] px-6 md:px-16">
      <div className="flex justify-between items-start gap-8 max-md:flex-wrap">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap max-sm:w-full">
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
