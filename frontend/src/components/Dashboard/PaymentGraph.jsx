import { Bar } from "react-chartjs-2";
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

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  // Define the chart data
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#4379F2", // Color of the bars
      },
    ],
  };

  // Define responsive options for the chart
  const options = {
    responsive: true, // Ensures the chart adjusts to the container's size
    maintainAspectRatio: false, // Disables default aspect ratio for better control
    scales: {
      y: {
        beginAtZero: true, // Ensures the Y-axis starts from 0
        max: 50000, // Sets a maximum value for the Y-axis
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Formats the Y-axis values with commas
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
        text: "Total Monthly Payments Received",
        font: {
          size: window.innerWidth < 640 ? 16 : 20, // Responsive font size for the title
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

  // Return the Bar chart with applied responsive settings
  return (
    <div className="w-full h-64 sm:h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
