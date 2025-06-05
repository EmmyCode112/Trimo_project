import Button from "@/Components/buttons/transparentButton";
import { images } from "../Components/assets/assets";
import { useEffect } from "react";
const Community = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="w-full flex flex-col gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center">
        <h2 className="text-white font-semibold text-[29px] md:text-[39px] lg:text-[48px] leading-[60px] w-[90%] lg:max-w-[50%]">
          Join the TRIIMO community
        </h2>
        <p className="md:text-[18px] font-medium text-white lg:max-w-[50%] md:w-[70%] w-[90%] text-[16px]">
          Connect, collaborate, and grow with fellow developers and businesses
          using TRIIMO's messaging platform.
        </p>
      </div>

      <div className="lg:px-[105px] px-6 md:px-16 mt-[30px] flex max-lg:flex-wrap gap-[44px] justify-between max-lg:justify-center">
        <card className="flex flex-col gap-[64px] py-10 px-8 bg-white shadow w-[350px] hover:scale-[1.04] transition-all duration-500">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[25px] text-[#3F3E3E] font-semibold">
              Slack Community
            </h1>
            <p className="text-[15px] text-[#767676] font-normal mb-2">
              Join our vibrant Slack community to connect with other TRIIMO
              users, share experiences, and get real-time support.
            </p>
            <Button
              label="Join community"
              className="bg-[#383268] text-white rounded-[8px] py-[10px] w-full"
            />
          </div>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="24/7 community support"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                24/7 community support
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Exclusive tips & tricks"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Exclusive tips & tricks
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Network with peers"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Network with peers
              </span>
            </li>
          </ul>
        </card>
        <card className="flex flex-col gap-[64px] py-10 px-8 bg-white shadow w-[350px] hover:scale-[1.04] transition-all duration-500">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[25px] text-[#3F3E3E] font-semibold">Github</h1>
            <p className="text-[15px] text-[#767676] font-normal mb-2">
              Explore our open-source projects, contribute to our codebase, and
              stay updated with our latest releases.
            </p>
            <Button
              label="View GitHub"
              className="bg-[#383268] text-white rounded-[8px] py-[10px] w-full"
            />
          </div>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Access sample code"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Access sample code
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Report issues"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Report issues
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Contribute to projects "
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Contribute to projects
              </span>
            </li>
          </ul>
        </card>
        <card className="flex flex-col gap-[64px] py-10 px-8 bg-white shadow w-[350px] hover:scale-[1.04] transition-all duration-500">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[25px] text-[#3F3E3E] font-semibold">
              Postman Collection
            </h1>
            <p className="text-[15px] text-[#767676] font-normal mb-2">
              Get started quickly with our Postman collection. Test our APIs and
              integrate TRIIMO into your projects.
            </p>
            <Button
              label="View Collections"
              className="bg-[#383268] text-white rounded-[8px] py-[10px] w-full"
            />
          </div>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Ready-to-use API examples"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Ready-to-use API examples
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Testing environment"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Testing environment
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src={images.Checked}
                alt="Integration guides"
                className="w-6 h-6"
              />
              <span className="text-[16px] text-[#667085] font-normal">
                Integration guides
              </span>
            </li>
          </ul>
        </card>
      </div>

      <div className=" pt-[96px] px-6 md:px-16 lg:px-[105px] ">
        <div className="flex justify-between items-start gap-8 max-sm:flex-wrap">
          <div className="flex flex-col gap-2">
            <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
              Ready to Get Started
            </h2>
            <p>
              Join Our growing community of developers and business using triimo
            </p>
          </div>
          <div className="">
            <Button
              label="Get Started"
              className="bg-[#383268] text-white rounded-[8px] px-[14px] py-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
