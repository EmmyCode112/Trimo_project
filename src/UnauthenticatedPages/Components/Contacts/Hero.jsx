import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/Hero.css"; // Ensure you have the correct path to your CSS
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
      easing: "ease-in-out", // Easing function for the animation
      offset: 100, // Offset (in pixels) from the original trigger point
      disable: "mobile", // Disable animations on mobile devices
    });
    // Cleanup AOS on component unmount

    return () => {
      AOS.refresh(); // Refresh AOS to ensure it works correctly on re-render
    };
  }, []);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Create animated gradient effect
    if (containerRef.current) {
      const gradient = gsap.to(containerRef.current, {
        background:
          "linear-gradient(45deg, #CB1E33, #9A2444, #383268, #9A2444, #CB1E33)",
        backgroundSize: "400% 400%",
        duration: 15,
        repeat: -1,
        ease: "none",
      });
      animations.push(gradient);

      // Animate title with typing effect
      if (titleRef.current) {
        const text = titleRef.current.textContent;
        titleRef.current.textContent = "";
        const words = text.split(" ");

        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.textContent = word + " ";
          span.style.opacity = "0";
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

      // Animate subtitle
      if (subtitleRef.current) {
        animations.push(
          gsap.from(subtitleRef.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: "power3.out",
          })
        );
      }
    }

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col mt-[100px] gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center">
        <h2
          ref={titleRef}
          className="text-white font-semibold text-[29px] md:text-[39px] lg:text-[48px] leading-[60px] w-[90%] lg:max-w-[50%] hero-text"
        >
          Let&apos;s Talk About Your Messaging Needs
        </h2>
        <p
          data-aos="fade-right"
          data-aos-duration="500"
          className="md:text-[18px] font-medium text-white lg:max-w-[50%] md:w-[70%] w-[90%] text-[16px]"
        >
          Connect with our experts to discover how TRIIMO can transform your
          communication strategy
        </p>
      </div>
    </div>
  );
};

export default Hero;
