import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/services/api";
import Toast from "@/Components/Alerts/Toast";

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const showToast = (type, title, message) => {
    console.log("Toast triggered:", { type, title, message });
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast({ show: false, type: "", title: "", message: "" });
    }, 5000);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    return {
      isValid:
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar,
      errors: {
        minLength: password.length < minLength,
        hasUppercase: !hasUppercase,
        hasLowercase: !hasLowercase,
        hasNumber: !hasNumber,
        hasSpecialChar: !hasSpecialChar,
      },
    };
  };

  const isFormFilled =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    validatePassword(password).isValid &&
    password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ password: "", confirmPassword: "" });

    let isValidForm = true;

    const passwordValidationResult = validatePassword(password);

    if (!passwordValidationResult.isValid) {
      isValidForm = false;
      let passwordErrorMessage = "Password must:";
      if (passwordValidationResult.errors.minLength) {
        passwordErrorMessage += " be at least 8 characters long,";
      }
      if (passwordValidationResult.errors.hasUppercase) {
        passwordErrorMessage += " include an uppercase letter,";
      }
      if (passwordValidationResult.errors.hasLowercase) {
        passwordErrorMessage += " include a lowercase letter,";
      }
      if (passwordValidationResult.errors.hasNumber) {
        passwordErrorMessage += " include a number,";
      }
      if (passwordValidationResult.errors.hasSpecialChar) {
        passwordErrorMessage += " include a special character,";
      }
      passwordErrorMessage = passwordErrorMessage.replace(/,$/, ".");

      setErrors((prev) => ({
        ...prev,
        password: passwordErrorMessage,
      }));
    }

    if (password !== confirmPassword) {
      isValidForm = false;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
    }

    if (!isValidForm) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/user/reset-password", {
        password,
        confirm_password: confirmPassword,
      });

      if (response.status === 200) {
        navigate("/sign-in");
        console.log("Password successfully set.");
        showToast(
          "success",
          "Password Set",
          "Your password has been successfully set. Please sign in with your new password."
        );
      } else {
        const errorMessage =
          response.data?.message || "Failed to set password. Please try again.";
        setErrors((prev) => ({
          ...prev,
          password: errorMessage,
        }));
        console.error("Failed to set password:", response.data || response);
        showToast("error", "Error", errorMessage);
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        error.response?.data?.err_msg.password[0] ||
          "An unexpected error occurred."
      );
      setErrors((prev) => ({
        ...prev,
        password:
          error.response?.data?.err_msg.password[0] ||
          "An unexpected error occurred.",
      }));
      console.error("API call error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prevent form submission on Enter key unless the form is valid
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isFormFilled) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-[40%] mx-auto gap-[22px] flex flex-col auth-right-container">
      <div className="flex flex-col gap-8px mb-[12px]">
        <h4 className="font-[600] text-[28px] tracking-[-2px]">New Password</h4>
        <p className="text-[#767676] font-[500]">
          Create a new password to keep your account secure. Note: You are not
          allowed to use your previous (Old) password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        {/* Password Field */}
        <label className="flex flex-col gap-[6px]">
          <p className="text-[14px] font-[500] text-[#1A1A1A]">New Password</p>
          <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
            <img src={Icons.key} alt="" className="signin-icons" />
            <input
              className="w-full outline-none border-none"
              type={passwordType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              onClick={() =>
                setPasswordType(
                  passwordType === "password" ? "text" : "password"
                )
              }
              src={Icons.eyeOpen}
              alt=""
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </label>

        {/* Confirm Password Field */}
        <label className="flex flex-col gap-[6px]">
          <p className="text-[14px] font-[500] text-[#1A1A1A]">
            Confirm Password
          </p>
          <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
            <img src={Icons.key} alt="" className="signin-icons" />
            <input
              className="w-full outline-none border-none"
              type={confirmPasswordType}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              onClick={() =>
                setConfirmPasswordType(
                  confirmPasswordType === "password" ? "text" : "password"
                )
              }
              src={Icons.eyeOpen}
              alt=""
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </label>

        {/* Submit Button */}
        <Button
          label="Done"
          type="submit" // Explicitly set type to submit
          disabled={!isFormFilled || loading} // Disable if form is invalid or loading
          className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px]`}
        />
      </form>
      {toast.show && (
        <Toast type={toast.type} title={toast.title} message={toast.message} />
      )}
    </div>
  );
};

export default NewPassword;
