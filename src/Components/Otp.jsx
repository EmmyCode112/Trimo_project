import React, { useState, useRef } from "react";

const OTPInput = ({ length = 6, onSubmit, error, setError }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [mask, setMask] = useState(new Array(length).fill(false));
  //   const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      setError("Only numeric values are allowed.");
      return;
    }

    setError(""); // Clear error on valid input
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Temporarily show the number
    const newMask = [...mask];
    newMask[index] = false;
    setMask(newMask);

    // After a short delay, mask the input
    setTimeout(() => {
      const updatedMask = [...mask];
      updatedMask[index] = true;
      setMask(updatedMask);
    }, 200);

    // Move to the next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Automatically submit if all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pasteData)) {
      setError("Only numeric values are allowed in the OTP.");
      return;
    }

    setError(""); // Clear error on valid paste
    const newOtp = pasteData.split("");
    setOtp([...newOtp, ...new Array(length - newOtp.length).fill("")]);
    const newMask = newOtp.map(() => false);
    setMask([...newMask, ...new Array(length - newMask.length).fill(true)]);
    newOtp.forEach((value, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = value;
      }
    });

    // Mask all inputs after a delay
    setTimeout(() => {
      setMask(new Array(length).fill(true));
    }, 500);

    // Automatically submit if all fields are filled
    if (newOtp.length === length) {
      onSubmit(newOtp.join(""));
    }
  };

  return (
    <div>
      <div className="flex gap-2" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type={mask[index] ? "password" : "text"}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`w-10 h-10 text-center border rounded outline-[#383268] ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default OTPInput;
