import GroupFolder from "./GroupFolder";
import { Icons } from "../../assets/assets";
import "./Groups.css";
import Button from "../../Components/buttons/transparentButton";

const GroupsContainer = ({
  data,
  inputRef,
  handleSaveGroup,
  isCreating,
  setNewGroupName,
  newGroupName,
  toggleSelection,
  selectedFolders,
  setOpenDeleteModal,
  openFolderDetails,
  groups,
}) => {
  return (
    <div className="w-full rounded-[15px] h-[605px] overflow-y-scroll hide-scrollBar pb-[60px] flex flex-col gap-[20px]  border-[5px] border-[#EAECF0]">
      <div className="px-[20px] py-[23px] border-b border-b-[#EAECF0] max-sm:px-[10px]  flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Groups</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {groups.length} Groups
          </p>
        </div>
        {selectedFolders.length > 0 && (
          <Button
            label="Delete Group"
            onClick={() => setOpenDeleteModal(true)}
            className="rounded-[8px] border border-[#CB1E33] text-[#CB1E33] max-sm:p-2 font-medium md:hidden"
          />
        )}
      </div>
      {data.length === 0 ? (
        <div className="h-full items-center flex justify-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <img src={Icons.emptyState} alt="empty state" />
            <div>
              <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
                No Groups found
              </h2>
              <p className="text-[#767676] text-[14px] font-normal w-full md:w-[85%] lg:w-[65%] text-center mx-auto">
                Use the search bar or filters to find specific group or ensure
                your spellings are correct.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap max-md:justify-start gap-[22px] md:gap-y-[40px] md:gap-x-[80px] p-[20px] group-container">
          {data.map((group, index) => (
            <div key={index}>
              <GroupFolder
                groupId={group.id}
                groupName={group.name}
                // totalContact={group.contacts}
                toggleSelection={toggleSelection}
                selectedFolders={selectedFolders}
                openFolderDetails={openFolderDetails}
                folder={group}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default GroupsContainer;
