import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "@/assets/assets";

const SmallScreenPreviewPanel = ({ isOpen, onClose, message, customer }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const dragRef = useRef(null);

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

  // Close modal automatically on large screens
  useEffect(() => {
    if (isLargeScreen) {
      onClose();
    }
  }, [isLargeScreen, onClose]);

  // Handle dragging down on mobile to close
  const handleDragStart = (e) => {
    if (!isMobile) return;
    dragRef.current = { startY: e.touches ? e.touches[0].clientY : e.clientY };
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

  const replaceVariables = (msg, customer) => {
    return msg.replace(
      /{{customer_name}}/g,
      `${customer.firstName} ${customer.lastName}`
    );
  };

  return (
    <div className="fixed flex items-center justify-center max-md:items-end inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`whatsapp-container bg-white ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] w-full h-[90%]"
            : "w-[360px] rounded-[20px] p-[15px]"
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
        <div className="p-6">
          <div className="flex justify-end">
            <img
              src={Icons.crossIcon}
              alt="Close"
              className="cursor-pointer "
              onClick={onClose}
            />
          </div>
          <div className="">
            <h3 className="text-[16px] text-[#484848] font-normal">
              Preview panel
            </h3>
            <div className="bg-[#FAFAFA] rounded-[30px] p-[45px] mt-3 h-full">
              <div>
                <img
                  src={Icons.IphoneTopNavigation}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="bg-white w-full py-[45px] px-[15px]">
                <div
                  className="bg-[#E9E9EB] rounded-[14px] px-[9px] py-[5px] whitespace-normal w-full text-[14px] font-normal h-full"
                  dangerouslySetInnerHTML={{
                    __html: replaceVariables(message, customer),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenPreviewPanel;
