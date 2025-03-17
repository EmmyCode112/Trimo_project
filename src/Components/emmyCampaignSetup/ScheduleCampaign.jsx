import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Icons } from "@/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const ScheduleCampaign = ({
  setSchedule,
  setSelectedDate,
  setSelectedTime,
  selectedTime,
  selectedDate,
  schedule,
  isDisabled,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const timeRef = useRef(null);

  const generateTimeOptions = () => {
    let times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes of ["00", "15", "30", "45"]) {
        const ampm = hour < 12 ? "AM" : "PM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        times.push(`${displayHour}:${minutes} ${ampm}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowClock(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setShowClock(false);
      }
    };
    if (showCalendar || showClock) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar, showClock]);

  return (
    <div>
      <h2 className="text-[20px] text-[#1A1A1A] font-medium">
        When do you want to send it?
      </h2>
      <p className="text-[#767676] text-[14px] font-normal mt-[6px]">
        Decide when you want to send your broadcast message
      </p>

      <div className="flex gap-6 items-center mt-5">
        <div
          className={`cursor-pointer flex gap-2 items-center ${
            isDisabled
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() => !isDisabled && setSchedule("sendNow")}
        >
          <div
            className={`w-[20px] h-[20px] border rounded-full flex items-center justify-center ${
              schedule === "sendNow" ? "border-[#383268]" : "border-[#D0D5DD]"
            }`}
          >
            {schedule === "sendNow" && (
              <div className="h-[10px] w-[10px] rounded-full bg-[#383268]"></div>
            )}
          </div>
          <p className="text-[#484848] font-medium text-[16px]">Send Now</p>
        </div>
        <div
          className={`cursor-pointer flex gap-2 items-center ${
            isDisabled
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() => !isDisabled && setSchedule("scheduleLater")}
        >
          <div
            className={`w-[20px] h-[20px] border rounded-full flex items-center justify-center ${
              schedule === "scheduleLater"
                ? "border-[#383268]"
                : "border-[#D0D5DD]"
            }`}
          >
            {schedule === "scheduleLater" && (
              <div className="h-[10px] w-[10px] rounded-full bg-[#383268]"></div>
            )}
          </div>
          <p className="text-[#484848] font-medium text-[16px]">
            Schedule for later
          </p>
        </div>
      </div>

      {schedule === "scheduleLater" && (
        <div className="mt-4 flex items-center gap-6">
          <div>
            <p className="text-[14px] text-[#1A1A1A] mb-[6px]">Date</p>

            <div
              className="border rounded-[8px] px-4 py-2 cursor-pointer relative w-[300px]"
              onClick={() => setShowCalendar(!showCalendar)}
              ref={calendarRef}
            >
              <div className="flex justify-between items-center">
                <p>
                  {selectedDate ? selectedDate.toDateString() : "Select date"}
                </p>

                <img src={Icons.calenderIcon} alt="calendar" />
              </div>
              {showCalendar && (
                <div
                  className="calendar-container absolute top-[-1100%] z-10 bg-white left-0 p-[24px] shadow-lg rounded-[8px]"
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
                    />
                    <div className="flex gap-3 justify-end">
                      <Button
                        label="Cancel"
                        onClick={handleCancel}
                        className="rounded-[8px] border hover:bg-[#eeeff0] border-[#383268] text-[#383268]"
                      />
                      <Button
                        label="Save"
                        disabled={!tempSelectedDate}
                        onClick={handleContinue}
                        className="rounded-[8px] border border-[#C1BFDO] text-white bg-[#383268] hover:bg-[#41397c]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-[14px] text-[#1A1A1A] mb-[6px]">Time (GMT+1)</p>
            <div
              className="border rounded-[8px] px-4 py-2 cursor-pointer relative w-[300px]"
              onClick={() => setShowClock(!showClock)}
              ref={timeRef}
            >
              <div className="flex justify-between items-center">
                <p>{selectedTime || "Select time"}</p>
                <img src={Icons.clockIcon} alt="time" />
              </div>
              {showClock && (
                <div className="absolute top-[-500%] l-[-10%] border border-[#D0D5DD] z-10 bg-white shadow-lg p-2 max-h-[200px] overflow-y-auto w-full rounded-md ">
                  {timeOptions.map((time, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCampaign;
