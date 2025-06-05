import { images } from "../../Components/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const CommunicationSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[120px] px-6 md:px-16 lg:px-[105px] pt-[52px] pb-[78px] mt-[70px] ">
      {/* Left Text Section */}
      <div className="max-w-lg text-center lg:text-left">
        <h2 className="text-3xl md:text-[43px] font-semibold text-[#3F3E3E] leading-tight">
          Empowering Communication Through Technology
        </h2>
        <p className="mt-[14px] text-[#484848] text-lg font-medium">
          TRIIMO is revolutionizing business communication by providing a
          unified platform for all your messaging needs—from SMS and WhatsApp to
          email and OTP verification.
        </p>
      </div>

      {/* Right Image Grid */}
      <div className="flex flex-wrap gap-[9px] lg:h-[500px] max-sm:items-center max-sm:justify-center">
        <div className="flex flex-col justify-end gap-[7px]">
          <img
            src={images.person1}
            alt="Person 1"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
          />
          <img
            src={images.person2}
            alt="Person 2"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
          />
        </div>
        <div className="flex flex-col justify-start gap-[7px]">
          <img
            src={images.person3}
            alt="Person 3"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
          />
          <img
            src={images.person4}
            alt="Person 4"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
          />
        </div>
        <div className="flex flex-col justify-center gap-[7px]">
          <img
            src={images.person5}
            alt="Person 5"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg col-span-2 mx-auto "
          />
        </div>
      </div>
    </section>
  );
};

export default CommunicationSection;
