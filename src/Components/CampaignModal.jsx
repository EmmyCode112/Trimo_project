import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../assets/assets";

import { useModal } from "../redux/UseCampaignModal";

const CampaignModal = ({ onClose, onOpen }) => {
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

    if (onOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpen, onClose]);

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

  if (!onOpen) return null;

  const { openFormModal, openWhatsFormModal, openEMailFormModal } = useModal();

  const handleOpenSmsModal = () => {
    openFormModal();
    onClose();
  };
  const handleOpenWhatsAppModal = () => {
    openWhatsFormModal();
    onClose();
  };

  const handleOpenEmailModal = () => {
    openEMailFormModal();
    onClose();
  };

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
        <div>
          <div className="flex justify-between gap-2 items-start mt-3">
            <div>
              <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[10px]">
                Welcome onboard Owai!!
              </h2>
              <p className="text-[14px] font-normal text-[#767676]">
                Pick a campaign type you would love to start with
              </p>
            </div>
            <img
              src={Icons.crossIcon}
              alt="close"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className=" bg-[#F1F1F1] rounded-[15px] p-1 mt-6">
            <div className="flex  gap-[11px] ">
              {/* sms campaign */}
              <div
                className="bg-white rounded-[20px] flex items-center flex-col p-[10px] gap-y-[13px] cursor-pointer"
                onClick={handleOpenSmsModal}
              >
                <img src={Icons.contactFrameImport} alt="import contact" />
                <div className="flex items-center justify-between gap-[20px] max-sm:gap-2.5">
                  <div>
                    <h2 className="text-[#1A1A1A] text-[15px] font-medium mb-[3px] max-sm:text-[11px]">
                      SMS Campaign
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
              {/* email campaign */}
              <div onClick={handleOpenEmailModal} className="bg-white rounded-[20px] flex items-center flex-col p-[10px] gap-y-[13px] cursor-pointer">
                <img src={Icons.contactFrameManual} alt="import contact" />
                <div className="flex items-center justify-between gap-[20px] max-sm:gap-2.5">
                  <div>
                    <h2 className="text-[#1A1A1A] text-[15px] font-medium mb-[3px] max-sm:text-[11px]">
                      Email Campaign
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
            <div className="flex  gap-[11px] mt-[11px]">
              {/* whatsApp  campaign*/}
              <div
                onClick={handleOpenWhatsAppModal}
                className="bg-white rounded-[20px] flex items-center flex-col p-[10px] gap-y-[13px] cursor-pointer"
              >
                <img src={Icons.whatsAppIcon} alt="import contact" />
                <div className="flex items-center justify-between gap-[20px]">
                  <div>
                    <h2 className="text-[#1A1A1A] text-[15px] font-medium mb-[3px] max-sm:text-[11px]">
                      WhatsApp Campaign
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

              {/* otp campaign */}
              <div className="bg-white rounded-[20px] flex items-center flex-col p-[10px] gap-y-[13px] cursor-pointer">
                <img src={Icons.OtpIcon} alt="import contact" />
                <div className="flex items-center justify-between gap-[20px]">
                  <div>
                    <h2 className="text-[#1A1A1A] text-[15px] font-medium mb-[3px] max-sm:text-[11px]">
                      OTP Campaign
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
    </div>
  );
};

export default CampaignModal;
