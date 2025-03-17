import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";
import AddTemplate from "./AddTemplate";

const MessageEditor = ({
  customers,
  message,
  setMessage,
  setImageSrc,
  setImageUrl,
  imageUrl,
  isOpenPreviewPanel,
}) => {
  const handleChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <p
        className="text-end text-[18px] cursor-pointer block lg:hidden"
        onClick={isOpenPreviewPanel}
      >
        Preview Here
      </p>
      <div className="mb-[6px] bg-[#FAFAFA] rounded-[10px] p-6">
        <div className="flex flex-col gap-y-[18px]">
          <form className="flex flex-col gap-y-[18px]">
            <label className="flex flex-col gap-y-2">
              <p className="text-[#1A1A1A] text-[14px]">Broadcast Name</p>
              <input
                className="w-full py-[10px] px-[14px] placeholder-[#A3A3A3] rounded-[8px] border border-[#D0D5DD] bg-none outline-[#383268] font-normal"
                type="text"
                name="header"
                placeholder="Enter your broadcast name"
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col gap-y-2">
              <p className="text-[#1A1A1A] text-[14px]">Description</p>
              <textarea
                className="w-full py-[10px] px-[14px] placeholder-[#A3A3A3] rounded-[8px] border border-[#D0D5DD] bg-none outline-[#383268] font-normal h-[130px]"
                name="description"
                placeholder="Describe your broadcast purpose"
                onChange={handleChange}
              ></textarea>
            </label>
          </form>
          {/* template */}
          <AddTemplate setImageSrc={setImageSrc} />
        </div>
      </div>
    </div>
  );
};

export default MessageEditor;
