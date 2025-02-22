import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function TemplatePreviewModal({ isOpen, onClose, onUse, template }) {
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
      modalRef.current.style.transition = 'none';
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    modalRef.current.style.transition = 'transform 0.3s ease-out';
    dragRef.current = null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center max-md:items-end justify-center inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`bg-white transform transition-transform duration-300 ease-out ${
          isMobile
            ? "w-full inset-x-0 bottom-0 rounded-t-[40px] p-6 animate-slide-up"
            : "w-[605px] rounded-[40px] p-[22px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mb-6" />
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-general-sans pt-9 text-[20px] leading-[30px] font-medium text-[#1A1A1A]">
              {template.title}
            </h2>
            <p className="font-general-sans text-sm leading-5 text-[#767676]">
              {template.type}
            </p>
          </div>
          <img
            src={Icons.crossIcon}
            alt="close"
            className="cursor-pointer w-12 h-12"
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto my-4 hide-scrollbar px-4 max-h-[400px]">
          {template.content}
        </div>

        <div className="flex justify-end pt-4 border-t border-[#F1F1F1] mt-4">
          <Button
            onClick={onUse}
            className="bg-[#383268] rounded-[8px] hover:bg-[#383268]/90 min-w-[139px] h-[44px] transition-colors duration-200 text-sm"
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
}