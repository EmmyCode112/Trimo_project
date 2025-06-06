import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/Components/buttons/transparentButton";

gsap.registerPlugin(ScrollTrigger);

const Subscribe = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Animate title with typing effect
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
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            }
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
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 80%',
          }
        })
      );
    }

    // Animate input and button
    if (inputRef.current && buttonRef.current) {
      animations.push(
        gsap.from([inputRef.current, buttonRef.current], {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: inputRef.current,
            start: 'top 85%',
          }
        })
      );

      // Add hover animation to button
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      // Add focus animation to input
      inputRef.current.addEventListener('focus', () => {
        gsap.to(inputRef.current, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      inputRef.current.addEventListener('blur', () => {
        gsap.to(inputRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="pt-[96px] lg:px-[140px] px-6 md:px-16">
      <div className="flex justify-between items-start gap-8 max-md:flex-wrap">
        <div className="flex flex-col gap-2">
          <h2 ref={titleRef} className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p ref={subtitleRef}>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap max-sm:w-full">
          <input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-[8px] placeholder:text-[#A3A3A3] placeholder:text-[16px] text-[14px] w-[272px] outline-[#383268]"
          />
          <Button
            ref={buttonRef}
            label="Subscribe"
            className="bg-[#383268] text-white rounded-[8px] px-[14px] py-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
