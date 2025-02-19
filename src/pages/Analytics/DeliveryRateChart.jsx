import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "../../Components/buttons/transparentButton";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const campaigns = [
  { name: "Campaign 1", delivered: 60, failed: 20 },
  { name: "Campaign 2", delivered: 75, failed: 25 },
  { name: "Campaign 3", delivered: 50, failed: 20 },
  { name: "Campaign 4", delivered: 50, failed: 50 },
  { name: "Campaign 5", delivered: 50, failed: 20 },
  { name: "Campaign 6", delivered: 80, failed: 20 },
  { name: "Campaign 7", delivered: 30, failed: 70 },
  { name: "Campaign 8", delivered: 70, failed: 20 },
  { name: "Campaign 9", delivered: 70, failed: 20 },
];

const DeliveryRateChart = () => {
  const data = {
    labels: campaigns.map((c) => c.name),
    datasets: [
      {
        label: "Failed",
        data: campaigns.map((c) => c.failed),
        backgroundColor: "#CB1E33",
        stack: "Stack 0",
      },
      {
        label: "Delivered",
        data: campaigns.map((c) => c.delivered),
        backgroundColor: "#12B76A",
        stack: "Stack 0",
        borderRadius: { topLeft: 10, topRight: 10 },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end", // Moves legend to the top-right
        labels: {
          usePointStyle: true, // Enables round markers
          pointStyle: "circle", // Makes legend circles
          boxWidth: 8, // Controls the marker size
          boxHeight: 8, // Ensures it's properly sized
          font: {
            size: 14, // Keeps text size larger
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="px-6 bg-white border-[5px] border-[#F1F1F1] rounded-lg w-full">
      <div className="py-[20px] border-b border-b-[#EAECF0] flex flex-col gap-y-[5px]  mb-[20px]">
        <h2 className="text-[#3F3E3E] text-[18px] font-medium">
          Delivery Rates
        </h2>
        <p className="text-[#767676] text-sm">
          Your top-performing campaigns with engagement insights and key stats.
        </p>
      </div>

      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>

      <div className="flex w-full justify-end py-[20px] border-t border-t-[#EAECF0] mt-[20px]">
        <Button
          label="View Reports"
          className="py-[10px] px-[16px] text-[#344054] rounded-[8px] border border-[#D0D5DD] hover:bg-[#eeeff0] text-[13px]"
        />
      </div>
    </div>
  );
};

export default DeliveryRateChart;
