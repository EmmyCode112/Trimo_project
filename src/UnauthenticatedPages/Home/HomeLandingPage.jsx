import HeroSection from "../Components/landingPage/HeroSection";
import UseCasesSection from "../Components/landingPage/UseCasesSection";
import FeatureSection from "../Components/landingPage/FeatureSection";
import TriimoFunctionSection from "../Components/landingPage/TriimoFunctionSection";
import StepByStepSection from "../Components/landingPage/StepByStepSection";
import Analysis from "../Components/landingPage/analysis";
import Testimonial from "../Components/landingPage/Testimonial";
import FaqSection from "../Components/landingPage/FaqSection";
import Subscribe from "../Components/landingPage/Subscribe";
const HomeLandingPage = () => {
  return (
    <div>
      <HeroSection />
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
