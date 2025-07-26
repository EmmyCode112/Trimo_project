import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import PropTypes from "prop-types";

const CaseHundred = ({handleProceed, initialData}) => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(initialData?.connectData || "");

  // Function to handle option selection
  const handleOptionSelect = (option) => setSelectedOption(option);

  // Check if the button should be enabled
  const isProceedEnabled = selectedOption !== "";

  const handleProceedClick = () => {
    handleProceed({ connectData: selectedOption });
  };

  return (
    <div>
      {/* Header Section */}
      <div>
        <h4 className="font-[600] text-[28px] tracking-[-2px]">
          Your Goals and Experience
        </h4>
        <p className="text-[#767676] font-medium text-[16px]">
          Let's get you up and running quickly
        </p>
      </div>

      <fieldset className="mb-[19px]">
        <p>Will you be the one connecting your data to TRIIMO?</p>

        <div className="flex flex-col gap-3">
          {[
            "Yes and I feel pretty confident setting it up",
            "Yes but I will need you to walk me through it",
            "No, a teammate will help me do that",
          ].map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`flex items-center cursor-pointer py-1 px-[10px] rounded-[6px] gap-1 border ${
                selectedOption === option
                  ? "border-[#383268]"
                  : "border-[#D0D5DD]"
              }`}
            >
              <input
                type="checkbox"
                name="connectData"
                value={option}
                checked={selectedOption === option}
                readOnly
                className="w-[18px] h-[18px] cursor-pointer"
              />
              <p>{option}</p>
            </div>
          ))}
        </div>
      </fieldset>

      <Button
        label="Proceed"
        onClick={handleProceedClick}
        disabled={!isProceedEnabled}
        className={`${"bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px]"}`}
      />
    </div>
  );
};

CaseHundred.propTypes = {
  handleProceed: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CaseHundred;
