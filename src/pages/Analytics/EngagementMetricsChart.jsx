import React, { useState } from "react";
import CalenderModal from "./CalenderModal";
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

const data = [
  { month: "Jan", open: 90, click: 40, bounce: 10 },
  { month: "Feb", open: 85, click: 38, bounce: 32 },
  { month: "Mar", open: 48, click: 42, bounce: 11 },
  { month: "Apr", open: 80, click: 70, bounce: 33 },
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
      {payload.map((entry, index) => (
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
        <select className="py-[10px] px-1 rounded-[8px] border border-[#D0D5DD] cursor-pointer outline-none">
          <option value="daily">Email</option>
          <option value="weekly">WhatsApp</option>
          <option value="monthly">SMS</option>
        </select>
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
                  : "bg-[#B728FF]"
              }`}
            ></div>
            <p className="text-[14px] text-[#667085]">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="linear"
              dataKey="open"
              fill="url(#colorGradient)"
              stroke="none"
            />
            <Area
              type="linear"
              dataKey="click"
              fill="url(#colorGradient)"
              stroke="none"
            />
            <Area
              type="linear"
              dataKey="bounce"
              fill="url(#colorGradient)"
              stroke="none"
            />

            <Line
              type="linear"
              dataKey="open"
              stroke="#6085FF"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="linear"
              dataKey="click"
              stroke="#FF4810"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="linear"
              dataKey="bounce"
              stroke="#B728FF"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <Button
            label="12 months"
            className="px-4 py-2 text-sm rounded-[8px]"
          />
          <Button label="30 days" className="px-4 py-2 text-sm rounded-[8px]" />
          <Button label="7 days" className="px-4 py-2 text-sm rounded-[8px]" />
          <Button
            label="+ Custom"
            className="px-4 py-2 text-sm rounded-[8px]"
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
