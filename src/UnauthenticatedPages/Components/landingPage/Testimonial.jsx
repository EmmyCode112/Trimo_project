import { images } from "../assets/assets";

const Testimonial = () => {
  return (
    <div className="px-[20px] md:px-[65px] lg:px-[105px] py-[60px] flex flex-col gap-[42px] bg-[#383268]">
      <h2 className="text-[26px] md:text-[32px] text-white font-semibold text-center">
        What Our Customers Say
      </h2>
      <div className="flex flex-wrap w-full justify-center gap-5">
        <div className="flex flex-col justify-between rounded-[15px] bg-[#6969694D] gap-[69px] px-7 pb-[17px] w-full basis-full md:basis-[48%] hover:scale-[1.03] transition-all duration-500">
          <p className="text-white text-[20px] font-normal mt-[36px] max-w-[90%]">
            We’ve been using Untitled to kick start every new project and can’t
            imagine working without it.
          </p>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <img
                src={images.avatar}
                alt="user"
                className="w-[64px] h-[64px]"
              />
              <p className="text-white text-[18px] font-500 mt-2">Candice Wu</p>
              <p className="text-[#C0C0C0] text-[16px] font-normal">
                Product Manager, Sisyphus
              </p>
            </div>
            <img src={images.testimoialLogo} />
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[15px] bg-[#6969694D] gap-[69px] px-7 pb-[17px] w-full basis-full md:basis-[48%] hover:scale-[1.03] transition-all duration-500">
          <p className="text-white text-[20px] font-normal mt-[36px] max-w-[90%]">
            We’ve been using Untitled to kick start every new project and can’t
            imagine working without it.
          </p>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <img
                src={images.avatar}
                alt="user"
                className="w-[64px] h-[64px]"
              />
              <p className="text-white text-[18px] font-500 mt-2">Candice Wu</p>
              <p className="text-[#C0C0C0] text-[16px] font-normal">
                Product Manager, Sisyphus
              </p>
            </div>
            <img src={images.testimoialLogo} />
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[15px] bg-[#6969694D] gap-[69px] px-7 pb-[17px] w-full basis-full md:basis-[48%] hover:scale-[1.03] transition-all duration-500">
          <p className="text-white text-[20px] font-normal mt-[36px] max-w-[90%]">
            We’ve been using Untitled to kick start every new project and can’t
            imagine working without it.
          </p>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <img
                src={images.avatar}
                alt="user"
                className="w-[64px] h-[64px]"
              />
              <p className="text-white text-[18px] font-500 mt-2">Candice Wu</p>
              <p className="text-[#C0C0C0] text-[16px] font-normal">
                Product Manager, Sisyphus
              </p>
            </div>
            <img src={images.testimoialLogo} />
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[15px] bg-[#6969694D] gap-[69px] px-7 pb-[17px] w-full basis-full md:basis-[48%] hover:scale-[1.03] transition-all duration-500">
          <p className="text-white text-[20px] font-normal mt-[36px] max-w-[90%]">
            We’ve been using Untitled to kick start every new project and can’t
            imagine working without it.
          </p>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <img
                src={images.avatar}
                alt="user"
                className="w-[64px] h-[64px]"
              />
              <p className="text-white text-[18px] font-500 mt-2">Candice Wu</p>
              <p className="text-[#C0C0C0] text-[16px] font-normal">
                Product Manager, Sisyphus
              </p>
            </div>
            <img src={images.testimoialLogo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
