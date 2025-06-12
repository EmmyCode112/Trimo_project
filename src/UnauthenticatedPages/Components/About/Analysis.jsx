import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const Analysis = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // Stop observing after it runs once
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Function to format numbers
  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B+";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M+";
    return num.toLocaleString(); // Format smaller numbers normally
  };

  return (
    <div
      ref={sectionRef}
      data-aos="fade-up"
      data-aos-duration="500"
      className="py-[96px] flex flex-col items-center justify-center gap-y-[64px]"
    >
      <div className="flex flex-col items-center gap-y-5">
        <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
          Build something great
        </h2>
        <p className="text-[#767676] text-[18px] font-normal text-center">
          Everything you need to build modern UI and great products.
        </p>
      </div>

      <div className="flex justify-center gap-[15px] md:gap-[40px] lg:gap-[54px] w-full flex-wrap max-sm:flex-col items-center text-center">
        <div className="flex flex-col gap-3">
          <h3 className="md:text-[40px] text-[27px] text-[#DB7500] tracking-[-2%] font-semibold">
            {startCount && (
              <CountUp
                end={1_000_000}
                duration={2}
                formattingFn={formatNumber}
              />
            )}
          </h3>
          <p className="text-[#3F3E3E] text-[18px] font-normal">
            Messages Delivered Daily
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="md:text-[40px] text-[27px] text-[#DB7500] tracking-[-2%] font-semibold">
            {startCount && (
              <>
                {" "}
                <CountUp end={5_000} duration={2} formattingFn={formatNumber} />
                %
              </>
            )}
          </h3>
          <p className="text-[#3F3E3E] text-[18px] font-normal">
            Business Customers
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="md:text-[40px] text-[27px] text-[#DB7500] tracking-[-2%] font-semibold">
            {startCount && (
              <>
                <CountUp
                  end={99.9}
                  decimals={1}
                  duration={2}
                  formattingFn={formatNumber}
                />
                %
              </>
            )}
          </h3>
          <p className="text-[#3F3E3E] text-[18px] font-normal">
            Delivery Success Rate
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
