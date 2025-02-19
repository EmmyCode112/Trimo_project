import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";
import EmptyState from "./EmptyState";
import GroupsContainer from "./GroupsContainer";
import CreateGroupModal from "./CreateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import FolderDetailModal from "./FolderDetailModal";
import "./Groups.css";

import {useGroups} from "../../redux/GroupProvider/UseGroup"

const Group = () => {
  const { groups, setGroups } = useGroups()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);



  const handleCreateGroup = (groupName) => {
    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === groupName.toLowerCase()
    );

    if (isDuplicate) {
      setDuplicateError(true);
      return;
    }

    if (groupName.trim()) {
      setGroups([
        ...groups,
        { id: groups.length + 1, name: groupName, contacts: [] },
      ]);
    }

    setDuplicateError(false);
    setIsModalOpen(false);
  };
  const toggleSelection = (id) => {
    setSelectedFolders((prev) =>
      prev.includes(id)
        ? prev.filter((groupId) => groupId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = () => {
    setGroups(groups.filter((group) => !selectedFolders.includes(group.id)));
    setSelectedFolders([]);
  };

  const openFolderDetails = (folder) => {
    setSelectedFolder(folder);
  };

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
          className="p-1 outline-none w-full h-full"
        />
      </div>

      <div>
          <GroupsContainer
            data={groups}
            toggleSelection={toggleSelection}
            selectedFolders={selectedFolders}
            setOpenDeleteModal={setOpenDeleteModal}
            openFolderDetails={openFolderDetails}
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
      
    </div>
  );
};

export default Group;
