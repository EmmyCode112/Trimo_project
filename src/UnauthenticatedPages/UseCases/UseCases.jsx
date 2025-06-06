import { images } from "../Components/assets/assets";
import Button from "@/Components/buttons/transparentButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UseCases = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const iconsRef = useRef([]);
  const listsRef = useRef([]);

  useEffect(() => {
    const animations = [];

    // Hero section animations
    if (heroRef.current) {
      // Create ripple effect
      const ripple = gsap.to(heroRef.current, {
        background: "linear-gradient(45deg, #CB1E33, #9A2444, #383268, #9A2444, #CB1E33)",
        backgroundSize: "400% 400%",
        duration: 15,
        repeat: -1,
        ease: "none",
      });
      animations.push(ripple);

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
              ease: "power2.out",
            })
          );
        });
      }

      // Animate subtitle with fade and slide
      if (subtitleRef.current) {
        animations.push(
          gsap.from(subtitleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: "power3.out",
          })
        );
      }
    }

    // Section animations
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        animations.push(
          gsap.from(section, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
            ease: "power3.out",
          })
        );
      }
    });

    // Image animations
    imagesRef.current.forEach((image, index) => {
      if (image) {
        animations.push(
          gsap.from(image, {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            scrollTrigger: {
              trigger: image,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
            ease: "power2.out",
          })
        );
      }
    });

    // Icon animations
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        animations.push(
          gsap.from(icon, {
            scale: 0,
            rotation: 360,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
          })
        );
      }
    });

    // List item animations
    listsRef.current.forEach((list, index) => {
      if (list) {
        const items = list.children;
        animations.push(
          gsap.from(items, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: list,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
            ease: "power2.out",
          })
        );
      }
    });

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
    <div>
      <div ref={heroRef} className="w-full flex flex-col gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center mt-[100px]">
        <h2 ref={titleRef} className="text-white font-semibold text-[48px] leading-[60px] lg:max-w-[60%]">
          Discover How TRIIMO Powers Your Communications
        </h2>
        <p ref={subtitleRef} className="text-[18px] font-medium text-white lg:max-w-[50%]">
          Explore real-world examples of how TRIIMO helps teams and businesses
          streamline messaging across multiple channels.
        </p>
      </div>
      <div className="flex flex-col py-[60px] gap-[47px]">
        <div ref={el => sectionsRef.current[0] = el} className="pl-[105px] flex items-center gap-[96px]">
          <div className="flex flex-col gap-8 lg:basis-[45%]">
            <div className="flex flex-col gap-6">
              <img
                ref={el => iconsRef.current[0] = el}
                src={images.emailIcon}
                alt="messages"
                className="w-[48px] h-[48px]"
                draggable="false"
              />

              <h1 className="text-[#3F3E3E] text-[24px] font-semibold">
                For Marketing Teams: Maximize Your Campaign Impact
              </h1>
              <p className="text-[#767676] text-[18px] font-normal">
                Triimo centralizes all your messaging needs, making it easy to
                create, schedule, and analyze multi-channel campaigns in one
                place.
              </p>
            </div>
            <ul ref={el => listsRef.current[0] = el} className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Personalize bulk messages with ease.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>
                  Track open rates, click rates, and engagement metrics.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>
                  Automate recurring campaigns for consistent outreach.
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:basis-[45%]">
            <img ref={el => imagesRef.current[0] = el} src={images.Desktop4} alt="desktop" draggable="false" />
          </div>
        </div>
        <div ref={el => sectionsRef.current[1] = el} className="pr-[105px] flex items-center gap-[96px]">
          <div className="lg:basis-[45%]">
            <img ref={el => imagesRef.current[1] = el} src={images.Desktop5} alt="desktop" draggable="false" />
          </div>
          <div className="flex flex-col gap-8 lg:basis-[45%]">
            <div className="flex flex-col gap-6">
              <img
                ref={el => iconsRef.current[1] = el}
                src={images.flash}
                alt="messages"
                className="w-[48px] h-[48px]"
                draggable="false"
              />

              <h1 className="text-[#3F3E3E] text-[24px] font-semibold">
                For Developers: Seamless API intergrrations
              </h1>
              <p className="text-[#767676] text-[18px] font-normal">
                Triimo offers RESTful api to send SMS, WhatsApp, email, OTPs
                with just few lines of code.
              </p>
            </div>
            <ul ref={el => listsRef.current[1] = el} className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Easy to follow API documentation</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Real-time delivery updates via webhooks.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Scalable for high-volume messaging.</span>
              </li>
            </ul>
          </div>
        </div>
        <div ref={el => sectionsRef.current[2] = el} className="pl-[105px] flex items-center gap-[96px]">
          <div className="flex flex-col gap-8 lg:basis-[45%]">
            <div className="flex flex-col gap-6">
              <img
                ref={el => iconsRef.current[2] = el}
                src={images.statIcon}
                alt="messages"
                className="w-[48px] h-[48px]"
                draggable="false"
              />

              <h1 className="text-[#3F3E3E] text-[24px] font-semibold">
                For Small to Medium Business: Engage Your Customers Better
              </h1>
              <p className="text-[#767676] text-[18px] font-normal">
                Triimo empowers businesses to manage customer communications
                through bulk messaging, automated workflows, and real-time
                analytics.
              </p>
            </div>
            <ul ref={el => listsRef.current[2] = el} className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Send promotional SMS and emails effortlessly.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Automate customers follow-ups and reminders.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" draggable="false" />
                <span>Use templates for quick and consistent messaging</span>
              </li>
            </ul>
          </div>
          <div className="lg:basis-[45%]">
            <img ref={el => imagesRef.current[2] = el} src={images.Desktop6} alt="desktop" draggable="false" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start gap-8 pt-[35px] px-[140px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-[8px] placeholder:text-[#A3A3A3] placeholder:text-[16px] text-[14px] w-[272px] outline-[#383268]"
          />
          <Button
            label="Subscribe"
            className="bg-[#383268] text-white rounded-[8px] px-[14px] py-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default UseCases;
