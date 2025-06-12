import { Icons } from "../../assets/assets";
import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import ResetOtp from "./ResetOtp";
import api from "@/services/api";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [showOtpPopUp, setShowOtpPopUp] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [loading, setLoading] = useState(false); // To prevent multiple submissions
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isFormFilled = email && validateEmail(email);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. **Client-side Validation FIRST**
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
      return; // Stop execution if validation fails
    }

    // Clear previous errors only after successful client-side validation
    setErrors({ email: "" });
    setLoading(true); // Start loading state only when proceeding to API call

    try {
      // 2. **API Call**
      const response = await api.post("/user/forgot-password", { email });

      // Assuming `api` is an Axios instance or similar that provides `status` and `data`
      // If it's a `fetch` wrapper, you might need `response.ok` and `await response.json()`
      if (response.status === 200) {
        // Or response.status >= 200 && response.status < 300 for general success
        setShowOtpPopUp(true); // Show OTP popup
        console.log("Password reset request sent successfully.");
      } else {
        // Handle non-200 but successful response (e.g., 400, 404, 500 from backend)
        // Assuming 'response.data' contains error message if 'api' is Axios
        const errorMessage =
          response.data?.message ||
          "Failed to send reset request. Please try again.";
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
        console.error(
          "Failed to send password reset request:",
          response.data || response
        );
      }
    } catch (error) {
      // 3. **Error Handling (Network errors, or non-2xx if `api` throws)**
      console.error("Error requesting password reset:", error);
      // Check if error has a response from server (e.g., Axios error.response)
      const errorMessage =
        error.response?.data?.msg ||
        "Error, please check your internet and try again.";
      setErrors((prev) => ({
        ...prev,
        email: errorMessage,
      }));
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-[100vh] overflow-hidden w-[100vw] pr-[65px] max-lg:px-5 max-sm:py-5">
      <div className="h-[100vh] w-[504px] signin-right-con flex flex-col justify-end relative items-end max-lg:hidden">
        <img
          src={Icons.trimoDashboard}
          alt="Trimo Dashboard"
          className="object-center object-contain h-[560px] absolute bottom-[5%] right-0"
        />
      </div>

      {/*  */}
      {!showOtpPopUp ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[40%] mx-auto right-container">
            <div className="flex flex-col gap-8px mb-[12px]">
              <h4 className="font-[600] text-[28px] tracking-[-2px]">
                Forgot Password
              </h4>
              <p className="text-[#767676] font-[500]">
                No worries! Just enter your registered email address, and we’ll
                help you reset your password.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-[6px] flex flex-col gap-[18px] mb-[20px]"
            >
              <label className="flex flex-col gap-[6px]">
                <p className="text-[14px] font-[500] text-[#1A1A1A]">Email</p>
                <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
                  <img src={Icons.smsIcon} alt="" className="signin-icons" />
                  <input
                    type="email"
                    className="w-full outline-none border-none"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!validateEmail(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "Invalid email format.",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-[#CB2315] text-sm font-normal">
                    {errors.email}
                  </p>
                )}
              </label>

              <Button
                label={loading ? "Sending..." : "Continue"}
                onClick={handleSubmit}
                disabled={!isFormFilled || loading}
                className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px] `}
              />
            </form>

            <p
              onClick={() => navigate("/sign-in")}
              className="cursor-pointer text-center"
            >
              Sign in Instead
            </p>
          </div>
        </div>
      ) : (
        <ResetOtp isClosedOtp={setShowOtpPopUp} />
      )}
    </div>
  );
};

export default PasswordReset;
