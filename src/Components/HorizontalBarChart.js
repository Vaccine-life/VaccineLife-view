import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const data = {
  labels: ["모더나", "얀센", "AZ", "화이자"],
  datasets: [
    {
      data: [38477, 1129762, 2029594, 3948089],
      backgroundColor: [
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
      ],
      borderColor: [
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const data2 = {
  labels: ["10-20", "30-40", "50-60", "70-80"],
  datasets: [
    {
      data: [10, 15, 25, 50],
      backgroundColor: [
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
      ],
      borderColor: [
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
        "rgba(79, 114, 242, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  maintainAspectRatio: false,
  responsive: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const HorizontalBarChart = () => (
  <>
    <div>
      <Bar data={data} width={400} height={200} options={options} />
      <Bar data={data2} width={400} height={200} options={options} />
    </div>
  </>
);

export default HorizontalBarChart;
