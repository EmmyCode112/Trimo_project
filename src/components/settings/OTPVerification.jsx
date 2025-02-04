import { useState, useEffect, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import SuccessAlert from "@/components/Alerts/SuccessAlert"

const OTPVerification = ({ type, onBack, onVerify, initialTimer = 60 }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(initialTimer)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  useEffect(() => {
    setOtp(["", "", "", "", "", ""])
  }, [])

  const handleChange = (index, value) => {
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto advance
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    // Check if OTP is complete
    if (index === 5 && value !== "") {
      const otpValue = newOtp.join("")
      if (otpValue.length === 6) {
        setOtp(["", "", "", "", "", ""])
        handleVerify(otpValue)
      }
    }
  }

  const handleVerify = async (otpValue) => {
    setShowSuccess(true)
    // Wait for toast to show before proceeding
    setTimeout(() => {
      setShowSuccess(false)
      onVerify(otpValue)
    }, 1500)
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp]
      pastedData.split("").forEach((char, index) => {
        if (index < 6) newOtp[index] = char
      })
      setOtp(newOtp)
      if (pastedData.length === 6) {
        handleVerify(pastedData)
      }
    }
  }

  return (
    <div className="p-6">
      {showSuccess && (
        <SuccessAlert
          message={`${type === "email" ? "Email Address" : "Phone number"} updated successfully!`}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <button onClick={onBack} className="flex w-[126px] h-[44px] rounded-[52px] text-[#1A1A1A] items-center justify-center label bg-[#FAFAFA] mb-6 hover:text-gray-900">
        <ArrowLeft className="w-[20px] h-[20px] text-[#A3A3A3] mr-2" />
        Go Back
      </button>

      <h2 className="text-2xl font-bold mb-3">Account Verification</h2>
      <p className="text-[#767676] mb-6">
        We've sent a verification code to your {type === "email" ? "email" : "phone number"}. Please enter the code to verify.
      </p>

      <div className="mb-2">
        <label className="label">
          {type === "email" ? "Email" : "Phone Number"} Verification
        </label>
      </div>

      <div className="flex gap-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-[64px] h-[57px] text-center border border-[#D0D5DD] rounded-[9px] focus:border-[#383268] focus:ring-1 focus:ring-[#383268] outline-none text-lg"
          />
        ))}
      </div>

      <div className="text-sm flex items-center gap-2 text-[#767676]">
        ETA: <span className="font-medium w-[63px] h-[28px] flex items-center justify-center border border-[#D0D5DD] bg-[#FAFAFA] rounded-[6px] label text-[#344054]">{timer} sec</span>
      </div>
    </div>
  )
}

export default OTPVerification