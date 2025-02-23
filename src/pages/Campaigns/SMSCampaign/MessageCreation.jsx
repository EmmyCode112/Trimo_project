import { useEffect } from "react";
import Button from "../../../Components/buttons/transparentButton";
import MessageEditor from "./MessageEditor";
import SelectedRecipient from "./SelectedRecipient";
import PreviewPanel from "./PreviewPanel"

const MessageCreation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
      <div className="flex justify-between items-center flex-wrap-reverse gap-[20px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium mb-[5px]">
            Message Creation
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            Add broadcast name and templete below
          </p>
        </header>
        <div className="flex gap-3 justify-end self-end">
          <Button
            label="previous"
            className="text-[#383268] hover:bg-[] rounded-[8px] py-2 px-[18px] border-[#383268]"
          />
          <Button
            label="Next"
            className="rounded-[8px] border-[#C1BFDO]  text-white bg-[#383268] hover:bg-[#41397c]"
          />
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex flex-col gap-y-[25px] md:w-2/3 ">
          <div>
          <MessageEditor />
          </div>
          <div>
            <SelectedRecipient />
          </div>
        </div>
        <div>
            <PreviewPanel />
        </div>
      </div>
    </div>
  );
};

export default MessageCreation;
