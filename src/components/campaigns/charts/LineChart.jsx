'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = () => {
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#344054',
        },
      },
    },
  };

  // Chart data
  const data = {
    labels: ['0hrs', '1hrs', '2hrs', '3hrs', '4hrs', '5hrs'],
    datasets: [
      {
        label: 'Open Rate',
        data: [20, 18, 15, 20, 15, 18, 15],
        borderColor: '#8B5CF6',
        backgroundColor: '#8B5CF6',
        tension: 0.4,
      },
      {
        label: 'Click Rate',
        data: [80, 75, 60, 70, 60, 65, 55],
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B',
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;