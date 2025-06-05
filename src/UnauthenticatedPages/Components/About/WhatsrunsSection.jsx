import { images } from "../../Components/assets/assets";

const WhatsrunsSection = () => {
  return (
    <div className="bg-[#383268] lg:px-[105px] px-6 md:px-16 py-[48px] gap-10 flex flex-col w-full justify-center items-center">
      <div className="flex flex-col gap-y-[14px] text-center">
        <h1 className="text-[32px] font-semibold text-white">
          What runs the pack...
        </h1>
        <p className=" text-[#F1F1F1] font-medium text-[18px] lg:max-w-[65%] mx-auto">
          Over the years, we have created a culture that guides how we operate
          and how we accomplish our objectives
        </p>
      </div>
      <div>
        <img src={images.aboutImage} alt="about us" className="w-full" />
      </div>

      <div className="w-full flex justify-between items-start gap-[22px] flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-5 basis-auto lg:basis-[33%]">
          <h2 className="text-white text-[24px] font-semibold">Our Mission</h2>
          <p className="text-[#F1F1F1] text-[16px] font-medium">
            Our mission is to simplify and unify global communication for
            businesses and individuals, fostering deeper connections and
            efficient workflows.
          </p>
        </div>
        <div className="flex flex-col gap-5 basis-auto lg:basis-[33%]">
          <h2 className="text-white text-[24px] font-semibold">Our Vision</h2>
          <p className="text-[#F1F1F1] text-[16px] font-medium">
            We envision a future where Triimo is the leading platform that
            empowers businesses to connect seamlessly, bridging the gap between
            people and opportunities.
          </p>
        </div>
        <div className="flex flex-col gap-5 basis-auto lg:basis-[33%]">
          <h2 className="text-white text-[24px] font-semibold">Our Journey</h2>
          <p className="text-[#F1F1F1] text-[16px] font-medium">
            Triimo began with a simple idea: to make communication effortless
            for everyone. Since our founding in 2024, we’ve grown into a
            platform trusted by businesses worldwide, enabling millions of
            messages every day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsrunsSection;
