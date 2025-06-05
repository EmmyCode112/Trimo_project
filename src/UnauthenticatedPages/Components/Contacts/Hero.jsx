const Hero = () => {
  return (
    <div>
      <div className="w-full flex flex-col mt-[100px] gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33]  via-[#9A2444] to-[#383268] h-[504px] text-center">
        <h2 className="text-white font-semibold text-[29px] md:text-[39px] lg:text-[48px] leading-[60px] w-[90%] lg:max-w-[50%]">
          Let's Talk About Your Messaging Needs
        </h2>
        <p className="md:text-[18px] font-medium text-white lg:max-w-[50%] md:w-[70%] w-[90%] text-[16px]">
          Connect with our experts to discover how TRIIMO can transform your
          communication strategy
        </p>
      </div>
    </div>
  );
};

export default Hero;
