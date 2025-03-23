import { useState } from "react";
import "./Signup.css";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import SignupOTP from "./SignupOTP";
import SignUpForm from "./SignUpForm";

const Signup = () => {
  const navigate = useNavigate();
  const [showOtpPopUp, setShowOtpPopUp] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Left Section - Fixed and Hidden on Small Screens */}
      <div className="fixed left-0 bottom-0 h-full w-[404px] z-10 signin-right-con overflow-hidden max-lg:hidden">
        <div className="h-full w-full  flex flex-col justify-end items-end relative">
          <img
            src={Icons.trimoDashboard}
            alt="Trimo Dashboard"
            className="object-contain h-[560px] absolute bottom-[5%] right-0"
          />
        </div>
      </div>

      {/* Right Section - Form or OTP */}
      <div className="flex-1 flex flex-col overflow-y-auto ml-[404px] max-lg:ml-0 px-5 py-10">
        {!showOtpPopUp ? (
          <div className="w-full mx-auto">
            {/* Sign-in Section */}
            <div className="self-end flex justify-end gap-2 items-center max-md:hidden">
              <p className="text-gray-600 font-medium text-[16px]">
                Already have an account?
              </p>
              <Button
                label="Sign In"
                onClick={() => navigate("/sign-in")}
                className="hover:bg-gray-200"
              />
            </div>

            {/* Signup Content */}
            <div className="w-full md:w-[80%] mx-auto lg:w-[472px] mt-6">
              <h4 className="text-2xl font-semibold">Sign up to Get Started</h4>
              <p className="text-gray-600 mt-2 text-sm">
                Join TRIIMO! Let’s get you set up quickly so you can dive right
                into discovering your next experience.
              </p>
            </div>

            {/* Google Login */}
            <div className="mt-6 w-full md:w-[80%] mx-auto lg:w-[472px]">
              <Button
                icon={Icons.googleSymbol}
                label="Sign up with Google"
                onClick={() => console.log("Google Login clicked")}
                className="flex items-center gap-2 border border-gray-300 py-3 px-5 rounded-lg bg-gray-100 w-full hover:bg-gray-200 justify-center"
              />
            </div>

            <div className="text-center mt-4 text-gray-500">or</div>

            {/* Signup Form */}
            <div className="mt-6 w-full md:w-[80%] mx-auto lg:w-[472px]">
              <SignUpForm setShowOtpPopUp={setShowOtpPopUp} />
            </div>

            {/* Mobile Sign-in Section */}
            <div className="w-full block md:hidden text-center mt-6">
              <p className="text-gray-600 font-medium text-[16px]">
                Already have an account?
              </p>
              <Button
                label="Sign In"
                onClick={() => navigate("/sign-in")}
                className="hover:bg-gray-200"
              />
            </div>
          </div>
        ) : (
          <SignupOTP isClosedOtp={setShowOtpPopUp} />
        )}
      </div>
    </div>
  );
};

export default Signup;
