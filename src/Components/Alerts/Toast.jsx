import { useEffect } from "react";
import { Icons } from "@/assets/assets"; // Assuming you have an Icons object

const Toast = ({ title, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed z-[1001] top-5 right-5  gap-3 p-4 rounded-lg shadow-lg text-white flex items-start md:w-[400px] w-[90%] border ${
        type === "error"
          ? "bg-[#FAE9EB] border-[#D54B5C]"
          : type === "warning"
          ? "bg-[#FBF1E6] border-[#E29133] "
          : "bg-[#F6FEF9] border-[#6CE9A6]"
      }`}
    >
      {/* Icon based on type */}
      <img
        src={type === "error" ? Icons.ErrorWarning : Icons.successWarning}
        alt={type}
        className="w-6 h-6 mr-2"
      />

      <div className="flex-1">
        {/* Customizable header */}
        <p
          className={` text-[14px] font-medium ${
            type === "error"
              ? "text-[#CB1E33]"
              : type === "warning"
              ? "text-[#DB7500]"
              : "text-[#027A48]"
          }`}
        >
          {title}
        </p>
        <span
          className={` text-[14px] font-normal ${
            type === "error"
              ? "text-[#CB1E33]"
              : type === "warning"
              ? "text-[#DB7500]"
              : "text-[#027A48]"
          }`}
        >
          {message}
        </span>
      </div>

      <button
        onClick={onClose ? onClose : ""}
        className="ml-3 text-white font-bold"
      >
        <img
          src={
            type === "error"
              ? Icons.errorIcon
              : type === "warning"
              ? Icons.closeXIcon
              : Icons.toastSuccessIcon
          }
        />
      </button>
    </div>
  );
};

export default Toast;
