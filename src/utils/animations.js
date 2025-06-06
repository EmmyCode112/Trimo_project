import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fade in animation
export const fadeIn = (element, delay = 0) => {
  if (!element) return;
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 1,
    delay,
    ease: 'power3.out',
    clearProps: 'all', // Clear all properties after animation
  });
};

// Slide in from left
export const slideInLeft = (element, delay = 0) => {
  if (!element) return;
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    clearProps: 'all',
  });
};

// Slide in from right
export const slideInRight = (element, delay = 0) => {
  if (!element) return;
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    clearProps: 'all',
  });
};

// Scale up animation
export const scaleUp = (element, delay = 0) => {
  if (!element) return;
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    clearProps: 'all',
  });
};

// Stagger children animation
export const staggerChildren = (parent, children, delay = 0) => {
  if (!parent || !children) return;
  return gsap.from(children, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      markers: false,
    },
    clearProps: 'all',
  });
};

// Typing animation
export const typingAnimation = (element, delay = 0) => {
  if (!element) return;
  const text = element.textContent;
  element.textContent = '';
  
  return gsap.to(element, {
    duration: 2,
    delay,
    ease: 'power3.out',
    onStart: () => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text[i];
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    },
    clearProps: 'all',
  });
};

// Scroll-triggered animation
export const scrollTriggerAnimation = (element, animation, trigger = element) => {
  if (!element) return;
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      markers: false,
    },
    clearProps: 'all',
  });
};

// Cleanup function to kill all ScrollTrigger instances
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Initialize animations with proper cleanup
export const initAnimations = (element, animation, options = {}) => {
  if (!element) return;
  
  // Kill any existing animations
  gsap.killTweensOf(element);
  
  // Apply the animation
  const anim = gsap.from(element, {
    ...animation,
    ...options,
    clearProps: 'all',
  });
  
  return anim;
}; 