import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const testimonialData = [
  {
    id: 1,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "https://s3-alpha-sig.figma.com/img/504b/c691/102d8a6217d1fc1f8e79a810b1842a0d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IWMsKKAFiG0-VYxhgiAASfsctXEUzNHoCtDV2OjDcFCAvUgybB4P1n7DcnWWXm~9F5jJedSRhmNIZ5XQULGIKK1u79MTaM1GktFZFdyfpHAlr6G4gmEbFQT5cM3LF~FBrmfuXfG-yGoMORCbDehDOFqVrJKFKY7mCb4wWhcyYy4f8-v2DzdvoopbWCsEIlGEujqu9H-9XJB4Zr1J5tZ8g76pJy4A1aNkf6omR7GNLEuiMBMEPg-1cPFgiZZcl0F3fdC0g7uwvjmuj0ABIIRDsmtNdTpy6SYRwzAne-J4Q1tpHFSSmktNFo3pRIpv-5Y23dNUMgGBa4uAEPmAptPpCg__",
    companyLogo: "/Logomark.svg",
    companyName: "Sisyphus"
  },
  {
    id: 2,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "https://s3-alpha-sig.figma.com/img/504b/c691/102d8a6217d1fc1f8e79a810b1842a0d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IWMsKKAFiG0-VYxhgiAASfsctXEUzNHoCtDV2OjDcFCAvUgybB4P1n7DcnWWXm~9F5jJedSRhmNIZ5XQULGIKK1u79MTaM1GktFZFdyfpHAlr6G4gmEbFQT5cM3LF~FBrmfuXfG-yGoMORCbDehDOFqVrJKFKY7mCb4wWhcyYy4f8-v2DzdvoopbWCsEIlGEujqu9H-9XJB4Zr1J5tZ8g76pJy4A1aNkf6omR7GNLEuiMBMEPg-1cPFgiZZcl0F3fdC0g7uwvjmuj0ABIIRDsmtNdTpy6SYRwzAne-J4Q1tpHFSSmktNFo3pRIpv-5Y23dNUMgGBa4uAEPmAptPpCg__",
    companyLogo: "/Logomark.svg",
    companyName: "Sisyphus"
  },
  {
    id: 3,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "https://s3-alpha-sig.figma.com/img/504b/c691/102d8a6217d1fc1f8e79a810b1842a0d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IWMsKKAFiG0-VYxhgiAASfsctXEUzNHoCtDV2OjDcFCAvUgybB4P1n7DcnWWXm~9F5jJedSRhmNIZ5XQULGIKK1u79MTaM1GktFZFdyfpHAlr6G4gmEbFQT5cM3LF~FBrmfuXfG-yGoMORCbDehDOFqVrJKFKY7mCb4wWhcyYy4f8-v2DzdvoopbWCsEIlGEujqu9H-9XJB4Zr1J5tZ8g76pJy4A1aNkf6omR7GNLEuiMBMEPg-1cPFgiZZcl0F3fdC0g7uwvjmuj0ABIIRDsmtNdTpy6SYRwzAne-J4Q1tpHFSSmktNFo3pRIpv-5Y23dNUMgGBa4uAEPmAptPpCg__",
    companyLogo: "/Logomark.svg",
    companyName: "Sisyphus"
  },
  {
    id: 4,
    text: "We've been using Triimo to kick start every new project and can't imagine working without it.",
    name: "Candice Wu",
    role: "Product Manager, Sisyphus",
    avatar: "https://s3-alpha-sig.figma.com/img/504b/c691/102d8a6217d1fc1f8e79a810b1842a0d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IWMsKKAFiG0-VYxhgiAASfsctXEUzNHoCtDV2OjDcFCAvUgybB4P1n7DcnWWXm~9F5jJedSRhmNIZ5XQULGIKK1u79MTaM1GktFZFdyfpHAlr6G4gmEbFQT5cM3LF~FBrmfuXfG-yGoMORCbDehDOFqVrJKFKY7mCb4wWhcyYy4f8-v2DzdvoopbWCsEIlGEujqu9H-9XJB4Zr1J5tZ8g76pJy4A1aNkf6omR7GNLEuiMBMEPg-1cPFgiZZcl0F3fdC0g7uwvjmuj0ABIIRDsmtNdTpy6SYRwzAne-J4Q1tpHFSSmktNFo3pRIpv-5Y23dNUMgGBa4uAEPmAptPpCg__",
    companyLogo: "/Logomark.svg",
    companyName: "Sisyphus"
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
            >
              {/* create an inset that takes full screen and width of this curent contaier with an ovelay shadlw */}
              <div className="absolute inset-0 opacity-[5%]" style={{
                backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/697d/e512/16ce0de0fa05e8dd9f50b003a4ff72e9?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sQ7se8oJkB2X6eOY5fEDaeN4lKIya~y~6em12n9nL0yjON7NFefKFe0deumHx8DN6tAAWUR0MVKu9JSXaIqeSM9ticROAgPYw1F5SC7RkCWr0w15AaGDGSFnF9yFBNKKSnLRLxjNgbrCnXy~IyqonjpRqxS2FnZgJxn~KAiMwbv3zISbf-x6L6inOhHXoRLBYFQ8bHrET9qcVqp6Dh5zPvwfLYHmmuK4JCVtdGnYoGNhYPUDwqEG5zf3Upqij~UT3lYaOlwkdBpeaTMPQem~pTfryuh8puv8hPfYHLWsbgHtmWzV0XQORd~TXANT4eeUoC0QTLFkhLxfXoFV9HmyEg__")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                backgroundOpacity: '0.3'
              }}></div>
              <p className="text-xl leading-[30px] font-medium mb-16 max-w-[450px]">
                {testimonial.text}
              </p>
              
              <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-lg">{testimonial.name}</p>
                  <p className="text-[#F1F1F1] text-[16px]">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="absolute w-[140px] h-[40px] bottom-8 flex items-center gap-3 right-8">
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
