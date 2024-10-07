import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { useSelector } from "react-redux";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  // Define the chart data
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#4379F2", // Blue color for bidders
        borderWidth: 2, // Thicker line
        pointRadius: window.innerWidth < 640 ? 2 : 4, // Smaller points for small screens
        fill: false, // No background fill
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#ee6c4d", // Orange color for auctioneers
        borderWidth: 2,
        pointRadius: window.innerWidth < 640 ? 2 : 4, // Smaller points for small screens
        fill: false,
      },
    ],
  };

  // Define responsive options for the chart
  const options = {
    responsive: true, // Ensures the chart adjusts to the container size
    maintainAspectRatio: false, // Allows the chart to fill its container
    scales: {
      y: {
        beginAtZero: true, // Ensures the Y-axis starts from 0
        max: 50, // Sets the maximum value for Y-axis
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Adds commas to large numbers
          },
          font: {
            size: window.innerWidth < 640 ? 10 : 14, // Responsive font size for Y-axis labels
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 10 : 14, // Responsive font size for X-axis labels
          },
        },
      },
    },
    plugins: {
      title: {
        display: true, // Shows the chart title
        text: "Number of Bidders and Auctioneers Registered",
        font: {
          size: window.innerWidth < 640 ? 16 : 20, // Responsive title font size
        },
      },
      legend: {
        labels: {
          font: {
            size: window.innerWidth < 640 ? 10 : 14, // Responsive font size for legend
          },
        },
      },
    },
  };

  // Return the Line chart with applied responsive settings
  return (
    <div className="w-full h-64 sm:h-96">
      {" "}
      {/* Responsive container */}
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
