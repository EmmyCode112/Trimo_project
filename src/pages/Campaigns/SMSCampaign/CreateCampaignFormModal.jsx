import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Icons } from "../../../assets/assets";
import Button from "../../../Components/buttons/transparentButton";
import "./Calender.css";
import { useModal } from "../../../redux/UseCampaignModal";
import { useNavigate } from "react-router-dom";

const CreateCampaignFormModal = ({ onClose, onOpen }) => {
  const modalRef = useRef(null);
  const calendarRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const navigate = useNavigate();

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempSelectedDate, setTempSelectedDate] = useState(null);
  const { campaignName, setCampaignName } = useModal();
  const [description, setDescription] = useState("");

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

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutsideCalendar = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !event.target.closest(".calendar-trigger")
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutsideCalendar);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCalendar);
    };
  }, [showCalendar]);

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

  const handleDateChange = (date) => {
    setTempSelectedDate(date);
  };

  const handleCancel = () => {
    setTempSelectedDate(null);
    setShowCalendar(false);
    setSelectedDate(null);
  };

  const handleContinue = () => {
    setSelectedDate(tempSelectedDate);
    setShowCalendar(false);
  };
  const isNextDisabled =
    !selectedDate || !campaignName.trim() || !description.trim();

  if (!onOpen) return null;

  //   const formatCampaignName = (campaignName) => {
  //     return campaignName
  //       .toLowerCase()
  //       .replace(/[^a-z0-9.\-_ ]/g, "") // Allow only letters, numbers, ., -, _, and spaces
  //       .replace(/\s+/g, "-"); // Replace spaces with dashes
  //   };

  // const handleNext = () => {
  //   if (campaignName.trim()) {
  //   //   const formattedName = formatCampaignName(campaignName);
  //     navigate(`/campaigns/${campaignName}`);
  //     onClose();
  //   }
  // };
  const handleNext = () => {
    if (campaignName.trim()) {
      //   const formattedName = formatCampaignName(campaignName);
      navigate(`/dashboard/campaigns/smsCampaign`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : "top-4 bottom-4 right-3 w-[517px] rounded-[30px] p-[22px]"
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
        <div className="flex flex-col justify-between gap-3 h-full">
          <div>
            <h2 className="text-[#1A1A1A] text-[18px] font-medium">
              Create Campaign
            </h2>
            <p className="text-[#767676] text-[14px] font-normal max-w-[95%] md:w-full">
              Campaigns are dynamic, sending person-by-person as they meet
              conditions or perform events.
            </p>
            <form className="flex flex-col gap-y-[15px] mt-[28px]">
              <label className="flex flex-col gap-y-[5px]">
                <p className="text-[#1A1A1A] text-[14px] font-medium">
                  Campaign Name
                </p>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="First campaign"
                  className="border-[#D0D5DD] border rounded-[8px] px-4 py-2 outline-[#383268]"
                />
              </label>
              <label className="flex flex-col gap-y-[5px]">
                <p className="text-[#1A1A1A] text-[14px] font-medium">
                  Description
                </p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your campaign's purpose"
                  className="w-full px-4 py-2 h-[100px] border-[#D0D5DD] border rounded-[8px] outline-[#383268]"
                ></textarea>
              </label>
              <div
                className="border-[#D0D5DD] border rounded-[8px] px-4 py-2 flex justify-between items-center cursor-pointer relative calendar-trigger"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <p>
                  {selectedDate ? selectedDate.toDateString() : "Select date"}
                </p>
                <img
                  src={Icons.calenderIcon}
                  alt="calendar"
                  className="cursor-pointer"
                />

                {showCalendar && (
                  <div
                    ref={calendarRef}
                    className="calendar-container absolute top-[-580%] z-10 bg-white left-[10%] p-[24px] shadow-lg rounded-[8px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-4">
                      <p className="text-[#767676] text-[20px] font-medium">
                        Set Date
                      </p>
                      <Calendar
                        onChange={handleDateChange}
                        value={tempSelectedDate}
                        tileDisabled={({ date }) =>
                          date < new Date().setHours(0, 0, 0, 0)
                        }
                        tileClassName={({ date }) => {
                          const today = new Date().setHours(0, 0, 0, 0);
                          const isToday = date.getTime() === today;
                          const isSelected =
                            selectedDate &&
                            date.getTime() ===
                              new Date(selectedDate).setHours(0, 0, 0, 0);
                          const isPast = date.getTime() < today;

                          let classNames = "calendar-tile";
                          if (isSelected) classNames += "calendar-selected";
                          else if (isToday) classNames += " calendar-today";
                          else if (isPast) classNames += " calendar-disabled";

                          return classNames.trim();
                        }}
                      />
                      <div className="flex gap-3 justify-end">
                        <Button
                          label="Cancel"
                          onClick={handleCancel}
                          className="rounded-[8px] border hover:bg-[#eeeff0] border-[#383268] text-[#383268]"
                        />
                        <Button
                          label="Continue"
                          disabled={!tempSelectedDate}
                          onClick={handleContinue}
                          className="rounded-[8px] border border-[#C1BFDO] text-white bg-[#383268] hover:bg-[#41397c]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="self-end flex gap-x-3">
            <Button
              label="Cancel"
              onClick={onClose}
              className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0] text-[#383268]"
            />
            <Button
              label="Next"
              disabled={isNextDisabled}
              onClick={handleNext}
              className="rounded-[8px] border border-[#C1BFDO] text-white bg-[#383268] hover:bg-[#41397c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignFormModal;
