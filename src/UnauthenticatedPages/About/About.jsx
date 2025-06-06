import { useEffect } from "react";
import CommunicationSection from "../Components/About/CommunicationSection";
import WhatsrunsSection from "../Components/About/WhatsrunsSection";
import Team from "../Components/About/Team";
import Analysis from "../Components/About/Analysis";
import Join from "../Components/About/Join";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Create a smooth page transition effect
    gsap.from("body", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <CommunicationSection />
      <WhatsrunsSection />
      <Team />
      <Analysis />
      <Join />
    </div>
  );
};

export default About;
