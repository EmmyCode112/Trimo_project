import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, MessageSquare, BarChart } from 'lucide-react';

const UseCasesPage = () => {
  // Intersection Observer for animations
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section
        className="w-full h-[504px] mt-20 flex items-center justify-center"
        style={{
          background: 'linear-gradient(91deg, #CB1E33 0.63%, #9A2444 32.82%, #692B56 69.69%, #383268 98.95%)'
        }}
      >
        <div className="max-w-[773px] mx-auto px-4 text-center">
          <h1 className="font-semibold text-5xl leading-[60px] tracking-tight text-white mb-6">
            Discover How TRIIMO Powers Your Communications
          </h1>
          <p className="text-white text-[18px] max-w-[621px] mx-auto">
            Explore real-world examples of how TRIIMO helps teams and businesses 
            streamline messaging across multiple channels.
          </p>
        </div>
      </section>

      {/* Use Case 1: Marketing Teams */}
      <section className="py-20">
        <div className="max-w-[1215px] mx-auto px-4 flex flex-col md:flex-row items-center gap-[58px]">
          <div className="w-full md:w-1/2 fade-up">
            <div className="relative">
              <div className="w-12 h-12 rounded-[28px] bg-[#F4D4B0] border-8 border-[#FBF1E6] flex items-center justify-center mb-6 ripple-effect">
                <MessageSquare className="w-5 h-5 text-[#CB1E33]" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">For Marketing Teams: Maximize Your Campaign Impact</h2>
              <p className="text-gray-600 mb-6">
                Triimo centralizes all your messaging needs, making it easy to create, 
                schedule, and analyze multi-channel campaigns in one place.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Personalize bulk messages with ease.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Track open rates, click rates, and engagement metrics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Automate recurring campaigns for consistent outreach.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 fade-up relative">
            <div className="w-[560px] h-[512px] relative">
              <img 
                src="/campaign.svg" 
                alt="Marketing Campaign Dashboard" 
                className="w-[560px] h-[512px] object-cover rounded-[10px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Case 2: Developers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1215px] mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-[58px]">
          <div className="w-full md:w-1/2 fade-up">
            <div className="relative">
              <div className="w-12 h-12 rounded-[28px] bg-[#F4D4B0] border-8 border-[#FBF1E6] flex items-center justify-center mb-6 ripple-effect">
                <Zap className="w-5 h-5 text-[#CB1E33]" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">For Developers: Seamless API Integrations</h2>
              <p className="text-gray-600 mb-6">
                Triimo offers RESTful APIs to send SMS, WhatsApp, emails, and OTPs with just a few lines of code.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Easy-to-follow API documentation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Real-time delivery updates via webhooks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Scalable for high-volume messaging.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 fade-up relative">
            <div className="w-[560px] h-[512px] relative">
              <img 
                src="/lovable-uploads/13d011da-3acc-4be0-873a-ddd83f9ec2f9.png" 
                alt="API Documentation" 
                className="w-[560px] h-[512px] object-cover rounded-[10px] border-2 border-[#383268]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Case 3: Small to Medium Businesses */}
      <section className="py-20">
        <div className="max-w-[1215px] mx-auto px-4 flex flex-col md:flex-row items-center gap-[58px]">
          <div className="w-full md:w-1/2 fade-up">
            <div className="relative">
              <div className="w-12 h-12 rounded-[28px] bg-[#F4D4B0] border-8 border-[#FBF1E6] flex items-center justify-center mb-6 ripple-effect">
                <BarChart className="w-5 h-5 text-[#CB1E33]" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">For Small to Medium Businesses: Engage Your Customers Better</h2>
              <p className="text-gray-600 mb-6">
                Triimo empowers businesses to manage customer communications through bulk messaging, 
                automated workflows, and real-time analytics.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Send promotional SMS and emails effortlessly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Automate customer follow-ups and reminders.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FBF1E6] flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#CB1E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Use templates for quick and consistent messaging.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 fade-up relative">
            <div className="w-[560px] h-[512px] relative">
              <img 
                src="/lovable-uploads/6b6f5846-c01c-4876-b51a-61155489c955.png" 
                alt="Customer Messaging Dashboard" 
                className="w-[560px] h-[512px] object-cover rounded-[10px] border-2 border-[#383268]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1216px] mx-auto px-4">
          <div className="w-full p-8 bg-[#FAFAFA] rounded-[16px] flex flex-col items-center text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Messaging?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Join thousands of businesses that use Triimo to streamline their communication channels 
              and engage customers more effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/signup" 
                className="px-6 py-3 bg-[#383268] text-white rounded-lg font-medium transition-colors hover:bg-[#2e295a]"
              >
                Start Free Trial
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 border border-[#C1BFD0] rounded-lg font-medium transition-colors hover:bg-gray-50"
              >
                Request Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .ripple-effect {
          position: relative;
        }
        
        .ripple-effect:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(244, 212, 176, 0.3);
          transform: translate(-50%, -50%) scale(1);
          animation: ripple 2s infinite;
        }
        
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default UseCasesPage;