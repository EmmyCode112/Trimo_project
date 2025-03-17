import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "@/assets/assets";
import "./WhatsAppCampaign.css";
import { useSelector } from "react-redux";

const SmallScreen = ({ isOpen, onClose, message }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const dragRef = useRef(null);
  const imageUrl = useSelector((state) => state.image.imageUrl);
  const uploadedImage = useSelector((state) => state.image.uploadedImage);
  const templateImage = useSelector((state) => state.image.templateImage);

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

  const displayImage =
    templateImage || imageUrl || uploadedImage || Icons.emptyPreviewTemplate;

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

        <div className="whatsapp-chat h-full flex flex-col w-full mt-5">
          <div className="whatsapp-header bg-[#075E54] text-white p-3 flex items-center justify-between rounded-t-[20px]">
            <h3 className="text-[18px] font-normal">WhatsApp Preview</h3>
            <img
              src={Icons.crossIcon}
              alt="close"
              className="cursor-pointer w-[24px] h-[24px]"
              onClick={onClose}
            />
          </div>

          <div className="whatsapp-body bg-[#ECE5DD] p-[15px] h-full flex flex-col gap-3 overflow-y-scroll">
            <div className="bg-white rounded-[10px] p-2 pb-6 min-h-[90%] h-auto flex flex-col gap-4">
              {/* Image */}
              <div className="w-full h-[150px]">
                {displayImage && (
                  <img
                    src={displayImage}
                    alt="template"
                    className="w-full rounded-[10px] h-full object-cover"
                  />
                )}
              </div>
              {/* Message Content */}
              <div className="flex flex-col gap-4">
                <p className="font-normal text-[20px] text-[#767676] capitalize">
                  {message.header}
                </p>
                <p className="font-normal text-[15px] text-[#767676] whitespace-pre-wrap">
                  {message.description}
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallScreen;
