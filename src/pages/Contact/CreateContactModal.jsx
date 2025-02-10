import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";


const CreateContactModal = ({ isOpenCreateContactModal, onClose, onOpenCreateFormModal }) => {
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

    if (isOpenCreateContactModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCreateContactModal, onClose]);

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

  if (!isOpenCreateContactModal) return null;

  const handleOpenCreateFormModal = () => {
    onOpenCreateFormModal();
    onClose();
  };

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

        <div>
          <div className="flex items-center justify-between">
            <h2 className="mb-1 text-[#1A1A1A] text-[20px] font-medium">
              Add New Contact
            </h2>
            <img
              src={Icons.crossIcon}
              alt="close"
              className="cursor-pointer w-[48px] h-[48px]"
              onClick={onClose}
            />
          </div>
          <p className="mt-[10px] text-[#767676] text-[14px] font-normal">
            Pick a campaign type you would love to start with
          </p>
          <div className="bg-[#FAFAFA] rounded-[20px] flex gap-x-[11px] mt-[19px] p-[6px] ">
            {/* import */}
            <div className="bg-white rounded-[20px] flex items-center flex-col p-[10px] gap-y-[13px] cursor-pointer">
              <img src={Icons.contactFrameImport} alt="import contact" />
              <div className="flex items-center justify-between gap-[20px]">
                <div>
                  <h2 className="text-[#1A1A1A] text-[15px] font-medium mb-[3px]">
                    Import Contact
                  </h2>
                  <p className="text-[#767676] text-[11px] font-normal">
                    Send a quick, direct message with SMS. Perfect for concise
                    updates and alerts.
                  </p>
                </div>
                <div className=" bg-[#FAFAFA] rounded-sm flex items-center justify-center p-[7px]">
                  <img
                    src={Icons.arrowLeftPagin}
                    alt=""
                    className="w-[26px] "
                  />
                </div>
              </div>
            </div>
            {/* manually */}
            <div className="bg-white rounded-[20px] flex items-center flex-col p-[10px] gap-y-[13px] cursor-pointer" onClick={handleOpenCreateFormModal}>
              <img src={Icons.contactFrameManual} alt="import contact" />
              <div className="flex items-center justify-between gap-[20px]">
                <div>
                  <h2 className="text-[#1A1A1A] text-[15px] font-medium mb-[3px]">
                    Enter Manually
                  </h2>
                  <p className="text-[#767676] text-[11px] font-normal">
                    Send a quick, direct message with SMS. Perfect for concise
                    updates and alerts.
                  </p>
                </div>
                <div className=" bg-[#FAFAFA] rounded-sm flex items-center justify-center p-[7px]">
                  <img
                    src={Icons.arrowLeftPagin}
                    alt=""
                    className="w-[26px] "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactModal;
