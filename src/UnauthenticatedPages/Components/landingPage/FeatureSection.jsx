import { images } from "../assets/assets";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  const cardItems = [
    {
      image: images.sms,
      title: "SMS Messaging",
      content:
        "Track delivery rate, open rate and engagement metrics with ease",
    },
    {
      image: images.email,
      title: "Email Messaging",
      content: "High delivery success rate and strong encryption for your data",
    },
    {
      image: images.whatsApp,
      title: "WhatsApp Messaging",
      content:
        "Seamlessly intergrate Triimo's capability into your applications",
    },
    {
      image: images.otp,
      title: "OTP Messaging",
      content:
        "Track delivery rate, open rate and engagement metrics with ease",
    },
    {
      image: images.secure,
      title: "Secure & Reliable",
      content: "High delivery success rate and strong encryption for your data",
    },
    {
      image: images.analytics,
      title: "Real-Time Analytics",
      content: "High delivery success rate and strong encryption for your data",
    },
  ];

  useEffect(() => {
    const animations = [];

    // Animate the title and subtitle
    if (titleRef.current && subtitleRef.current) {
      animations.push(
        gsap.from([titleRef.current, subtitleRef.current], {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        })
      );
    }

    // Animate the image with a scroll-triggered effect
    if (imageRef.current) {
      animations.push(
        gsap.from(imageRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
          ease: "power2.out",
        })
      );
    }

    // Cleanup function
    return () => {
      animations.forEach(anim => {
        if (anim && anim.kill) {
          anim.kill();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="mt-[60px] px-[25px] sm:px-[45px] lg:px-[65px]">
      <div className="flex flex-col gap-[14px]">
        <p className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[143px] mx-auto flex justify-center">
          Feature Section
        </p>
        <h2 ref={titleRef} className="text-[#1A1A1A] text-[32px] font-bold max-sm:text-[22px] text-center">
          Features that make us stand out
        </h2>
        <p ref={subtitleRef} className="text-[#484848] text-[18px] font-medium text-center">
          We provide the best features for your business
        </p>
      </div>

      <div className="mt-[36px]">
        <img
          ref={imageRef}
          src={images.featureImage}
          alt="feature"
          className="w-full h-auto"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default FeatureSection;
