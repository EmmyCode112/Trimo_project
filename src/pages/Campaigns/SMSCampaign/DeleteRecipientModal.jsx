import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const DeleteModal = ({ isOpenDeleteModal, onClose, onDelete }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpenDeleteModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDeleteModal, onClose]);

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

  const handleDelete = () => {
    onDelete();
    onClose();
  };
  if (!isOpenDeleteModal) return null;

  return (
    <div className="fixed flex items-center justify-center max-md:items-end inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={` bg-white ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : " w-[517px] rounded-[40px] p-[22px]"
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
        <div className="flex flex-col gap-y-[15px]">
          <div className="self-end max-md:hidden">
            <img
              src={Icons.crossIcon}
              alt="close"
              className="cursor-pointer w-[48px] h-[48px]"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col gap-y-6 mb-[20px]">
            <img
              src={Icons.deleteWarningIcon}
              alt="delete"
              className=" w-[48px] h-[48px]"
            />
            <div>
              <h2 className="mb-1 text-[#1A1A1A] text-[20px] font-medium">
                Delete Contact
              </h2>
              <p className="text-[#767676] font-normal text-[15px] w-[80%] max-sm:w-full">
                Are you sure you want to delete this contact? This action cannot
                be undone.
              </p>
            </div>
          </div>
          <div className="self-end flex items-center gap-x-3">
            <Button
              label="Cancel"
              onClick={onClose}
              className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
            />

            <Button
              onClick={handleDelete}
              label="Delete Contact"
              className="rounded-[8px] border bg-[#CB1E33] text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
