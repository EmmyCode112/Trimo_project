import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts";
import Button from "../../Components/buttons/transparentButton";
import CalenderModal from "./CalenderModal";

const data = [
  { month: "Jan", value: 90 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 50 },
  { month: "May", value: 65 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 75 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 72 },
  { month: "Oct", value: 60 },
  { month: "Nov", value: 45 },
  { month: "Dec", value: 50 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded-md shadow-sm">
        <p className="text-sm text-gray-700">
          {label}: {payload[0].value}% engagement
        </p>
      </div>
    );
  }
  return null;
};

const ResponseTrendsChart = () => {
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
    <div className="p-6 bg-white border-[5px] border-[#F1F1F1] rounded-lg w-full">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-[#3F3E3E] text-[18px] font-medium">
          Response Trends
        </h2>
        <p className="text-[#767676] text-sm">
          Monitor recent delivery rate across channels for optimal performance
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <CartesianGrid strokeDasharray="3 3" />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#colorBlue)"
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center mt-4 gap-2">
          <Button
            label="12 months"
            className="px-4 py-2 text-sm rounded-[8px]"
          />
          <Button
            label="30 days"
            className="px-4 py-2 text-sm rounded-[8px] hover:bg-[#eeeff0] "
          />

          <Button
            label="7 days"
            className="px-4 py-2 text-sm rounded-[8px] hover:bg-[#eeeff0] "
          />
          <Button
            label="+ Custom"
            className="px-4 py-2 text-sm rounded-[8px] hover:bg-[#eeeff0] "
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

export default ResponseTrendsChart;
