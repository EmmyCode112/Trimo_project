import { useEffect } from "react";
import Hero from "../Components/Contacts/Hero";
import Form from "../Components/Contacts/Form";
import BookCall from "../Components/Contacts/BookCall";
import Subscribe from "../Components/Contacts/Subscribe";
const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Hero />
      <Form />
      <BookCall />
      <Subscribe />
    </div>
  );
};

export default ContactUs;
