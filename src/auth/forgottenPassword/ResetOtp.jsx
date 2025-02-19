import React, { useState, useEffect } from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import OTPInput from "../../Components/Otp";
import NewPassword from "./NewPassword";

const ResetOtp = ({ isClosedOtp }) => {
  const [successfulOtp, setSuccessfulOtp] = useState(false);
  const [successResetPassword, setSuccessResetPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60); // Start at 60 seconds
  const [otpRequested, setOtpRequested] = useState(false);
  const [error, setError] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (otpRequested && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on component unmount
    }
  }, [otpRequested, countdown]);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random OTP
    setOtp(newOtp);
    console.log("Generated OTP:", newOtp); // For debugging, remove in production
    setCountdown(60); // Reset countdown
    setOtpRequested(true);
  };

  const handleOtpSubmit = (submittedOtp) => {
    console.log("Submitted OTP:", submittedOtp);
    if (submittedOtp === otp) {
      setSuccessfulOtp(true);
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="bg-white w-full flex items-center justify-center">
      {!successfulOtp ? (
        <div className="w-[40%] mx-auto gap-[22px] flex flex-col auth-right-container">
          <Button
            onClick={() => isClosedOtp(false)}
            label="Go Back"
            icon={Icons.arrowLeft}
            className={"flex hover:bg-[#eeeff0] items-center self-start"}
          />
          <div>
            <h4 className="font-[600] text-[28px] tracking-[-2px]">
              Account Verification
            </h4>
            <p className="text-[#767676] font-[500]">
              We’ve sent a verification code to your phone and a link to your
              email. Let’s secure your account!
            </p>
          </div>
          <div>
            <p className="text-[14px] font-medium">Email Verification</p>
            <OTPInput length={6} onSubmit={handleOtpSubmit} error={error} setError={setError}/>
            <div className="flex items-center gap-3 mt-3">
              {otpRequested ? (
                countdown > 0 ? (
                  <p>{`Resend OTP in ${countdown}s`}</p>
                ) : (
                  <button
                    className="px-[10px] py-[4px] border border-[#D0D5DD] rounded-[6px] bg-[#FAFAFA] text-[#484848] font-semibold"
                    onClick={generateOtp}
                  >
                    Request New OTP
                  </button>
                )
              ) : (
                <button
                  className="px-[10px] py-[4px] border border-[#D0D5DD] rounded-[6px] bg-[#FAFAFA] text-[#484848] font-semibold"
                  onClick={generateOtp}
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {!successResetPassword ? (
            <><NewPassword/></>
          ) : (
            <div className="w-[40%] mx-auto gap-[22px] flex flex-col">
              <div className="w-full flex justify-center">
                <img
                  src={Icons.successIcon}
                  alt="successful"
                  className="w-[80px] h-[80px mx-auto]"
                />
              </div>
              <div>
                <h4 className="font-[600] text-[28px] tracking-[-2px] text-center">
                  Account Reset Successful
                </h4>
                <p className="text-[#767676] font-[500] text-center">
                  {`Your password has been updated! You’re all set to log back in.`}
                </p>
              </div>
              <Button
                label="Proceed to Log in"
                onClick={() => navigate("/sign-in")}
                className="bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px]"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResetOtp;
