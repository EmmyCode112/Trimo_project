import React from "react";
import Button from "@/Components/buttons/transparentButton";

const TermsAndCondition = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="w-full flex flex-col gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center mt-[100px]">
        <h2 className="text-white font-semibold text-[29px] md:text-[39px] lg:text-[48px] leading-[60px] w-[90%] lg:max-w-[50%]">
          Terms of Service
        </h2>
        <p className="md:text-[18px] font-medium text-white lg:max-w-[50%] md:w-[70%] w-[90%] text-[16px]">
          At Triimo, we empower businesses and individuals to communicate
          seamlessly across SMS, WhatsApp, Email, and OTP services. Our
          innovative platform simplifies messaging, enabling meaningful
          connections worldwide.
        </p>
      </div>
      <div>
        <div className="px-6 md:px-16 lg:px-[105px]  py-[59px] text-[#484848] font-medium">
          <p>
            You shall adhere to the following code of conduct and shall ensure
            that it/ the content it sends through AT’s API Platform does not
            (this list is not intended to be exhaustive):
          </p>
          <ul className="list-decimal flex flex-col gap-[15px]">
            <li>
              contain anything which is in breach of the law, or omit anything
              which the law requires. Furthermore, services and promotional
              material must not facilitate or encourage anything which is in any
              way harmful;
            </li>
            <li>
              contain material indicating violence, sadism or cruelty or be of
              repulsive or horrible nature;
            </li>
            <li>involve the use of foul language;</li>
            <li>
              {" "}
              Be of a kind that is likely to be used to promote or facilitate
              immoral act including prostitution;
            </li>
            <li>
              Be of a kind that is likely to mislead through inaccuracy,
              ambiguity, exaggeration, omission or otherwise and it should be
              clear to the consumers when time sensitive information was last
              updated
            </li>
            <li>Result in any unreasonable invasion of privacy</li>

            <li>
              contain anything which is in breach of the law, or omit anything
              which the law requires. Furthermore, services and promotional
              material must not facilitate or encourage anything which is in any
              way harmful;
            </li>
            <li>
              contain material indicating violence, sadism or cruelty or be of
              repulsive or horrible nature;
            </li>
            <li>involve the use of foul language;</li>
            <li>
              {" "}
              Be of a kind that is likely to be used to promote or facilitate
              immoral act including prostitution;
            </li>
            <li>
              Be of a kind that is likely to mislead through inaccuracy,
              ambiguity, exaggeration, omission or otherwise and it should be
              clear to the consumers when time sensitive information was last
              updated
            </li>
            <li>Result in any unreasonable invasion of privacy</li>
          </ul>
        </div>
      </div>
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
    </div>
  );
};

export default TermsAndCondition;
