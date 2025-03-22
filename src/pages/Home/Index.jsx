import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import UseCasesSection from '@/components/UsecasesSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowTriimoWorksSection from '@/components/HowTriimoWorksSection';
import CodeDemoSection from '@/components/CodeDemoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import SubscriptionSection from '@/components/SubscriptionSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Create a smooth scroll effect for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the fade-up class
    document.querySelectorAll('.fade-up').forEach(element => {
      observer.observe(element);
    });

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <UseCasesSection />
        <FeaturesSection />
        <CodeDemoSection />
        <HowTriimoWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;