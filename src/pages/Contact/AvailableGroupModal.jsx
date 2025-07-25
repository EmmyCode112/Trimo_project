import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import { useGroups } from "../../redux/GroupProvider/UseGroup";
import GroupFolder from "./GroupFolder";
import Button from "../../Components/buttons/transparentButton";
import "./Contacts.css";
import CreateGroupModal from "./CreateGroupModal";

const AvailableGroupModal = ({
  openAvailableGroups,
  onClose,
  moveContactsToGroup,
}) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const [duplicateError, setDuplicateError] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);

  // Close modal when clicking outside
  const createGroupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        createGroupRef.current &&
        !createGroupRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (openAvailableGroups) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAvailableGroups, onClose]);

  // Handle dragging down on mobile to close
  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      onClose();
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const { groups, setGroups } = useGroups();

  if (!openAvailableGroups) return null;

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
    setCreateGroupModal(false);
  };

  return (
    <div className="fixed flex items-center max-md:items-end justify-center inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={` bg-white overflow-y-auto relative flex ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : " w-[605px] rounded-[40px] px-[22px] pt-[22px] max-h-[80%]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
        )}

        <div className="flex flex-col justify-between h-full ">
          <div className="flex flex-col justify-between h-full  w-full">
            <div className="flex justify-end mb-[9px]">
              <img
                src={Icons.crossIcon}
                alt="close"
                className="cursor-pointer w-[48px] h-[48px]"
                onClick={onClose}
              />
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-[#1A1A1A] text-[20px] font-medium">
                Click to Move Contacts
              </h2>
              <p className="text-[#767676] text-[14px] font-normal">
                Click on a group icon to move the selected contacts into that
                group.
              </p>
            </div>
            {groups.length === 0 ? (
              <p className="text-[#767676] text-[14px] font-normal">
                No groups found. Create a new group or add contacts to existing
                ones.
              </p>
            ) : (
              <div className=" max-h-[70%] flex flex-wrap max-md:justify-start gap-[22px] md:gap-y-[20px] md:gap-x-[29px] contacts-group-container">
                {groups.map((items, index) => (
                  <div key={index}>
                    <GroupFolder
                      folder={items} // Pass the current group instead of the whole array
                      groupId={items.id}
                      groupName={items.name}
                      moveContactsToGroup={moveContactsToGroup}
                      onClose={onClose}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className=" sticky bottom-0 pb-[22px] left-0 
           z-10 w-full"
          >
            <div className="self-end align-end flex items-center gap-3 justify-end">
              <Button
                label="Cancel"
                onClick={onClose}
                className="rounded-[8px] border border-[#C1BFDO] bg-[white] hover:bg-[#eeeff0]"
              />
              <Button
                onClick={() => setCreateGroupModal(true)}
                label="Create New Group"
                className={`rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white`}
              />
            </div>
          </div>
        </div>
      </div>

      {createGroupModal && (
        <CreateGroupModal
          onCreate={handleCreateGroup}
          onClose={() => setCreateGroupModal(false)}
          isOpen={createGroupModal}
          data={groups}
        />
      )}
    </div>
  );
};

export default AvailableGroupModal;
