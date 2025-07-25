import React, { useState } from "react"; // Changed import to React
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/authSlice";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
// import "@/App.css"; // Commented out or remove if not needed

const Signin = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });
    setLoading(true);

    let formIsValid = true;
    const newErrors = { email: "", password: "", general: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
      formIsValid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long.";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // ----------------------------------------------------
      // FIX STARTS HERE
      // Instead of URLSearchParams, create a plain JavaScript object
      // and stringify it to JSON.
      const requestBody = {
        email: email,
        password: password,
      };

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This header is correct
        },
        body: JSON.stringify(requestBody), // <--- Send JSON string
      });
      // FIX ENDS HERE
      // ----------------------------------------------------

      let data = {};
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError);
        // Handle cases where response is not valid JSON, e.g., HTML 404 page
        if (!response.ok) {
          newErrors.general = `Server error (${
            response.status
          }): ${"An unexpected error occurred."}`;
          setErrors(newErrors);
          setLoading(false);
          return;
        }
      }

      console.log("response", response);
      if (data.err_msg === "Verify to activate account!") {
        navigate("/signup");
        setLoading(false);
        return;
      }
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("access token", data.accessToken);
        // Store complete user details in localStorage
        localStorage.setItem("userDetails", JSON.stringify(data.userDetails));
        
        const userData = {
          ...data.userDetails, // Store all user details
          accessToken: data.accessToken
        };
        dispatch(loginSuccess(userData));
        console.log("Login successful:", response);
        navigate("/dashboard/overview");
        window.location.reload();
      } else {
        newErrors.general =
          data.message || "Login failed. Please Try again later.";
        setErrors(newErrors);
      }
    } catch (error) {
      console.error("Login failed:", error);
      newErrors.general = "Network error. Please try again later.";
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] overflow-hidden w-[100vw] pr-[65px] max-lg:px-5 max-sm:py-5">
      <div className="h-[100vh] w-[604px] signin-right-con flex flex-col justify-end relative items-end max-lg:hidden">
        <img
          src={Icons.trimoDashboard}
          alt="Trimo Dashboard"
          className="object-center object-contain h-[560px] absolute bottom-[5%] right-0"
        />
      </div>
      <div className="flex w-full flex-col max-sm:flex-col-reverse overflow-y-auto">
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

        <div className="w-full h-full flex items-center justify-center max-sm:mt-[-30px] ">
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
                      setErrors((prev) => ({ ...prev, email: "" }));
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
                      setErrors((prev) => ({ ...prev, password: "" }));
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
                  label={loading ? "Signing in..." : "Sign in"}
                  loader={
                    loading ? <span className="spinner mr-2 "></span> : ""
                  }
                  onClick={loading ? " " : handleSubmit}
                  className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px] ${
                    loading
                      ? "opacity-[0.9] cursor-not-allowed bg-[#383268]"
                      : ""
                  }`}
                />
              </div>
              {errors.general && (
                <p className="text-[#CB2315] text-sm font-normal text-center mt-2">
                  {errors.general}
                </p>
              )}
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
