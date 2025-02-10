import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/authSlice";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const userData = { email }; // You can modify this as needed
    Cookies.set("authToken", "dummyAuthToken", { expires: 7 });
    dispatch(loginSuccess(userData));
    navigate("/");
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const isFormFilled =
    email && password && validateEmail(email) && validatePassword(password);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
    }

    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long.",
      }));
    }

    if (validateEmail(email) && validatePassword(password)) {
      setErrors({ email: "", password: "" });
      handleLogin();
    }
  };

  return (
    <div className="flex h-[100vh] overflow-hidden w-[100vw] pr-[65px] max-lg:px-5 max-sm:py-5">
      <div className="h-[100vh] w-[504px] signin-right-con flex flex-col justify-end relative items-end max-lg:hidden">
        <img
          src={Icons.trimoDashboard}
          alt="Trimo Dashboard"
          className="object-center object-contain h-[560px] absolute bottom-[5%] right-0"
        />
      </div>
      <div className="flex w-full flex-col max-sm:flex-col-reverse">
        <div className="sm:self-end max-sm:mt-[40px] signInAccount self-center flex gap-[10px] pt-[25px] items-center ">
          <p className="font-[500] text-[16px] leading-[24px] text-[#767676]">
            I don’t have an account
          </p>
          <Button
            label="Sign Up"
            onClick={() => navigate("/signup")}
            className="hover:bg-[#eeeff0]"
          />
        </div>

        <div className="w-full h-full flex items-center justify-center max-sm:mt-[-30px]">
          <div className="w-[43%] mx-auto right-container">
            <div className="flex flex-col gap-8px mb-[12px] max-sm:mb-[16px]">
              <h4 className="font-[600] text-[28px] tracking-[2px]">
                Welcome Back to TRIIMO!
              </h4>
              <p className="text-[#767676] font-[500] max-sm:mt-2">
                Please log in to continue building your journey with us.
              </p>
            </div>

            <div>
              <Button
                icon={Icons.googleSymbol}
                label="Google"
                onClick={() => console.log("Google Login clicked")}
                className="flex items-center gap-[8px] rounded-[8px] border border-[#E7E7E7] py-[12px] px-[20px] justify-center bg-[#eeeff0]  w-full hover:bg-[#e7e7e7]"
              />
            </div>
            <div className="flex justify-center mt-[10px]">
              <p>or</p>
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
                    placeholder="example@gmail.com"
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

              <label className="flex flex-col gap-[6px]">
                <p className="text-[14px] font-[500] text-[#1A1A1A]">
                  Password
                </p>
                <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
                  <img src={Icons.key} alt="" className="signin-icons" />
                  <input
                    className="w-full outline-none border-none"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (!validatePassword(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          password:
                            "Password must be at least 8 characters long.",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }
                    }}
                  />
                  <img
                    src={Icons.eyeOpen}
                    alt="Toggle Password Visibility"
                    className="signin-icons cursor-pointer"
                    onClick={handleTogglePassword}
                  />
                </div>
                {errors.password && (
                  <p className="text-[#CB2315] text-sm font-normal">
                    {errors.password}
                  </p>
                )}
              </label>

              <div>
                <Button
                  label="Sign in"
                  onClick={handleSubmit}
                  disabled={!isFormFilled}
                  className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px] `}
                />
              </div>
            </form>

            <div className="flex text-[14px] gap-[6px] items-center flex-wrap justify-center">
              <p className="text-[#767676] font-[500]">
                Can’t remember your password?
              </p>
              <div>
                <Button
                  label="Reset Password"
                  onClick={() => navigate("/reset-password")}
                  className="hover:bg-[#eeeff0]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
