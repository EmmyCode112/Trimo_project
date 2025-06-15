import { Icons } from "@/assets/assets";
import { images } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col w-full pt-[64px] px-[140px] pb-[48px] bg-[#F9FAFB] mt-[48px] gap-[64px]">
      <div className="flex flex-wrap gap-[32px] justify-between">
        <div className="flex flex-col gap-8 mr-[16px] basis-auto lg:basis-[30%]">
          <Link to={"/#"}>
            <img
              src={Icons.triimoWebsiteLogo}
              alt="logo"
              className="w-[80px] cursor-pointer"
            />
          </Link>
          <p className="text-[#667085] text-[15px] font-normal">
            Design amazing digital experiences that create more happy in the
            world.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[14px] text-[#A3A3A3] font-semibold">
            Features
          </p>
          <ul className="flex flex-col gap-3">
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              SMS Messaging
            </li>
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              Email Messaging
            </li>
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              WhatsApp
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-[14px] text-[#A3A3A3] font-semibold">
            Product
          </p>
          <ul className="flex flex-col gap-3">
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              Support
            </li>
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              Developers
            </li>
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              GitHub
            </li>
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              Slack
            </li>
            <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
              PostMan
            </li>
            <Link to="/community">
              <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
                Community
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <p className="text-[14px] text-[#A3A3A3] font-semibold">
            Campany
            <ul className="flex flex-col gap-3 mt-4">
              <Link to="/about-us">
                <li className="text-[#919191] font-medium text-[16px] hover:underline hover:text-[#1A1A1A] cursor-pointer">
                  Abouts Us
                </li>
              </Link>
              <Link to="/contact-us">
                <li className="text-[#919191] font-medium text-[16px] hover:underline hover:text-[#1A1A1A] cursor-pointer">
                  Contact Us
                </li>
              </Link>
              <li className="text-[#919191] font-medium text-[16px] hover:underline hover:text-[#1A1A1A] cursor-pointer">
                Careers
              </li>
            </ul>
          </p>
        </div>
        <div>
          <p className=" text-[14px] text-[#A3A3A3] font-semibold">
            Support
            <ul className="flex flex-col gap-3 mt-4">
              <Link>
                <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
                  Terms of Services
                </li>
              </Link>
              <Link to="/privacy-policy">
                <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
                  Privacy Policy
                </li>
              </Link>
              <Link to="/legal-agreement">
                <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
                  Legal Service Agreement
                </li>
              </Link>

              <Link to="/code-of-conduct">
                <li className="text-[#919191] font-medium text-[16px] cursor-pointer hover:underline hover:text-[#1A1A1A]">
                  Code of Conduct
                </li>
              </Link>
            </ul>
          </p>
        </div>
      </div>
      <div className="border-t border-t-[#EAECF0] pt-8 w-full flex justify-between gap-y-4 gap-x-8 flex-wrap-reverse">
        <p>&copy; 2025 Triimo Inc. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <img
            src={images.x}
            alt="twitter"
            className="w-6 h-6 hover:scale-[1.08] cursor-pointer"
          />
          <img
            src={images.inIcon}
            alt="linkedin"
            className="w-6 h-6 hover:scale-[1.08] cursor-pointer"
          />
          <img
            src={images.fb}
            alt="facebook"
            className="w-6 h-6 hover:scale-[1.08] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
