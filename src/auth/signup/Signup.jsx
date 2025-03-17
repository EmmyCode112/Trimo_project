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
    <>
      <div className="flex pr-[65px] max-lg:px-5 max-sm:py-5v relative justify-between">
        <div className="fixed h-full left-0 bottom-0 w-[404px] z-10 max-lg:hidden max-lg:w-0">
          <div className="h-full w-[404px] signin-right-con flex flex-col justify-end relative items-end max-lg:w-0">
            <img
              src={Icons.trimoDashboard}
              alt="Trimo Dashboard"
              className="object-center object-contain h-[560px] absolute bottom-[5%] right-0"
            />
          </div>
        </div>

        {!showOtpPopUp ? (
          <div className=" w-full overflow-y-auto flex flex-col signup-form-container basis-auto ml-[404px] max-lg:ml-0">
            {/* Sign in Section */}
            <div className="self-end flex gap-[10px] pt-[25px] items-center max-md:hidden ">
              <p className="font-[500] text-[16px] leading-[24px] text-[#767676]">
                Already have an account?
              </p>
              <Button
                label="Sign In"
                onClick={() => navigate("/sign-in")}
                className="hover:bg-[#eeeff0]"
              />
            </div>

            <div className="flex w-full h-full flex-col  max-sm:gap-[50px] ">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[43%] mx-auto auth-right-container mt-[50px] max-sm:mb-[130px]">
                  <div className="flex flex-col gap-8px mb-[12px] sign-up-text">
                    <h4 className="font-[600] text-[28px] tracking-[2px]">
                      Sign up to Get Started
                    </h4>
                    <p className="text-[#767676] font-[500] text-sm max-sm:mt-2">
                      Join TRIIMO! Let’s get you set up quickly so you can dive
                      right into discovering your next experience. Just a few
                      simple steps, and you’re in!
                    </p>
                  </div>
                  {/* Google Login */}
                  <div>
                    <Button
                      icon={Icons.googleSymbol}
                      label="Sign up with Google"
                      onClick={() => console.log("Google Login clicked")}
                      className="flex items-center gap-[8px] rounded-[8px] border border-[#E7E7E7] py-[12px] px-[20px] justify-center bg-[#eeeff0] w-full hover:bg-[#e7e7e7]"
                    />
                  </div>

                  <div className="flex justify-center mt-[10px]">
                    <p>or</p>
                  </div>

                  {/* form */}

                  <SignUpForm setShowOtpPopUp={setShowOtpPopUp} />

                  <div className="w-full block md:hidden text-center">
                    {/* Sign in Section */}
                    <div className="sm:self-end max-sm:mt-[40px] signInAccount self-center flex gap-[10px] pt-[25px] items-center justify-center">
                      <p className="font-[500] text-[16px] leading-[24px] text-[#767676]">
                        Already have an account?
                      </p>
                      <Button
                        label="Sign In"
                        onClick={() => navigate("/sign-in")}
                        className="hover:bg-[#eeeff0]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SignupOTP isClosedOtp={setShowOtpPopUp} />
        )}
      </div>
    </>
  );
};

export default Signup;
