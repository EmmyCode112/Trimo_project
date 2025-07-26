import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";
import GroupsContainer from "./GroupsContainer";
import CreateGroupModal from "./CreateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import FolderDetailModal from "./FolderDetailModal";
import "./Groups.css";
import Toast from "@/Components/Alerts/Toast";
import { useGroups } from "../../redux/GroupProvider/UseGroup";
import { asyncThunkCreator } from "@reduxjs/toolkit";

const Group = () => {
  const {
    groups,
    setGroups,
    createGroup,
    createGroupError,
    RetryToFetchGroups,
    error,
    setCreateGroupError,
    deleteGroup,

    deleteGroupError,
    deleteError,
  } = useGroups();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });
  // This should be in your component where you use useGroups
  // Assuming setToast is defined in this component

  const handleCreateGroup = async (groupName) => {
    setDuplicateError(false); // Clear any previous duplicate error
    setCreateGroupError(""); // Clear errors from previous create attempts
    // Clear `error` state (for name field specific errors) from previous create attempts
    // This depends on how `error` is managed and if you reset it in the context's `createGroup`

    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === groupName.toLowerCase()
    );

    if (isDuplicate) {
      setDuplicateError(true);
      setToast({
        isOpen: true,
        message: "A group with this name already exists.",
        type: "error",
      });
      return; // Exit if duplicate found
    }

    // Ensure groupName is valid before attempting API call
    if (!groupName.trim()) {
      setToast({
        isOpen: true,
        message: "Group name cannot be empty.",
        type: "error",
      });
      return;
    }

    // Await the createGroup call to ensure it completes before retrying fetch
    await createGroup({ name: groupName, contacts: [] });

    // Now, check the error states from the context after the API call
    // It's crucial that createGroup updates `createGroupError` and `error` states *before* this check
    if (createGroupError || error) {
      // Check both general create error and specific 'name' error
      setToast({
        isOpen: true,
        message: createGroupError || error, // Show the most relevant error
        type: "error",
      });
    } else {
      // Only refetch and show success if no errors occurred
      await RetryToFetchGroups(); // Await to ensure contacts are updated before showing success
      setToast({
        isOpen: true,
        message: "Group created successfully",
        type: "success",
      });
      setIsModalOpen(false); // Close modal only on success
    }
  };
  const toggleSelection = (id) => {
    setSelectedFolders((prev) =>
      prev.includes(id)
        ? prev.filter((groupId) => groupId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedFolders.length > 0) {
      await deleteGroup(selectedFolders);
    }

    if (deleteGroupError || deleteError) {
      setToast({
        isOpen: true,
        message: deleteGroupError
          ? deleteGroupError
          : "Failed to delete group" || deleteError,
        type: "error",
      });
    } else if (!deleteGroupError && !deleteError) {
      setGroups(groups.filter((group) => !selectedFolders.includes(group.id)));
      await RetryToFetchGroups(); // Ensure groups are updated after deletion
      setOpenDeleteModal(false);
      setToast({
        isOpen: true,
        message: "Group deleted successfully",
        type: "success",
      });
    }

    setSelectedFolders([]);
  };

  const openFolderDetails = (folder) => {
    setSelectedFolder(folder);
  };

  const filteredGroups = groups.filter((group) => {
    const groupName = group.name.toLowerCase();

    return groupName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
      <div className="flex justify-between items-center header-wrapper gap-[20px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium">All Groups</h1>
          <p className="text-[#767676] font-normal text-[15px]">
            View all saved contacts with their details and associated groups at
            a glance.
          </p>
        </header>
        <div className="g-button flex justify-end gap-[12px]">
          {selectedFolders.length > 0 && (
            <Button
              label="Delete Group"
              onClick={() => setOpenDeleteModal(true)}
              className="rounded-[8px] border border-[#CB1E33] text-[#CB1E33] font-medium max-md:hidden"
            />
          )}
          <Button
            label="Create Group"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#383268] text-white rounded-[8px] max-md:w-[40%] add-group py-2 px-[18px] hover:bg-[#41397c]"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 px-[10px] rounded-[8px] border search-group border-[#D0D5DD] w-[351px] h-[47px]">
        <img
          src={Icons.searchIcon}
          alt="search"
          className="w-[20px] h-[20px]"
        />
        <input
          type="text"
          placeholder="Search group name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 outline-none w-full h-full"
        />
      </div>

      <div>
        <GroupsContainer
          data={filteredGroups}
          groups={groups}
          toggleSelection={toggleSelection}
          selectedFolders={selectedFolders}
          setOpenDeleteModal={setOpenDeleteModal}
          openFolderDetails={openFolderDetails}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {isModalOpen && (
        <CreateGroupModal
          data={groups}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateGroup}
        />
      )}
      {openDeleteModal && (
        <DeleteGroupModal
          onDelete={handleDelete}
          onClose={() => setOpenDeleteModal(false)}
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          selectedFolders={selectedFolders}
        />
      )}
      {selectedFolder && (
        <FolderDetailModal
          folder={selectedFolder}
          open={Boolean(selectedFolder)}
          onClose={() => setSelectedFolder(null)}
          setOpenCreateFormModal={setOpenCreateFormModal}
          openCreateFormModal={openCreateFormModal}
          setGroups={setGroups}
        />
      )}
      {toast.isOpen && (
        <Toast
          type={toast.type}
          title={toast.type === "error" ? "Error" : "Success"}
          message={toast.message}
          onClose={() => setToast({ ...toast, isOpen: false })}
        />
      )}
    </div>
  );
};

export default Group;
