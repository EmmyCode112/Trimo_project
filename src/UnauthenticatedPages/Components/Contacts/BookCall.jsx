import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const BookCall = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    const animations = [];

    // Animate title and subtitle
    if (titleRef.current) {
      animations.push(
        gsap.from(titleRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        })
      );
    }

    if (subtitleRef.current) {
      animations.push(
        gsap.from(subtitleRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
          }
        })
      );
    }

    // Animate cards with stagger effect
    cardsRef.current.forEach((card, index) => {
      if (card) {
        animations.push(
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          })
        );

        // Add hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });

    // Animate icons
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        animations.push(
          gsap.from(icon, {
            scale: 0,
            rotation: -180,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: icon,
              start: "top 85%",
            }
          })
        );
      }
    });

    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-[96px] flex gap-[32px] items-starts justify-center lg:justify-between flex-wrap px-6 md:px-16 lg:px-[105px]">
      <div className="flex flex-col gap-5 lg:basis-[30%]">
        <h2 ref={titleRef} className="text-[28px] text-[#3F3E3E] font-semibold">
          Why Book a Call?
        </h2>
        <p ref={subtitleRef} className="text-[20px] text-[#767676] font-normal">
          Chat to our friendly team.
        </p>
      </div>
      <div ref={el => cardsRef.current[0] = el} className="bg-[#FBF1E6] rounded-[20px] p-6 flex flex-col gap-12 max-sm:w-full lg:basis-[30%]">
        <div ref={el => iconsRef.current[0] = el}>
          <img src={images.mailIcon} alt="mail icon" draggable="false" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-[20px] text-[#3F3E3E] font-medium">
            Personalized Demo
          </h2>
          <p className="text-[15px] text-[#767676] font-normal">
            See how TRIIMO can be tailored to your specific messaging needs
          </p>
        </div>
      </div>
      <div ref={el => cardsRef.current[1] = el} className="bg-[#FBF1E6] rounded-[20px] p-6 flex flex-col gap-12 max-sm:w-full lg:basis-[30%]">
        <div ref={el => iconsRef.current[1] = el}>
          <img src={images.messageIcon} alt="message" draggable="false" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-[20px] text-[#3F3E3E] font-medium">
            Personalized Demo
          </h2>
          <p className="text-[15px] text-[#767676] font-normal">
            See how TRIIMO can be tailored to your specific messaging needs
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCall;
