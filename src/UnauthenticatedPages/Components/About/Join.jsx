import Button from "@/Components/buttons/transparentButton";

const Join = () => {
  return (
    <div className="flex items-start justify-between gap-[32px] lg:gap-[64px] flex-wrap px-6 md:px-16 lg:px-[105px]">
      <div
        data-aos="fade-right"
        data-aos-duration="500"
        className="lg:basis-[70%] flex flex-col gap-2"
      >
        <h2 className="text-[24px] text-[#3F3E3E] font-semibold">
          Join Our Team
        </h2>
        <p className="text-[20px] text-[#767676] font-normal">
          We're always looking for talented individuals to help us shape the
          future of business communication.
        </p>
      </div>
      <div data-aos="fade-left" data-aos-duration="500" data-aos-delay="100">
        <Button
          label="View Open Positions"
          className="text-white rounded-[8px] text-[16px] font-medium bg-[#383268] px-[18px] py-[10px]"
        />
      </div>
    </div>
  );
};

export default Join;
