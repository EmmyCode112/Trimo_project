import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useState, useEffect } from "react";
import Button from "../../Components/buttons/transparentButton";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalenderModal from "./CalenderModal";

export default function RecentMessage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("12m");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 880);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 880);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateChange = (date) => {
    console.log("Selected Date:", date);
    setShowCalendar(false);
  };

  const disableFutureDates = ({ date }) => new Date() < date;

  const data = [
    { name: "Jan", WhatsApp: 20, Email: 50, SMS: 60 },
    { name: "Feb", WhatsApp: 70, Email: 45, SMS: 18 },
    { name: "Mar", WhatsApp: 80, Email: 48, SMS: 19 },
    { name: "Apr", WhatsApp: 75, Email: 44, SMS: 17 },
    { name: "May", WhatsApp: 85, Email: 49, SMS: 18 },
    { name: "Jun", WhatsApp: 60, Email: 40, SMS: 46 },
    { name: "Jul", WhatsApp: 22, Email: 42, SMS: 15 },
    { name: "Aug", WhatsApp: 78, Email: 47, SMS: 18 },
    { name: "Sep", WhatsApp: 65, Email: 41, SMS: 97 },
    { name: "Oct", WhatsApp: 10, Email: 45, SMS: 19 },
    { name: "Nov", WhatsApp: 73, Email: 43, SMS: 16 },
    { name: "Dec", WhatsApp: 76, Email: 46, SMS: 18 },
  ];

  const filters = isMobile
    ? ["12m", "30d", "7d"]
    : ["12 months", "30 days", "7 days", "+ Custom"];

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowCalendar(filter === "+ Custom");
  };

  return (
    <div className="p-6 bg-white rounded-2xl  w-full border-[5px] border-[#EAECF0]">
      <h2 className="text-[18px] font-medium text-[#484848]">
        Recent Message Delivery Performance
      </h2>
      <p className="text-sm text-[#767676] mb-5">
        Monitor recent delivery rate across channels for optimal performance
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[10, 100]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="WhatsApp"
            stroke="#9A2444"
            fill="#9A2444"
            fillOpacity={0.1}
            className="mt-[-50px]"
          />
          <Line
            type="monotone"
            dataKey="WhatsApp"
            stroke="#FF4D4D"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Email"
            stroke="#CB1E33"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="SMS"
            stroke="#383268"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-[16px] py-[10px] border relative border-[#D0D5DD] text-[14px] text-[#767676] flex ${
                selectedFilter === filter ? "bg-[#F9FAFB] text-[#1D2939]" : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <Button
          label="View Reports"
          className="py-[10px] px-[16px] text-[#344054] rounded-[8px] border border-[#D0D5DD] hover:bg-[#eeeff0] text-[13px]"
        />
      </div>

      {showCalendar && (
        <CalenderModal
          handleDateChange={handleDateChange}
          isOpenCalenderModal={showCalendar}
          onClose={() => setShowCalendar(false)}
          setShowCalendar={setShowCalendar}
          disableFutureDates={disableFutureDates}
        />
      )}
    </div>
  );
}
