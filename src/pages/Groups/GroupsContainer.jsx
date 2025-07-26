import GroupFolder from "./GroupFolder";
import { Icons } from "../../assets/assets";
import "./Groups.css";
import Button from "../../Components/buttons/transparentButton";
import { useGroups } from "@/redux/GroupProvider/UseGroup";
import { IoMdRefresh } from "react-icons/io";

const GroupsContainer = ({
  data, // This prop 'data' seems redundant if 'groups' from context is the source.
  // Consider removing 'data' prop and using 'groups' consistently.
  inputRef,
  handleSaveGroup,
  isCreating,
  setNewGroupName,
  newGroupName,
  toggleSelection,
  selectedFolders,
  setOpenDeleteModal,
  openFolderDetails,
  setIsModalOpen,
}) => {
  const {
    groups,
    fetchGroupsLoading,
    refetching,
    fetchGroupsError,
    RetryToFetchGroups,
  } = useGroups();

  // 1. Show primary loading state (initial fetch)
  if (fetchGroupsLoading) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <div className="data-load-spinner"></div>{" "}
          {/* Ensure this spinner CSS is defined */}
          <div className="flex flex-col items-center gap-2 text-center ">
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              Loading Groups...
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              Please wait while we fetch your groups.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Show refetching state (if `RetryToFetchGroups` is active)
  // This state is useful if you want a separate spinner for 'refreshing'
  // vs. initial 'loading'. If refetching also updates `fetchGroupsLoading`,
  // then `refetching` might be redundant here.
  if (refetching) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <div className="data-load-spinner"></div>{" "}
          {/* Ensure this spinner CSS is defined */}
          <div className="flex flex-col items-center gap-2 text-center ">
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              Refreshing Groups...
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              Please wait while we refresh your groups.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Show error state
  if (fetchGroupsError) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <img src={Icons.emptyState} alt="empty state" />
          <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
            Error Fetching Groups
          </h2>
          <p className="text-[#767676] text-[14px] font-normal">
            {fetchGroupsError}
          </p>
          <Button
            label={
              <p className="flex items-center gap-1">
                <IoMdRefresh className="text-[20px]" />
                Retry
              </p>
            }
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
            onClick={RetryToFetchGroups} // No need for arrow function if not passing args
          />
        </div>
      </div>
    );
  }

  // 4. Show empty state (only if no groups AND no loading/error)
  if (groups.length === 0) {
    return (
      <div className="w-full rounded-[15px] h-[505px] pb-[60px] flex flex-col gap-[20px] border-[5px] border-[#EAECF0]">
        <div className="px-[20px] py-[23px] border-b border-b-[#EAECF0] max-sm:px-[10px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-medium text-[#3F3E3E]">Groups</h2>
            <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
              {groups.length} Groups {/* Use groups.length */}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center px-[20px] h-full w-full justify-center">
          <img src={Icons.emptyState} alt="empty state" />
          <div>
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              No Groups Found
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              No groups found. Add your first group to get started.
            </p>
          </div>
          <Button
            label="Add New Group" // Changed from "Add New Groups" for singular
            onClick={() => setIsModalOpen(true)}
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
          />
        </div>
      </div>
    );
  }

  // 5. Display Groups (if all above conditions are false)
  return (
    <div className="w-full rounded-[15px] h-[605px] overflow-y-scroll hide-scrollBar pb-[60px] flex flex-col gap-[20px] border-[5px] border-[#EAECF0]">
      <div className="px-[20px] py-[23px] border-b border-b-[#EAECF0] max-sm:px-[10px] flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <h2 className="text-[18px] font-medium text-[#3F3E3E]">Groups</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {groups.length} Groups {/* Use groups.length */}
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
      {/* This `data.length === 0` check here is redundant if you use the 'groups' from context consistently */}
      {/* If 'data' is still needed for filtering/sorting on the client, ensure 'data' is derived from 'groups' */}
      {/* For now, assuming 'data' will be equivalent to 'groups' for display purposes, or a filtered version of it */}
      {groups.length === 0 ? ( // Changed from data.length === 0
        <div className="h-full items-center flex flex-col justify-center">
          {" "}
          {/* Added flex-col for better centering */}
          <div className="flex flex-col items-center gap-6 text-center">
            <img src={Icons.emptyState} alt="empty state" />
            <div>
              <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
                No Groups found matching your criteria.
              </h2>
              <p className="text-[#767676] text-[14px] font-normal w-full md:w-[85%] lg:w-[65%] text-center mx-auto">
                Use the search bar or filters to find specific groups or ensure
                your spellings are correct.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap max-md:justify-start gap-[22px] md:gap-y-[40px] md:gap-x-[80px] p-[20px] group-container">
          {/* Ensure 'data' here is the filtered/sorted version of 'groups' */}
          {(data.length > 0 ? data : groups).map(
            (
              group // Fallback to 'groups' if 'data' is empty
            ) => (
              <div key={group.id}>
                {" "}
                {/* Use group.id for key if available, more stable */}
                <GroupFolder
                  groupId={group.id}
                  groupName={group.name}
                  // totalContact={group.contacts} // If contacts array exists on group object
                  toggleSelection={toggleSelection}
                  selectedFolders={selectedFolders}
                  openFolderDetails={openFolderDetails}
                  folder={group}
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
export default GroupsContainer;
