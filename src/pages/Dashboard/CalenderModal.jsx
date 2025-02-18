import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import Calendar from "react-calendar";

const CalenderModal = ({
  isOpenCalenderModal,
  onClose,
  handleDateChange,
  disableFutureDates,
  selectedDate,
  setShowCalendar,
}) => {
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

    if (isOpenCalenderModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCalenderModal, onClose]);

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

  if (!isOpenCalenderModal) return null;

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
        {/* calender here */}

        <div className="">
          <Calendar
            onChange={(date) => {
              try {
                handleDateChange(date);
              } catch (error) {
                console.error("Error selecting date:", error);
              } finally {
                setShowCalendar(false); // Ensure modal closes regardless
              }
            }}
            tileDisabled={({ date }) => disableFutureDates({ date })}
            className="border-none w-full"
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const today = new Date();
                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();

                const isSelected =
                  selectedDate &&
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear();

                const isDisabled = disableFutureDates({ date });

                return `p-2 transition-all duration-300 ease-in-out ${
                  isToday
                    ? "bg-[#9A2444] text-white font-bold rounded-full hover:!bg-[#6A1233]"
                    : isSelected
                    ? "bg-blue-700 text-white rounded-full hover:!bg-blue-900"
                    : isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:!bg-[#383268] hover:text-white hover:rounded-full"
                }`;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalenderModal;
