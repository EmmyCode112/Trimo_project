import Button from "@/Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {" "}
      <div className="w-full flex flex-col gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center">
        <h2 className="text-white font-semibold text-[29px] md:text-[39px] lg:text-[48px] leading-[60px] w-[90%] lg:max-w-[50%]">
          Privacy and Policy
        </h2>
        <p className="md:text-[18px] font-medium text-white lg:max-w-[50%] md:w-[70%] w-[90%] text-[16px]">
          At Triimo, we empower businesses and individuals to communicate
          seamlessly across SMS, WhatsApp, Email, and OTP services. Our
          innovative platform simplifies messaging, enabling meaningful
          connections worldwide.
        </p>
      </div>
      <div className="px-6 md:px-16 lg:px-[105px] py-[59px]">
        <p className="text-[#484848] font-medium">
          The Africa’s Talking Group of Companies, (collectively “AT”, “we” and
          “us”) respect your privacy and are committed to maintaining your
          trust. We adhere to all applicable data protection and privacy laws
          globally. This Privacy Notice describes the types of Personal Data you
          provide or that we collect on our API Platform or website, how we use
          Personal Data, with whom we share it and your rights and choices with
          regards to your Personal Data. Please read this Privacy Notice
          carefully and ensure that it is understood as it forms part of your
          agreement with AT.
        </p>
        <p className="mt-[24px] text-[#484848] font-medium">
          This Privacy Policy applies to all visitors to our website and anyone
          who accesses or uses our products and services in all the countries we
          operate in.
        </p>
        <div className="mt-6">
          <h2 className="text-[#484848] text-[18px] font-semibold">
            1. DEFINED TERMS
          </h2>
          <ul className="flex flex-col gap-[15px]  text-[#484848] font-medium mt-[15px]">
            <li>
              The following terms will have the meanings indicated below. Please
              refer to our Terms of Service for any capitalized terms that are
              not defined in this policy.
            </li>
            <li>
              "Other Information/Data" is any information or Data that does not
              reveal your specific identity or does not directly relate to an
              individual, such as Services usage data.
            </li>
            <li>
              "Personal Data / Information" is information or Data that
              identifies you as an individual or relates to an identifiable
              person, such as name, ID , postal address, telephone number, email
              address, credit card number, social media account ID and any other
              information relating thereto. It does not include strings of code
              such as browser cookie IDs.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h1 className="text-[#484848] text-[18px] font-semibold">
            2. HOW /WHEN WE COLLECT YOUR PERSONAL DATA
          </h1>
          <p className="text-[#484848] text-[18px] font-semibold mt-[15px]">
            Most of the personal data we process is provided to us directly by
            you when you:
          </p>
          <ul className="list-disc mt-[15px] flex flex-col gap-2">
            <li>Create an account on the API Platform</li>
            <li>
              Start using our services, Visit our website, or register for more
              information on a specific service
            </li>
            <li>
              Register to attend or have attended an event organized by AT ,
              subscribe to our e-newsletter, blog or a webinar or Participate in
              discussions on our social media platform
            </li>
            <li>Participate in market studies, surveys or promotions</li>
          </ul>
          <h2 className="text-[#484848] text-[18px] font-semibold mt-[15px]">
            We also collect personal and device information when you:
          </h2>

          <ul className="list-disc mt-[15px] flex flex-col gap-2">
            <li>Make payments to us </li>
            <li>pply to us for employment or internship </li>
            <li>
              Call or otherwise contact us including via SMS, USSD, website
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#383268] w-full flex items-center flex-col justify-center py-[48px] gap-8">
        <h2 className="text-white text-[24px] font-semibold">
          Ready to get started?
        </h2>
        <div>
          <Button
            label="Yes, Sign me Up"
            onClick={() => navigate("/signup")}
            className="bg-white text-[#383268] text-[16px] font-medium px-[18px] py-[10px] rounded-[8px] "
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
