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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const sampleData = [
  { type: "SMS Campaign", value: 900 },
  { type: "Email Campaign", value: 600 },
  { type: "WhatsApp Campaign", value: 800 },
  { type: "OTP Campaign", value: 580 },
];

const MessageTypeChart = () => {
  const chartData = {
    labels: sampleData.map((item) => item.type),
    datasets: [
      {
        label: "Messages Sent (%)",
        data: sampleData.map((item) => item.value), // Keep raw percentage values
        backgroundColor: ["#D7EDFF", "#FFF5D7", "#D7FFE1", "#FFD7F0"],
        borderRadius: 10,
        categoryPercentage: 0.5, // Reduce spacing between bars (0.5 - 0.8 is ideal)
    barPercentage: 0.8, 
      },
    ],
  };

  return (
    <div className="p-6 bg-white  border-[5px] border-[#F1F1F1] rounded-lg w-full ">
      <div className="flex flex-col border-b border-b-[#EAECF0] mb-[20px] pb-[20px] gap-y-[6px]">
        <h2 className="text-[#3F3E3E] text-[18px] font-medium">
          Messages Type
        </h2>
        <p className="text-[#767676] text-sm">
          Analyze message distribution across channels
        </p>
      </div>

      <div className="h-[350px]">
        <Bar
          key={JSON.stringify(chartData)}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.raw}%`, // Show raw percentage in tooltip
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 1000, // Set max to 1000%
                ticks: {
                  stepSize: 200, // 0%, 200%, 400%, 600%, etc.
                  callback: (value) => `${value}%`, // Show as percentage
                },
              },
              x: {
                ticks: {
                  font: { size: 12 },
                },
                barThickness: 30,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MessageTypeChart;
