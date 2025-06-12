import { images } from "../../Components/assets/assets";

const Team = () => {
  return (
    <div className="py-[42px] flex flex-col gap-[52px] px-6 md:px-16 lg:px-[105px]">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="flex flex-col items-center justify-center lg:max-w-[60%] mx-auto text-center gap-[14px]"
      >
        <h2 className="text-[#1A1A1A] text-[32px] font-semibold">
          Meet Our Team
        </h2>
        <p className="text-[#767676] text-[18px] font-medium">
          The passionate individuals behind triimo working to revolutionize
          business communication through innovative messaging solutions.
        </p>
      </div>
      <div className="flex flex-col gap-y-[64px]">
        <div className="flex justify-between items-center gap-8 flex-wrap ">
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="flex items-start gap-[26px] max-sm:flex-col border-t border-[#EAECF0] pt-6 lg:basis-[45%]"
          >
            <div className="w-full">
              <img
                src={images.Team1}
                alt="olivia rhye"
                className="w-[296px] max-sm:w-full"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[20px] text-[#3F3E3E] font-semibold">
                  Olivia Rhye
                </h2>
                <h5 className="text-[18px] text-[#DB7500] font-normal">
                  Founder & CEO
                </h5>
                <p className="text-[16px] text-[#767676] font-normal">
                  Former co-founder of Opendoor. Early staff at Spotify and
                  Clearbit.
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <img
                  src={images.x}
                  alt="twitter"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.inIcon}
                  alt="linkedin"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.ball}
                  alt="net"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="100"
            className="flex items-start gap-[26px] max-sm:flex-col border-t border-[#EAECF0] pt-6 lg:basis-[45%]"
          >
            <div className="w-full">
              <img
                src={images.Team2}
                alt="phoenix"
                className="w-[296px] max-sm:w-full"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[20px] text-[#3F3E3E] font-semibold">
                  Phoenix Baker
                </h2>
                <h5 className="text-[18px] text-[#DB7500] font-normal">
                  Engineering Mananger
                </h5>
                <p className="text-[16px] text-[#767676] font-normal">
                  Lead engineering teams at Figma, Pitch, and Protocol Labs.
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <img
                  src={images.x}
                  alt="twitter"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.inIcon}
                  alt="linkedin"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.ball}
                  alt="net"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-8 flex-wrap ">
          {" "}
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="flex items-start gap-[26px] max-sm:flex-col border-t border-[#EAECF0] pt-6 lg:basis-[45%]"
          >
            <div className="w-full">
              <img
                src={images.Team3}
                alt="olivia rhye"
                className="w-[296px] max-sm:w-full"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[20px] text-[#3F3E3E] font-semibold">
                  Lana stiener
                </h2>
                <h5 className="text-[18px] text-[#DB7500] font-normal">
                  Produc manager
                </h5>
                <p className="text-[16px] text-[#767676] font-normal">
                  Former co-founder of Opendoor. Early staff at Spotify and
                  Clearbit.
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <img
                  src={images.x}
                  alt="twitter"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.inIcon}
                  alt="linkedin"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.ball}
                  alt="net"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="100"
            className="flex items-start gap-[26px] max-sm:flex-col border-t border-[#EAECF0] pt-6 lg:basis-[45%]"
          >
            <div className="w-full">
              <img
                src={images.Team4}
                alt="phoenix"
                className="w-[296px] max-sm:w-full"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[20px] text-[#3F3E3E] font-semibold">
                  Phoenix Baker
                </h2>
                <h5 className="text-[18px] text-[#DB7500] font-normal">
                  Engineering Mananger
                </h5>
                <p className="text-[16px] text-[#767676] font-normal">
                  Lead engineering teams at Figma, Pitch, and Protocol Labs.
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <img
                  src={images.x}
                  alt="twitter"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.inIcon}
                  alt="linkedin"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
                <img
                  src={images.ball}
                  alt="net"
                  className="cursor-pointer hover:scale-[1.1] duration-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
