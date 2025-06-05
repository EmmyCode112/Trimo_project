import { useEffect } from "react";
import CommunicationSection from "../Components/About/CommunicationSection";
import WhatsrunsSection from "../Components/About/WhatsrunsSection";
import Team from "../Components/About/Team";
import Analysis from "../Components/About/Analysis";
import Join from "../Components/About/Join";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <CommunicationSection />
      <WhatsrunsSection />
      <Team />
      <Analysis />
      <Join />
    </div>
  );
};

export default About;
