import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";

const EmptyState = ({ data, setIsModalOpen }) => {
  return (
    <div>
      <div className="w-full rounded-[15px] h-[505px] pb-[60px] flex flex-col gap-[20px] border-[5px] border-[#EAECF0]">
        <div className="px-[20px] py-[23px] border-b border-b-[#EAECF0] max-sm:px-[10px]  flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Groups</h2>
            <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
              {data.length} Groups
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center px-[20px] h-full w-full justify-center">
          <img src={Icons.emptyState} alt="empty state" />
          <div>
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              No Available Contacts
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              No campaigns found. Start your first campaign
            </p>
          </div>
          <Button
            label="Add New Groups"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
