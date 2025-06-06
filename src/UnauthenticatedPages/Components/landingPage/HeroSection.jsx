import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";
import "./HeroSection.css";
import { useEffect, useRef } from "react";
import { fadeIn, slideInLeft, slideInRight, typingAnimation, initAnimations } from "@/utils/animations";
import { gsap } from "gsap";

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Animate the badge with a bounce effect
    if (badgeRef.current) {
      animations.push(
        gsap.from(badgeRef.current, {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "bounce.out",
        })
      );
    }

    // Animate the hero section with a fade and scale
    if (heroRef.current) {
      animations.push(
        gsap.from(heroRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1.5,
          ease: "power3.out",
        })
      );
    }
    
    // Animate the title with enhanced typing effect
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.textContent = '';
      
      // Split text into words for word-by-word animation
      const words = text.split(' ');
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        titleRef.current.appendChild(span);
        
        animations.push(
          gsap.to(span, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.2,
            ease: "power2.out",
          })
        );
      });
    }
    
    // Animate the subtitle with a slide and fade
    if (subtitleRef.current) {
      animations.push(
        gsap.from(subtitleRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          delay: 1.5,
          ease: "power3.out",
        })
      );
    }
    
    // Animate the buttons with a stagger effect
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.children;
      animations.push(
        gsap.from(buttons, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 2,
          ease: "power3.out",
        })
      );
    }
    
    // Animate the image with a special effect
    if (imageRef.current) {
      animations.push(
        gsap.from(imageRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          duration: 1.5,
          delay: 2.5,
          ease: "power3.out",
          onComplete: () => {
            // Add a subtle floating animation
            gsap.to(imageRef.current, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          }
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
    };
  }, []);

  return (
    <div ref={heroRef} className="flex flex-col mt-5 gap-[30px] md:gap-[60px] px-[0] md:px-[37px] lg:px-[85px] mt-[100px] pt-[40px] md:pt-[62px] lg:pt-[112px] lg:rounded-[20px] hero-section relative max-md:mx-0 mx-[65px]">
      <div className="absolute w-full h-full left-0 top-0 z-[-1] bg-[#ebebf0c4] lg:rounded-[20px]"></div>
      <div className="text-center">
        <p ref={badgeRef} className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[270px] mx-auto flex justify-center">
          No Credit Card Needed for Sign up
        </p>
        <h2 ref={titleRef} className="text-[30px] lg:text-[48px] max-sm:text-[28px] font-bold mt-4 text-[#1A1A1A] w-full md:w-[80%] lg:w-[70%] leading-[60px] mx-auto">
          Effortless{" "}
          <span className="bg-gradient-to-r from-[#9A2444] to-[#383268] bg-clip-text text-transparent">
            multi-channel{" "}
          </span>
          <span className="bg-gradient-to-r from-[#CB1E33] to-[#9A2444] bg-clip-text text-transparent">
            messaging{" "}
          </span>
          for your Business
        </h2>
        <h6 ref={subtitleRef} className="text-[#484848] w-full sm:w-[80%] md:w-[70%] lg:w-[38%] mt-4 text-[18px] font-medium leading-[28px] mx-auto">
          Send bulk messages across SMS, WhatsApp, Email, and OTPs from one
          centralized platform.
        </h6>
        <div ref={buttonsRef} className="flex items-center mt-[27px] gap-3 mx-auto text-center justify-center">
          <Button
            label="Request a Demo"
            className="text-[#344054] font-medium border-[#C1BFD0] px-[18px] py-[10px] rounded-[8px] cursor-pointer"
          />
          <Button
            label="Get Started Free"
            className="text-white font-medium bg-[#383268] px-[18px] py-[10px] rounded-[8px] cursor-pointer"
          />
        </div>
      </div>
      <img
        ref={imageRef}
        src={Icons.dashboardPreview}
        alt="dashboard preview"
        className="rounded-t-[20px]"
        draggable="false"
      />
    </div>
  );
};

export default HeroSection;
