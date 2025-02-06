"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ isEmpty = false }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#344054",
        },
      },
    },
  }

  const data = {
    labels: ["27th Nov", "28th Nov", "29th Nov", "30th Nov", "1st Dec", "2nd Dec", "3rd Dec"],
    datasets: [
      {
        label: "Delivery Rate",
        data: isEmpty ? Array(7).fill(0) : [45, 65, 35, 65, 45, 55, 65],
        backgroundColor: "#10B981",
      },
      {
        label: "Failure Rate",
        data: isEmpty ? Array(7).fill(0) : [20, 25, 15, 20, 20, 20, 25],
        backgroundColor: "#EF4444",
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default BarChart

