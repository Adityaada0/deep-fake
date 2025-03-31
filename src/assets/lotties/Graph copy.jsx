import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = ({ graphData, confidence }) => {
  // Chart data and options
  const chartData = {
    labels: graphData.map((point) => point.elapsedTime),
    datasets: [
      {
        label: confidence ? `Confidence (%) - Latest: ${confidence}` : "Confidence (%)",
        data: graphData.map((point) => point.confidence),
        borderColor: "rgba(57, 141, 141, 0.8)",
        backgroundColor: "rgba(57, 141, 141, 0.4)",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: "Epochs: Model Depth" },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: { display: true, text: "Confidence (%)" },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="mt-8 w-full">
      <h2 className="text-center text-2xl mb-4">Confidence Over Time</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Graph;
