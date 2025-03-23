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
        <h2 className="text-[32px] text-[#101828] font-semibold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-[20px] text-[#767676] mb-12">
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
                <AccordionTrigger className="flex justify-between text-[#3F3E3E] font-medium text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#767676] text-[16px] pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-20 bg-[#FAFAFA] rounded-2xl p-8 max-w-[1216px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex -space-x-4 mb-6">
              <Avatar className="w-14 bg-[#ABB677] h-14">
                <AvatarImage src="https://s3-alpha-sig.figma.com/img/74c6/0f24/857ed03c48e8a06aff8d4bced17c0656?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F9t7ZZd5M-a43Ijj-6hWwe0i9sLyxDIRtM0EfC6WtrN1ABRCeMwDLEePvLXM1TeJyR92HnFnCZgvfo9nOBps3vzuDHoeBG1g7CBnHSa-bqd42hcSaTs8sL4aEFwJ-HTAOpluiUkqmEx59sntIMFYrzesYHfQ~N6fqmCL~ddeEfT-H0Pet1Owg9ZT-Ikx2MKS99UrEskcQKUuHSrYQpFzcDWXoVI02ig0fJ946f4jDJQSGi3UJ91UeXuSih2p~4Vsas1fuOXao~0dQ7MDO~ZEjh7JTUexBtDIC4-1r6goDa4DYHr2yJNsRw-IQzTPTQM49EBKW0KlZaYFAfIk3-~EWQ__" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 bg-[#C7B9DA] border-white w-16 h-16 z-10">
                <AvatarImage src="https://s3-alpha-sig.figma.com/img/2f11/9087/0d753151f58657595136f67c584b5c8c?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZEZEeIVfviJoey6J~PiJbjPrK6qtJseOqdkTRVL-XwHlQi9mMjwtegcVgnIqWj0CNoF163z2Pao0O4VSm9Kv9syu~e-0gP5ul18pArR3~sE0fNGFuIK6Td66BuVVbRkkByy3JP0GAsmaRSe50FVCGuA53poOSIePuW-yVeTtueugc-vyD53vYwYzKpkG3PU6BkNeMoKgDshQWwtI5WX15yXOT6Y8f44acI6F3GNuJAAo0gsoiCBsBAd7J3~lkXhWUusOfPZSXSr5oI2L~jeQg-DjyGwYy1nNck2mCbU67WiLU19nDC58sniFvOdNbAzaUwE1BLGzxcSWEwnLnPSs2w__" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-14 h-14 bg-[#D9B9BB]">
                <AvatarImage src="https://s3-alpha-sig.figma.com/img/f8b5/1203/5a2e42c8ec0c92cd29eb940180f4d6b5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gw4r6OeUao~MPj15-kIs4YpSRO0-pCNrKsyed8LEcMp1CYCOcteLds1gMjQGza-Tm7JyF8-PBt3DuOV5taQm6bRXcWlErUF-fo1peV3UytPkKnTsGL4L5HVsZixrrnkAJNig8JS~VGdWEwZsL-Ap8OtjQRcRXOdJkEt0Y8mjiqxJ-pusCcVGF-v8iQKMngxwIZOx2-I8yFtkXSHD~HmnBVc8uDY2Sd1gIDrSJc~WMeAM8A0Gs4YBriIEZ9P~OjhfQ73TY7LlmhE4G4VMIUq6zAhUDUX63n40TNQ5TUwjKiA1yQinoiXzN2TFod5~4zJ80EOjDrYLU765X7kCkBgl7A__" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-2xl text-[#3F3E3E] font-semibold mb-2">Still have questions?</h3>
            <p className="text-[#767676] text-[18px] mb-6">
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
