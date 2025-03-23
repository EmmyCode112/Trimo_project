import Button from "@/Components/buttons/transparentButton";

const UseCasesSection = () => {
  return (
    <div className="mt-[60px] px-[65px]">
      <div className="flex flex-col gap-[14px]">
        <p className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[143px] mx-auto flex justify-center">
          Use Cases Section
        </p>
        <h2 className="text-[#1A1A1A] text-[32px] font-bold max-sm:text-[22px] text-center">
          Triimo works for your team.
        </h2>
      </div>

      <div className="flex justify-between gap-5 lg:gap-[50px] w-full bg-[#FAFAFA] rounded-[20px] mt-[36px]">
        <div className="flex flex-col py-[38px] px-[30px]">
          <h3 className="text-[20px] text-[#484848] font-semibold mb-2">
            Marketings Teams
          </h3>
          <p className="text-[#484848] mb-4">
            They need to send promotional campaigns via SMS, email, and
            WhatsApp, and analyze delivery rates and engagement metrics.
          </p>
          <Button
            label="See More"
            className="text-[#344054] border-[#D0D5DD] py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] w-[107px]"
          />
        </div>
        <div className="flex flex-col py-[38px] px-[30px]">
          <h3 className="text-[20px] text-[#484848] font-semibold mb-2">
            Developers
          </h3>
          <p className="text-[#484848] mb-4">
            They want API access to integrate messaging services with their own
            applications and websites.
          </p>
          <Button
            label="See More"
            className="text-[#344054] border-[#D0D5DD] py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] w-[107px]"
          />
        </div>
        <div className="flex flex-col py-[38px] px-[30px]">
          <h3 className="text-[20px] text-[#484848] font-semibold mb-2">
            Customer Support Teams
          </h3>
          <p className="text-[#484848] mb-4">
            They need to send automated messages and OTPs for customer
            verification or transactional updates.
          </p>
          <Button
            label="See More"
            className="text-[#344054] border-[#D0D5DD] py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] w-[107px]"
          />
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;
