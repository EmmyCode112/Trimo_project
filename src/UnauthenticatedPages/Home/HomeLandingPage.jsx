import { useEffect } from "react";
import HeroSection from "../Components/landingPage/HeroSection";
import UseCasesSection from "../Components/landingPage/UseCasesSection";
import FeatureSection from "../Components/landingPage/FeatureSection";
import TriimoFunctionSection from "../Components/landingPage/TriimoFunctionSection";
import StepByStepSection from "../Components/landingPage/StepByStepSection";
import Analysis from "../Components/landingPage/Analysis";
import Testimonial from "../Components/landingPage/Testimonial";
import FaqSection from "../Components/landingPage/FaqSection";
import Subscribe from "../Components/landingPage/Subscribe";
import CompanyLogos from "../Components/landingPage/CompanyLogos";
import { cleanupAnimations } from "@/utils/animations";

const HomeLandingPage = () => {
  useEffect(() => {
    // Cleanup animations when component unmounts
    return () => {
      cleanupAnimations();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <CompanyLogos />
      <UseCasesSection />
      <FeatureSection />
      <TriimoFunctionSection />
      <StepByStepSection />
      <Analysis />
      <Testimonial />
      <FaqSection />
      <Subscribe />
    </div>
  );
};

export default HomeLandingPage;
