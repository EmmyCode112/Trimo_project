import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({ value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [countryCode, setCountryCode] = useState("ng"); // Default country

  const handlePhoneChange = (phone, countryData) => {
    setPhoneNumber(phone);
    setCountryCode(countryData.countryCode); // Update country code when country changes
    onChange(phone);
  };

  return (
    <PhoneInput
      country={countryCode} // Dynamically update country
      value={phoneNumber}
      onChange={handlePhoneChange}
      enableSearch={true} // Add search box for countries
      disableCountryCode={false} // Allow users to see the country code
      disableDropdown={false} // Allow users to change the country
      inputStyle={{ width: "100%", height: "40px", paddingLeft: "50px" }}
      containerStyle={{ width: "100%" }}
    />
  );
};

export default PhoneNumberInput;
