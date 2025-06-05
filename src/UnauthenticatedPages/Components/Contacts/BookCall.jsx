import { images } from "../assets/assets";
const BookCall = () => {
  return (
    <div className="py-[96px] flex gap-[32px] items-starts justify-center lg:justify-between flex-wrap px-6 md:px-16 lg:px-[105px]">
      <div className="flex flex-col gap-5 lg:basis-[30%]">
        <h2 className="text-[28px] text-[#3F3E3E] font-semibold">
          Why Book a Call?
        </h2>
        <p className="text-[20px] text-[#767676] font-normal">
          Chat to our friendly team.
        </p>
      </div>
      <div className="bg-[#FBF1E6] rounded-[20px] p-6 flex flex-col gap-12 max-sm:w-full lg:basis-[30%]">
        <div>
          <img src={images.mailIcon} alt="mail icon" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-[20px] text-[#3F3E3E] font-medium">
            Personalized Demo
          </h2>
          <p className="text-[15px] text-[#767676] font-normal">
            See how TRIIMO can be tailored to your specific messaging needs
          </p>
        </div>
      </div>
      <div className="bg-[#FBF1E6] rounded-[20px] p-6 flex flex-col gap-12 max-sm:w-full lg:basis-[30%]">
        <div>
          <img src={images.messageIcon} alt="message" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-[20px] text-[#3F3E3E] font-medium">
            Personalized Demo
          </h2>
          <p className="text-[15px] text-[#767676] font-normal">
            See how TRIIMO can be tailored to your specific messaging needs
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCall;
