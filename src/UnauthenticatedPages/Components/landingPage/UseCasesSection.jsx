import Button from "@/Components/buttons/transparentButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const UseCasesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Animate the badge with a bounce effect
    if (badgeRef.current) {
      animations.push(
        gsap.from(badgeRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "bounce.out",
        })
      );
    }

    // Animate the title with a slide and fade
    if (titleRef.current) {
      animations.push(
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        })
      );
    }

    // Animate the cards with a special effect
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      animations.push(
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          delay: 0.5,
          ease: "power3.out",
          onComplete: () => {
            // Add a subtle hover effect to each card
            cards.forEach(card => {
              gsap.to(card, {
                y: -5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
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
    <div ref={sectionRef} className="mt-[60px] px-[25px] sm:px-[45px] lg:px-[65px]">
      <div className="flex flex-col gap-[14px]">
        <p ref={badgeRef} className="bg-[#EBEBF099] rounded-full py-2 px-[10px] text-[#484848] text-[14px] font-normal w-[143px] mx-auto flex justify-center">
          Use Cases Section
        </p>
        <h2 ref={titleRef} className="text-[#1A1A1A] text-[32px] font-bold max-sm:text-[22px] text-center">
          Triimo works for your team.
        </h2>
      </div>

      <div ref={cardsRef} className="flex justify-between gap-5 lg:gap-x-[50px] gap-y-[25px] max-sm:flex-col max-lg:flex-wrap w-full bg-[#FAFAFA] rounded-[20px] mt-[36px]">
        <div className="flex flex-col py-[38px] px-[30px] lg:w-[350px]">
          <h3 className="text-[20px] text-[#484848] font-semibold mb-2">
            Marketings Teams
          </h3>
          <p className="text-[#484848] mb-4">
            They need to send promotional campaigns via SMS, email, and
            WhatsApp, and analyze delivery rates and engagement metrics.
          </p>
          <Button
            label="See More"
            className="text-[#344054] hover:bg-[#383268] hover:text-white border-[#D0D5DD] py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] w-[107px]"
          />
        </div>
        <div className="flex flex-col py-[38px] px-[30px] lg:w-[350px]">
          <h3 className="text-[20px] text-[#484848] font-semibold mb-2">
            Developers
          </h3>
          <p className="text-[#484848] mb-4">
            They want API access to integrate messaging services with their own
            applications and websites.
          </p>
          <Button
            label="See More"
            className="text-[#344054] hover:bg-[#383268] hover:text-white border-[#D0D5DD] py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] w-[107px]"
          />
        </div>
        <div className="flex flex-col py-[38px] px-[30px] lg:w-[350px]">
          <h3 className="text-[20px] text-[#484848] font-semibold mb-2">
            Customer Support Teams
          </h3>
          <p className="text-[#484848] mb-4">
            They need to send automated messages and OTPs for customer
            verification or transactional updates.
          </p>
          <Button
            label="See More"
            className="text-[#344054] hover:bg-[#383268] hover:text-white border-[#D0D5DD] py-[10px] px-[18px] rounded-[8px] cursor-pointer text-[15px] w-[107px]"
          />
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;
