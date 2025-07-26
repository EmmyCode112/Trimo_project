import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import PropTypes from "prop-types";

const CaseSixty = ({ handleProceed, initialData }) => {
  const [selectedGoal, setSelectedGoal] = useState(initialData?.bestDescribes || "");
  const [otherDescription, setOtherDescription] = useState("");

  // Handle goal selection
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    if (goal !== "Others") {
      setOtherDescription(""); // Clear other description if not selecting "Others"
    }
  };

  // Handle description input for "Others"
  const handleOtherDescriptionChange = (e) => {
    setOtherDescription(e.target.value);
  };

  // Check if the "Proceed" button should be enabled
  const isProceedEnabled =
    selectedGoal !== "" &&
    (selectedGoal !== "Others" ||
      (selectedGoal === "Others" && otherDescription.trim() !== ""));

  const handleProceedClick = () => {
    const finalGoal = selectedGoal === "Others" ? otherDescription : selectedGoal;
    handleProceed({ bestDescribes: finalGoal });
  };

  // List of goal options
  const goals = [
    "Marketing",
    "Product Management",
    "Engineering",
    "Sales",
    "Operations",
    "Design",
    "UX Research",
    "Others",
  ];

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

      {/* Goal Selection Section */}
      <div>
        <fieldset className="mt-6 mb-[19px]">
          <legend className="text-sm font-medium text-gray-700">
            What best describes you
          </legend>
          <div className="flex flex-wrap gap-x-[12px] gap-y-[10px] mt-2">
            {goals.map((goal) => (
              <div
                key={goal}
                className={`flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center ${
                  selectedGoal === goal
                    ? "border-[#383268]"
                    : "border-[#D0D5DD]"
                }`}
                onClick={() => handleGoalSelect(goal)}
              >
                <input
                  type="checkbox"
                  name="goal"
                  value={goal}
                  checked={selectedGoal === goal}
                  readOnly
                  className="w-[18px] h-[18px] cursor-pointer"
                />
                <label className="text-sm font-medium text-[#484848] cursor-pointer">
                  {goal}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Other Description Input */}
      {selectedGoal === "Others" && (
        <div className="mt-[14px] mb-[19px]">
          <input
            type="text"
            value={otherDescription}
            onChange={handleOtherDescriptionChange}
            className="px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] w-full outline-none"
            placeholder="Enter what best describes you"
          />
        </div>
      )}

      {/* Proceed Button */}
      <Button
        label="Proceed"
        onClick={handleProceedClick}
        disabled={!isProceedEnabled}
        className={`${"bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px]"}`}
      />
    </div>
  );
};

CaseSixty.propTypes = {
  handleProceed: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CaseSixty;
