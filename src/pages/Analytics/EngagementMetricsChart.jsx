import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Line,
} from "recharts";
import Button from "../../Components/buttons/transparentButton";
import CalenderModal from "./CalenderModal";

const data = [
  { month: "Jan", open: 90, click: 40, bounce: 10 },
  { month: "Feb", open: 85, click: 38, bounce: 32 },
  { month: "Mar", open: 48, click: 42, bounce: 11 },
  { month: "Apr", open: 80, click: 70, bounce: 33 }, // Peak Click Rate in April
  { month: "May", open: 82, click: 47, bounce: 54 },
  { month: "Jun", open: 78, click: 41, bounce: 15 },
  { month: "Jul", open: 20, click: 79, bounce: 13 },
  { month: "Aug", open: 75, click: 87, bounce: 12 },
  { month: "Sep", open: 34, click: 36, bounce: 11 },
  { month: "Oct", open: 72, click: 35, bounce: 90 },
  { month: "Nov", open: 71, click: 12, bounce: 92 },
  { month: "Dec", open: 70, click: 33, bounce: 8 },
];

const legendItems = [
  { key: "open", label: "Open Rate" },
  { key: "click", label: "Click Rate" },
  { key: "bounce", label: "Bounce Rate" },
];

const CustomTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 shadow-md rounded-lg border border-gray-200 text-xs">
      <p className="text-gray-600 font-medium">{label}</p>
      {payload
        .filter(
          (entry) =>
            entry.name !== "open" &&
            entry.name !== "click" &&
            entry.name !== "bounce"
        ) // Remove the extra "open"
        .map((entry, index) => (
          <p key={index} className="text-gray-700">
            <span
              className="inline-block w-2 h-2 mr-1 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: <b>{entry.value}%</b>
          </p>
        ))}
    </div>
  );
};

const EngagementMetricsChart = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    if (!date) return;
    console.log("Selected Date:", date.toISOString().split("T")[0]);
    setSelectedDate(date);
    setShowCalendar(false);
  };
  const disableFutureDates = ({ date }) => new Date() < date;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md w-full">
      <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-800">
            Engagement Metrics
          </h2>
          <p className="text-sm text-gray-500">
            Monitor recent delivery rate across channels for optimal performance
          </p>
        </div>
        <div>
          <select className="py-[10px] px-1 rounded-[8px] border border-[#D0D5DD] cursor-pointer outline-none">
            <option value="daily">Email</option>
            <option value="weekly">WhatsApp</option>
            <option value="monthly">SMS</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mb-[20px]">
        {legendItems.map((item) => (
          <div key={item.key} className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${
                item.label === "Open Rate"
                  ? "bg-[#6085FF]"
                  : item.label === "Click Rate"
                  ? "bg-[#FF4810]"
                  : item.label === "Bounce Rate"
                  ? "bg-[#B728FF]"
                  : ""
              }`}
            ></div>
            <p className="text-[14px] text-[#667085]">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />

            {/* Background Gradient for Open Rate */}
            {/* Background Gradient for Open Rate */}
            <Area
              type="linear"
              dataKey="open"
              stroke="none"
              fill="url(#colorGradient)"
            />

            {/* Background Gradient for Click Rate */}
            <Area
              type="linear"
              dataKey="click"
              stroke="none"
              fill="url(#colorGradient)"
            />

            {/* Background Gradient for Bounce Rate */}
            <Area
              type="linear"
              dataKey="bounce"
              stroke="none"
              fill="url(#colorGradient)"
            />

            {/* Open Rate Line */}
            <Line
              type="linear"
              dataKey="open"
              stroke="#6085FF"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Open Rate"
            />

            {/* Click Rate Line */}
            <Line
              type="linear"
              dataKey="click"
              stroke="#FF4810"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Click Rate"
            />

            {/* Bounce Rate Line */}
            <Line
              type="linear"
              dataKey="bounce"
              stroke="#B728FF"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Bounce Rate"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-4 max-sm:flex-col max-sm:justify-center gap-3">
        <div className="flex items-center gap-2 max-sm:flex-wrap max-sm:justify-center">
          <Button
            label="12 months"
            className="px-[16px] py-[10px] border border-[#D0D5DD] text-[14px] text-[#767676]"
          />
          <Button
            label="30 days"
            className="px-[16px] py-[10px] border border-[#D0D5DD] text-[14px] text-[#767676] "
          />
          <Button
            label="7 days"
            className="px-[16px] py-[10px] border border-[#D0D5DD] text-[14px] text-[#767676] "
          />
          <Button
            label="+ Custom"
            className="px-[16px] py-[10px] border border-[#D0D5DD] text-[14px] text-[#767676] "
            onClick={() => setShowCalendar(true)}
          />
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
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default EngagementMetricsChart;
