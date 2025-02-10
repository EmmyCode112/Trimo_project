"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ isEmpty = false }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#344054",
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
        spacing: 5, // This creates the gap between segments
      },
    },
  }

  const data = {
    labels: ["No Interaction", "Clicked", "Opened but Not Clicked"],
    datasets: [
      {
        data: isEmpty ? [100, 0, 0] : [10, 65, 25],
        backgroundColor: ["#E5E7EB", "#10B981", "#8B5CF6"],
        borderWidth: 0,
      },
    ],
  }

  return <Pie options={options} data={data} />
}

export default PieChart

