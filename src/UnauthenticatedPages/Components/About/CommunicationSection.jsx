import { images } from "../../Components/assets/assets";
import Button from "@/Components/buttons/transparentButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
gsap.registerPlugin(ScrollTrigger);

const CommunicationSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Animate the text section
    if (textRef.current) {
      animations.push(
        gsap.from(textRef.current, {
          x: -100,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        })
      );
    }

    // Animate the title with typing effect
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

    // Animate the subtitle
    if (subtitleRef.current) {
      animations.push(
        gsap.from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        })
      );
    }

    // Animate the images with a staggered effect
    // imagesRef.current.forEach((image, index) => {
    //   if (image) {
    //     animations.push(
    //       gsap.from(image, {
    //         scale: 0.8,
    //         opacity: 0,
    //         duration: 1,
    //         delay: index * 0.2,
    //         ease: "back.out(1.7)",
    //         scrollTrigger: {
    //           trigger: image,
    //           start: "top center",
    //           end: "bottom center",
    //           scrub: 1,
    //         },
    //       })
    //     );

    //     // Add hover effect
    //     image.addEventListener("mouseenter", () => {
    //       gsap.to(image, {
    //         scale: 1.05,
    //         duration: 0.3,
    //         ease: "power2.out",
    //       });
    //     });

    //     image.addEventListener("mouseleave", () => {
    //       gsap.to(image, {
    //         scale: 1,
    //         duration: 0.3,
    //         ease: "power2.out",
    //       });
    //     });
    //   }
    // });

    // Cleanup function
    return () => {
      animations.forEach((anim) => {
        if (anim && anim.kill) {
          anim.kill();
        }
      });
    };
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[120px] px-6 md:px-16 lg:px-[105px] pt-[52px] pb-[78px] mt-[70px]"
    >
      {/* Left Text Section */}
      <div ref={textRef} className="max-w-lg text-center lg:text-left">
        <h2
          ref={titleRef}
          className="text-3xl md:text-[43px] font-semibold text-[#3F3E3E] leading-tight"
        >
          Empowering Communication Through Technology
        </h2>
        <p
          ref={subtitleRef}
          className="mt-[14px] text-[#484848] text-lg font-medium"
        >
          TRIIMO is revolutionizing business communication by providing a
          unified platform for all your messaging needs—from SMS and WhatsApp to
          email and OTP verification.
        </p>
      </div>

      {/* Right Image Grid */}
      <div className="flex flex-wrap gap-[9px] lg:h-[500px] max-sm:items-center max-sm:justify-center">
        <div className="flex flex-col justify-end gap-[7px]">
          <img
            // ref={el => imagesRef.current[0] = el}
            data-aos="fade-up"
            data-aos-duration="500"
            src={images.person1}
            alt="Person 1"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
            draggable="false"
          />
          <img
            // ref={el => imagesRef.current[1] = el}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="50"
            src={images.person2}
            alt="Person 2"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
            draggable="false"
          />
        </div>
        <div className="flex flex-col justify-start gap-[7px]">
          <img
            // ref={el => imagesRef.current[2] = el}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="70"
            src={images.person3}
            alt="Person 3"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
            draggable="false"
          />
          <img
            // ref={el => imagesRef.current[3] = el}
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay="90"
            src={images.person4}
            alt="Person 4"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg lg:mr-2"
            draggable="false"
          />
        </div>
        <div className="flex flex-col justify-center gap-[7px]">
          <img
            // ref={el => imagesRef.current[4] = el}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="150"
            src={images.person5}
            alt="Person 5"
            className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg col-span-2 mx-auto"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
};

export default CommunicationSection;
