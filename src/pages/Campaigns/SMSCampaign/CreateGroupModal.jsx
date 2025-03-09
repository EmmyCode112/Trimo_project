import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const CreateGroupModal = ({ isOpen, onClose, onCreate, data, setToast, toast }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const [groupName, setGroupName] = useState("");

  // Function to show toast
  const showToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  const [duplicateError, setDuplicateError] = useState(false);

  const handleCreate = () => {
    const isDuplicate = data.some(
      (group) => group.name.toLowerCase() === groupName.toLowerCase()
    );

    if (isDuplicate) {
      showToast("Duplicate Error", "This group name is already in use.please chose a unique name.", "error");
      return;
    } else {
      showToast("Group Created", "Your group was created successfully!", "success");
    }


    onCreate(groupName);
    setGroupName("");
    setDuplicateError(false);
    onClose()
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={` bg-white ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : " w-[605px] rounded-[40px] p-[22px]"
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

        <h2 className="text-lg font-medium mb-4">Create New Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => {
            const newName = e.target.value;
            setGroupName(newName);
            
            // Reset duplicate error if new name is not in the list
            const isDuplicate = data.some(
              (group) => group.name.toLowerCase() === newName.toLowerCase()
            );
            setDuplicateError(isDuplicate);
          }}
          onKeyDown={handleKeyDown}
          className="border p-2 w-full rounded outline-none"
          placeholder="Enter group name"
        />

        <div className="flex justify-end mt-4 gap-2">
          <Button
            label="Cancel"
            onClick={onClose}
            className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
          />
          <Button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#383268] text-white rounded"
            disabled={ groupName.trim() === ""}
            label="Create"
          />
        </div>
      </div>


    </div>
  );
};

export default CreateGroupModal;
