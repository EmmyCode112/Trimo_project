import Button from "@/Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ServiceAgreement = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center">
        <h2 className="text-white font-semibold text-[29px] md:text-[39px] lg:text-[48px] leading-[60px] w-[90%] lg:max-w-[50%]">
          Service level Agreement
        </h2>
        <p className="md:text-[18px] font-medium text-white lg:max-w-[50%] md:w-[70%] w-[90%] text-[16px]">
          At Triimo, we empower businesses and individuals to communicate
          seamlessly across SMS, WhatsApp, Email, and OTP services. Our
          innovative platform simplifies messaging, enabling meaningful
          connections worldwide.
        </p>
      </div>
      <div className="px-6 md:px-16 lg:px-[105px] py-[59px]">
        <div className="flex flex-col gap-[15px]">
          <h1 className="text-[#484848] text-[18px] font-semibold">
            1. Delays & Service interruptions
          </h1>
          <p className="text-[#484848] font-medium">
            We will use all commercially practicable endeavours to minimize
            delays or outages in the provision of the Services. We will inform
            you of any downtime on the API Platform as soon as possible and in
            any event within twenty-four (24) hours of such downtime. AT shall
            credit the User Account with an amount equivalent to the cost of a
            particular service not delivered by AT to the Network Provider’s
            system provided that such failure is caused by a downtime on the API
            Platform.
          </p>
          <p className="text-[#484848] font-medium">
            AT shall not provide any repayment for delays or failures in
            relation to the Service where such failure or delay is a result of
            factors beyond AT’s control (including but not limited to Force
            Majeure Events or factors caused by the Network Providers).
          </p>
        </div>

        <div className="overflow-x-auto mt-[15px]">
          <table className="w-full border-collapse border border-[#EAECF0] rounded-[8px] text-left max-sm:whitespace-nowrap">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-b-[#EAECF0] ">
                <th className="p-3 text-[12px] text-[#919090 ] font-medium">
                  Priority
                </th>
                <th className="p-3 text-[12px] text-[#919090 ] font-medium">
                  Measurement/Timeline
                </th>
                <th className="p-3 text-[12px] text-[#919090 ] font-medium w-[40%]">
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666]">
                  Level 1 - Business Critical
                </td>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666]">
                  Response within 5-15 minutes to acknowledge report from
                  Client.
                  <br />
                  Allowable deviation to resolve – 48 hours during working
                  hours.
                  <br />
                  <strong>416 Hug ≥ 60 Hug</strong>
                </td>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666] w-[40%]">
                  Covers complete business failure for Services in production
                  which requires AT to immediately notify of the failure.
                </td>
              </tr>
              <tr className="border-y border-y-[#EAECF0]">
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666]">
                  Level 2 - Degraded Service
                </td>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666]">
                  Response within 15-30 minutes to acknowledge report from
                  Client.
                  <br />
                  Allowable deviation to resolve – 7 Business Days.
                </td>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666] w-[40%]">
                  Required assistance here would for instance entail end-to-end
                  correction of faults, more specifically errors, bugs, or
                  failure of AT’s API Platform.
                </td>
              </tr>
              <tr className="bg-white">
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666]">
                  Level 3 - General
                </td>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666]">
                  Response within 15-30 minutes to acknowledge report from
                  Client.
                  <br />
                  Allowable deviation to resolve – 72 hours during working
                  hours.
                </td>
                <td className="py-4 px-3 text-[14px] font-normal text-[#666666] w-[40%]">
                  These are mostly issues you would encounter in connection with
                  the API Platform, provider inquiries related to Service
                  provided, e.g., product questions, feature requests, or
                  development issues.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-[15px] flex flex-col gap-[15px]">
          <h1 className="text-[#484848] text-[18px] font-semibold">
            2. Maintainance
          </h1>
          <p className="text-[#484848] font-medium">
            We will inform you of all scheduled maintenance and we will endeavor
            to carry out our maintenance activities at times where the minimum
            effect will be felt by you. We will provide you with at least five
            (5) days’ notice for scheduled maintenance. In case of emergency
            maintenance, we will provide you with reasonable reason for the
            same.
          </p>
        </div>

        <div className="mt-[15px] flex flex-col gap-[15px]">
          <h1 className="text-[#484848] text-[18px] font-semibold">
            3. Customer Support
          </h1>
          <p className="text-[#484848] font-medium">
            AT shall provide you with customer support for the duration of this
            Agreement. Please contact us at support@africastalking.com for the
            purpose of customer engagement and account management.
          </p>
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

export default ServiceAgreement;
