import { images } from "../assets/assets";
const FeatureSection = () => {
  const cardItems = [
    {
      image: images.sms,
      title: "SMS Messaging",
      content:
        "Track delivery rate, open rate and engagement metrics with ease",
    },

    {
      image: images.email,
      title: "Email Messaging",
      content: "High delivery succes rate and strong encryption for your data",
    },
    {
      image: images.whatsApp,
      title: "WhatsApp Messaging",
      content:
        "Seamlessly intergrate Triimo's capability into your apllications",
    },
    {
      image: images.otp,
      title: "OTP Messaging",
      content:
        "Track delivery rate, open rate and engagement metrics with ease",
    },
    {
      image: images.secure,
      title: "Secure & Reliable",
      content: "High delivery succes rate and strong encryption for your data",
    },
    {
      image: images.analytics,
      title: "Real-Time Analytics",
      content: "High delivery succes rate and strong encryption for your data",
    },
  ];
  return (
    <div className="mt-[60px] flex flex-col gap-y-[42px] px-[65px]">
      <div className="flex flex-col gap-[14px]">
        <p className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[143px] mx-auto flex justify-center">
          Features Section
        </p>
        <h2 className="text-[#1A1A1A] text-[32px] font-bold max-sm:text-[22px] text-center">
          The complete toolbox for customer engagement
        </h2>
      </div>

      <div className=" flex gap-5 ">
        <div className=" flex gap-5 lg:flex-wrap justify-between">
          {cardItems.map((items, index) => (
            <div
              key={index}
              className="lg:basis-[30%] w-full md:w-1/2 border border-[#F1F1F1] rounded-[15px] pb-[21px]"
            >
              <img
                src={items.image}
                alt={items.title}
                className="rounded-t-[15px] h-[202px]"
              />
              <div className="flex flex-col gap-y-2 pt-[23px] px-[20px] md:pl-4 lg:pl-7 lg:pr-[60px] md:pr-[30px]">
                <h2 className="text-[22px] font-smibold text-[#3F3E3E]">
                  {items.title}
                </h2>
                <p className="text-[#969696] text-[16px] font-normal">
                  {items.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex gap-5"></div>
      </div>
    </div>
  );
};

export default FeatureSection;
