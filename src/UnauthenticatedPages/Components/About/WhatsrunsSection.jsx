import { images } from "../../Components/assets/assets";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatsrunsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const animations = [];

    // Animate the title with typing effect
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.textContent = '';
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

    // Animate the main image with parallax effect
    if (imageRef.current) {
      animations.push(
        gsap.to(imageRef.current, {
          y: -50,
          duration: 2,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          ease: "none",
        })
      );
    }

    // Animate the cards with a staggered effect
    cardsRef.current.forEach((card, index) => {
      if (card) {
        animations.push(
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
            ease: "power3.out",
          })
        );

        // Add hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

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
    <div ref={sectionRef} className="bg-[#383268] lg:px-[105px] px-6 md:px-16 py-[48px] gap-10 flex flex-col w-full justify-center items-center">
      <div className="flex flex-col gap-y-[14px] text-center">
        <h1 ref={titleRef} className="text-[32px] font-semibold text-white">
          What runs the pack...
        </h1>
        <p ref={subtitleRef} className="text-[#F1F1F1] font-medium text-[18px] lg:max-w-[65%] mx-auto">
          Over the years, we have created a culture that guides how we operate
          and how we accomplish our objectives
        </p>
      </div>
      <div>
        <img ref={imageRef} src={images.aboutImage} alt="about us" className="w-full" draggable="false" />
      </div>

      <div className="w-full flex justify-between items-start gap-[22px] flex-wrap lg:flex-nowrap">
        <div ref={el => cardsRef.current[0] = el} className="flex flex-col gap-5 basis-auto lg:basis-[33%]">
          <h2 className="text-white text-[24px] font-semibold">Our Mission</h2>
          <p className="text-[#F1F1F1] text-[16px] font-medium">
            Our mission is to simplify and unify global communication for
            businesses and individuals, fostering deeper connections and
            efficient workflows.
          </p>
        </div>
        <div ref={el => cardsRef.current[1] = el} className="flex flex-col gap-5 basis-auto lg:basis-[33%]">
          <h2 className="text-white text-[24px] font-semibold">Our Vision</h2>
          <p className="text-[#F1F1F1] text-[16px] font-medium">
            We envision a future where Triimo is the leading platform that
            empowers businesses to connect seamlessly, bridging the gap between
            people and opportunities.
          </p>
        </div>
        <div ref={el => cardsRef.current[2] = el} className="flex flex-col gap-5 basis-auto lg:basis-[33%]">
          <h2 className="text-white text-[24px] font-semibold">Our Journey</h2>
          <p className="text-[#F1F1F1] text-[16px] font-medium">
            Triimo began with a simple idea: to make communication effortless
            for everyone. Since our founding in 2024, we've grown into a
            platform trusted by businesses worldwide, enabling millions of
            messages every day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsrunsSection;
