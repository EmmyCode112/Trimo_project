import { images } from "../../Components/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const CommunicationSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 px-6 md:px-16 lg:px-24 py-16">
      {/* Left Text Section */}
      <div className="max-w-lg text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
          Empowering Communication Through Technology
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          TRIIMO is revolutionizing business communication by providing a
          unified platform for all your messaging needs—from SMS and WhatsApp to
          email and OTP verification.
        </p>
      </div>

      {/* Right Image Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <img
          src={images.person1}
          alt="Person 1"
          className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg"
        />
        <img
          src={images.person2}
          alt="Person 2"
          className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg"
        />
        <img
          src={images.person3}
          alt="Person 3"
          className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg"
        />
        <img
          src={images.person4}
          alt="Person 4"
          className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg"
        />
        <img
          src={images.person5}
          alt="Person 5"
          className="w-28 md:w-32 lg:w-36 h-auto rounded-xl shadow-lg col-span-2 mx-auto"
        />
      </div>
    </section>
  );
};

export default CommunicationSection;
