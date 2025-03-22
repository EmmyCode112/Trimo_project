import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const testimonialData = [
  {
    id: 1,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "/lovable-uploads/55d837a3-cdd9-4580-8c9b-1248024c3385.png",
    companyLogo: "/lovable-uploads/79677502-8182-4bcc-ad56-f2e751acef2b.png"
  },
  {
    id: 2,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "/lovable-uploads/55d837a3-cdd9-4580-8c9b-1248024c3385.png",
    companyLogo: "/lovable-uploads/79677502-8182-4bcc-ad56-f2e751acef2b.png"
  },
  {
    id: 3,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "/lovable-uploads/55d837a3-cdd9-4580-8c9b-1248024c3385.png",
    companyLogo: "/lovable-uploads/79677502-8182-4bcc-ad56-f2e751acef2b.png"
  },
  {
    id: 4,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "/lovable-uploads/55d837a3-cdd9-4580-8c9b-1248024c3385.png",
    companyLogo: "/lovable-uploads/79677502-8182-4bcc-ad56-f2e751acef2b.png"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#383268] text-white">
      <div className="max-w-[1211px] mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold tracking-tight leading-[48px] mb-16 font-general">
          What Our Customers Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonialData.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-[#6969694D] rounded-[15px] p-8 relative h-[338px] fade-up"
              style={{
                backgroundImage: 'url("/lovable-uploads/90974422-7413-4b9b-97b1-4c6d507e7668.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
              }}
            >
              <p className="text-xl leading-[30px] font-medium mb-16 max-w-[450px]">
                {testimonial.text}
              </p>
              
              <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-gray-200">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8">
                <img 
                  src={testimonial.companyLogo} 
                  alt="Sisyphus" 
                  className="h-10 w-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
