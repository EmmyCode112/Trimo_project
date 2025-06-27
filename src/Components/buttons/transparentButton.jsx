import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Button = ({
  label,
  onClick,
  type = "button",
  className,
  disabled = false,
  icon,
}) => {
  return (
    <button
      type={type}
      className={cn(
        `px-[19px] py-[10px] border border-[#D0D5DD] text-[16px] font-[500] rounded-[52px] transition disabled:bg-[#EBEBF0] disabled:text-[#383268] disabled:cursor-not-allowed ${className}`
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <img src={icon} className="mr-2" />} {/* Optional icon */}
      {label}
    </button>
  );
};

// Prop type validation
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node, // For adding icons
};

// Default props
Button.defaultProps = {
  onClick: () => {},
  className: "",
  disabled: false,
  icon: null,
};

export default Button;
