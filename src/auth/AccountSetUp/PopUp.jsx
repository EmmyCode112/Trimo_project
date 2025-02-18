import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";

import { useNavigate } from "react-router-dom";

const PopUp = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-4">
      <div className="flex flex-col mx-auto w-[40%] gap-7 items-center justify-center auth-right-container px-2">
        <div>
          <img
            src={Icons.successIcon}
            alt="successful"
            className="w-[80px] h-[80px mx-auto]"
          />
        </div>
        <div className="text-center">
          <h4 className="text-[28px] font-semibold tracking-[-2px]">You’re All Set! 🎉</h4>
          <p className="text-[#767676] font-[500]">
            Before you dive in, take a quick moment to watch our onboarding
            video. It’s packed with tips and tricks to help you get the most out
            of your TRIIMO experience. Ready to explore?
          </p>
        </div>
        <img src={Icons.welcomePic} alt="" className="w-[450px]" />

        <div >
          <Button
            label="Go to Dashboard"
            onClick={() => navigate("/sign-in")}
            className="bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px] "
          />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
