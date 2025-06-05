import PhoneNumberInput from "../PhoneNumberInput";
import Button from "@/Components/buttons/transparentButton";

const Form = () => {
  return (
    <div className="">
      <div className="pt-[89px] pb-[96px] lg:px-[105px] px-6 md:px-16 flex flex-col gap-[89px]">
        <h2 className="text-[32px] text-[#3F3E3E] font-semibold text-center">
          Book Your Call
        </h2>
        <div className="w-full md:w-[70%] lg:w-[50%] mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-[32px] max-md:flex-wrap justify-between w-full">
            <label className="flex flex-col gap-2 w-full lg:basis-[48%]">
              <p className="text-[14px] text-[#3F3E3E] font-medium">
                First Name
              </p>
              <input
                type="text"
                placeholder="first name"
                className="border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] w-full placeholder:text-[#919191] outline-[#383268]"
              />
            </label>
            <label className="flex flex-col gap-2 w-full lg:basis-[48%]">
              <p className="text-[14px] text-[#3F3E3E] font-medium">
                Last Name
              </p>
              <input
                type="text"
                placeholder="last name"
                className="border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] w-full placeholder:text-[#919191]  outline-[#383268]"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <p className="text-[14px] text-[#3F3E3E] font-medium">Work Email</p>
            <input
              type="email"
              placeholder="work@gmail.com"
              className="border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] placeholder:text-[#919191] outline-[#383268]"
            />
          </label>
          <label className="flex flex-col gap-2">
            <p className="text-[14px] text-[#3F3E3E] font-medium">
              Campany Name
            </p>
            <input
              type="text"
              placeholder="campany name"
              className="border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] placeholder:text-[#919191] outline-[#383268]"
            />
          </label>
          <label className="flex flex-col gap-2">
            <p className="text-[14px] text-[#3F3E3E] font-medium">
              Phone Number
            </p>
            <PhoneNumberInput />
          </label>
          <label className="flex flex-col gap-2">
            <p className="text-[14px] text-[#3F3E3E] font-medium">
              Preferred Date
            </p>
            <input
              type="text"
              placeholder="preferred date"
              className="border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] placeholder:text-[#919191] outline-[#383268]"
            />
          </label>

          <Button
            label="Schedule Your Call"
            className="bg-[#383268] py-3 px-[20px] w-full rounded-[8px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
