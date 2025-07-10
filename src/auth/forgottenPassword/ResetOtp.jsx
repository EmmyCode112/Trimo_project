import React, { useState, useEffect, useCallback } from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import OTPInput from "../../Components/Otp";
import NewPassword from "./NewPassword";
import api from "@/services/api";

const ResetOtp = ({ isClosedOtp, userEmail }) => {
  const [successfulOtp, setSuccessfulOtp] = useState(false);
  const [successResetPassword, setSuccessResetPassword] = useState(false);

  const OTP_EXPIRATION_DURATION = 10 * 60; // 600 seconds
  const [countdown, setCountdown] = useState(OTP_EXPIRATION_DURATION);
  const [otpSentInitially, setOtpSentInitially] = useState(true);

  const [error, setError] = useState("");
  // Granular loading states
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const navigate = useNavigate();

  // Effect for countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && otpSentInitially) {
      setError("OTP has expired. Please request a new one.");
    }
    return () => clearInterval(timer);
  }, [countdown, otpSentInitially]);

  // Function to handle resending OTP
  const resendOtp = useCallback(async () => {
    setIsResendingOtp(true); // Set specific loading state for resend
    setError("");
    try {
      const response = await api.post("/user/resend-otp", {
        email: userEmail,
      });

      console.log("Response from resend OTP API:", response);
      if (response.status === 200 || response.status === 201) {
        setCountdown(OTP_EXPIRATION_DURATION);
        setOtpSentInitially(true);
        console.log("OTP resent successfully!");
        setError("");
      } else {
        setError(
          response.data?.message || "Failed to resend OTP. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Could not resend OTP."
      );
      console.error("Error resending OTP:", err);
    } finally {
      setIsResendingOtp(false); // Reset specific loading state
    }
  }, [userEmail, OTP_EXPIRATION_DURATION]);

  // Function to submit OTP for verification
  const handleOtpSubmit = useCallback(
    async (submittedOtp) => {
      setIsVerifyingOtp(true); // Set specific loading state for verification
      setError("");

      if (countdown === 0 && otpSentInitially) {
        setError("OTP has expired. Please request a new one.");
        setIsVerifyingOtp(false); // Reset loading even if early exit
        return;
      }
      try {
        const response = await api.post("/user/verify-otp", {
          email: userEmail,
          otp: submittedOtp,
        });

        if (response.status === 200 || response.status === 201) {
          setSuccessfulOtp(true);
          console.log("OTP verified successfully!");
        } else {
          setError(response.data?.msg || "Incorrect OTP. Please try again.");
        }
      } catch (err) {
        setError(
          err.response?.data?.msg || "Network error. Could not verify OTP."
        );
        console.error("Error verifying OTP:", err);
      } finally {
        setIsVerifyingOtp(false); // Reset specific loading state
      }
    },
    [userEmail, countdown, otpSentInitially]
  );

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
            <OTPInput
              length={6}
              onSubmit={handleOtpSubmit}
              error={error}
              setError={setError}
              // OTP Input is disabled ONLY when verifying
              disabled={isVerifyingOtp || (countdown === 0 && otpSentInitially)}
            />
            {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
            <div className="flex items-center gap-3 mt-3">
              {countdown > 0 ? (
                <p className="text-[#484848] font-semibold">{`Resend OTP in ${Math.floor(
                  countdown / 60
                )
                  .toString()
                  .padStart(2, "0")}:${(countdown % 60)
                  .toString()
                  .padStart(2, "0")}`}</p>
              ) : (
                <button
                  className="px-[10px] py-[4px] border border-[#D0D5DD] rounded-[6px] bg-[#FAFAFA] text-[#484848] font-semibold disabled:opacity-50"
                  onClick={resendOtp}
                  disabled={isResendingOtp} // Disable resend button ONLY when resending
                >
                  {isResendingOtp ? "Resending..." : "Request New OTP"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {!successResetPassword ? (
            <NewPassword
              setSuccessResetPassword={setSuccessResetPassword}
              userEmail={userEmail}
            />
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
