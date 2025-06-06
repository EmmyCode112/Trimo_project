import { images } from "../assets/assets";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CompanyLogos = () => {
  const containerRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && logosRef.current) {
      const logos = logosRef.current;
      const container = containerRef.current;
      
      // Clone the logos for seamless loop
      const clone = logos.cloneNode(true);
      container.appendChild(clone);

      // Create the infinite scroll animation
      gsap.to([logos, clone], {
        x: -logos.offsetWidth,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      gsap.killTweensOf([containerRef.current, logosRef.current]);
    };
  }, []);

  return (
    // <div className="w-full overflow-hidden bg-white py-8">
    //   <div ref={containerRef} className="flex whitespace-nowrap">
    //     <div ref={logosRef} className="flex items-center gap-8">
    //       <img src={images.slack} alt="Slack" className="h-8" draggable="false" />
    //       <img src={images.airbnb} alt="Airbnb" className="h-8" draggable="false" />
    //       <img src={images.amazon} alt="Amazon" className="h-8" draggable="false" />
    //       <img src={images.google} alt="Google" className="h-8" draggable="false" />
    //       <img src={images.microsoft} alt="Microsoft" className="h-8" draggable="false" />
    //       <img src={images.netflix} alt="Netflix" className="h-8" draggable="false" />
    //     </div>
    //   </div>
    // </div>
    <div>
      
    </div>
  );
};

export default CompanyLogos; 