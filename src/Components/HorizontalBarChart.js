import React from "react";
/* import { Bar } from "react-chartjs-2"; */
import disc from "../images/disc.png";
import styled from "styled-components";
import theme from "../styles/theme";

const data = {
  labels: ["모더나", "얀센", "AZ", "화이자"],
  datasets: [
    {
      data: [10, 20, 30, 40],
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
      data: [0, 0, 0, 0],
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
  <Wrapper>
    <div>
      <BarTitle1>
        <img src={disc} alt="" />
        <h3>백신 종류별 접종률</h3>
      </BarTitle1>
      <BarBox1>
        {/* <Bar data={data} width={500} height={220} options={options} /> */}
      </BarBox1>
    </div>

    <div style={{ marginTop: "25px" }}>
      <BarTitle2>
        <img src={disc} alt="" />
        <h3>연령대별 백신 접종률</h3>
      </BarTitle2>
      <BarBox2>
        {/* <Bar data={data2} width={500} height={220} options={options} /> */}
      </BarBox2>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-left: 50px;
`;

const BarTitle1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 166px;
  height: 26px;

  & > img {
    width: 24px;
    height: 24px;
  }

  & > h3 {
    width: 138px;
    height: 26px;

    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 26px;
    letter-spacing: -0.3px;
    color: #242424;

    padding-left: 4px;
  }
`;

const BarBox1 = styled.div`
  width: 510px;
  height: 220px;
  background: #ffffff;

  border: 1px solid ${theme.typoLightGrey2};
  box-sizing: border-box;
  border-radius: 16px;
`;

const BarTitle2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 183px;
  height: 26px;

  & > img {
    width: 24px;
    height: 24px;
  }

  & > h3 {
    width: 155px;
    height: 26px;

    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 26px;
    letter-spacing: -0.3px;
    color: #242424;

    padding-left: 4px;
  }
`;

const BarBox2 = styled.div`
  width: 510px;
  height: 220px;

  background: #ffffff;

  border: 1px solid ${theme.typoLightGrey2};
  box-sizing: border-box;
  border-radius: 16px;
`;

export default HorizontalBarChart;
