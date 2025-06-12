import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import CalenderModal from "./CalenderModal";
import Button from "@/Components/buttons/transparentButton";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import "react-calendar/dist/Calendar.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MessagesSentChart = () => {
  const [selectedFilter, setSelectedFilter] = useState("12m");
  const [showCalendar, setShowCalendar] = useState(false);
  const [chartData, setChartData] = useState({});

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 880);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 880);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filters = isMobile
    ? ["12m", "30d", "7d"]
    : ["12 months", "30 days", "7 days", "+ Custom"];

  const fakeDataByDate = {
    "2025-01-29": {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "WhatsApp",
          backgroundColor: "#9A2444",
          data: [100, 120, 110, 130, 140, 150, 160],
        },
        {
          label: "Email",
          backgroundColor: "#CB1E33",
          data: [50, 60, 70, 80, 90, 100, 110],
        },
        {
          label: "SMS",
          backgroundColor: "#383268",
          data: [30, 40, 50, 60, 70, 80, 90],
        },
      ],
    },
  };

  const fakeData = {
    last7d: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "WhatsApp",
          backgroundColor: "#9A2444",
          data: [100, 120, 110, 130, 140, 150, 160],
        },
        {
          label: "Email",
          backgroundColor: "#CB1E33",
          data: [50, 60, 70, 80, 90, 100, 110],
        },
        {
          label: "SMS",
          backgroundColor: "#383268",
          data: [30, 40, 50, 60, 70, 80, 90],
        },
      ],
    },
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowCalendar(filter === "+ Custom");

    if (filter === "7d") {
      setChartData(fakeData.last7d);
    }
  };

  const handleDateChange = (date) => {
    if (!date) return; // Prevent errors if no date is selected
    const formattedDate = date.toISOString().split("T")[0];
    console.log("Selected Date:", formattedDate);

    const selectedData = fakeDataByDate[formattedDate] || {
      labels: [],
      datasets: [],
    };

    setChartData(selectedData);
    setShowCalendar(false);
  };

  const disableFutureDates = ({ date }) => new Date() < date;

  const data = chartData.labels
    ? chartData
    : {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "SMS",
            backgroundColor: "#383268",
            data: [200, 250, 150, 180, 200, 220, 210, 230, 220, 240, 260, 210],
          },
          {
            label: "WhatsApp",
            backgroundColor: "#9A2444",
            data: [600, 800, 500, 600, 650, 750, 700, 720, 710, 780, 820, 650],
          },
          {
            label: "Email",
            backgroundColor: "#CB1E33",
            data: [300, 400, 250, 300, 330, 350, 340, 360, 370, 390, 410, 320],
          },
        ],
      };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          font: { size: 13 },
          padding: 20,
        },
      },
    },
    scales: { x: { stacked: true }, y: { stacked: true } },
  };

  return (
    <div className="p-4 bg-white rounded-lg  border-[5px] border-[#EAECF0] w-full">
      <h2 className="text-[18px] font-medium text-[#484848]">
        Messages Sent by Channel
      </h2>
      <p className="text-sm text-[#767676]">
        Analyze message distribution across channels
      </p>
      <div className="mt-[20px] pt-[12px] w-full">
        <Bar data={data} options={options} className="w-full" />
      </div>
      <div className="flex justify-between items-center mt-4 max-sm:flex-col gap-4">
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-[16px] py-[10px] border border-[#D0D5DD] text-[14px] text-[#767676] ${
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
};

export default MessagesSentChart;
