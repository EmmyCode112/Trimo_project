import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Plus, Minus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const faqData = [
  {
    question: "What messaging channels does Triimo support?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
  },
  {
    question: "Can I try Triimo for free?",
    answer: "Yes, Triimo offers a 30-day free trial with full access to all features. No credit card required to start your trial."
  },
  {
    question: "How secure is the platform?",
    answer: "Triimo employs enterprise-grade security measures including end-to-end encryption, regular security audits, and complies with SOC 2, GDPR, and other industry standards."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Everything you need to know about the product and billing.
        </p>
        
        <div className="w-full max-w-[768px] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-t border-[#EAECF0] py-4 last:border-b"
              >
                <AccordionTrigger className="flex justify-between font-medium text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-20 bg-[#FAFAFA] rounded-2xl p-8 max-w-[1216px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex -space-x-4 mb-6">
              <Avatar className="border-2 border-white w-14 h-14">
                <AvatarImage src="/lovable-uploads/d1a5f4c7-7c6a-4516-b2b7-ac47760e3900.png" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white w-16 h-16 z-10">
                <AvatarImage src="/lovable-uploads/d1a5f4c7-7c6a-4516-b2b7-ac47760e3900.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white w-14 h-14">
                <AvatarImage src="/lovable-uploads/d1a5f4c7-7c6a-4516-b2b7-ac47760e3900.png" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <button className="bg-[#383268] text-white px-6 py-3 rounded-md font-medium">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
