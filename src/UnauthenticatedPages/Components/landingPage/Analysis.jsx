import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { fadeIn, staggerChildren, scrollTriggerAnimation } from "@/utils/animations";

const Analysis = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Animate the section title
    scrollTriggerAnimation(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate the stats with stagger effect
    if (statsRef.current) {
      const stats = statsRef.current.children;
      staggerChildren(statsRef.current, stats, 0.5);
    }

    return () => observer.disconnect();
  }, []);

  // Function to format numbers
  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B+";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M+";
    return num.toLocaleString();
  };

  return (
    <div
      ref={sectionRef}
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

      <div ref={statsRef} className="flex justify-center gap-[20px] max-sm:flex-wrap md:gap-[40px] lg:gap-[54px] w-full">
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-[32px] md:text-[40px] text-[#DB7500] tracking-[-2%] font-semibold">
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

        <div className="flex flex-col items-center gap-3">
          <h3 className="text-[32px] md:text-[40px] text-[#DB7500] tracking-[-2%] font-semibold">
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

        <div className="flex flex-col items-center gap-3">
          <h3 className="text-[32px] md:text-[40px] text-[#DB7500] tracking-[-2%] font-semibold">
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
