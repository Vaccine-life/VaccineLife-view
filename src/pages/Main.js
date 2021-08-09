import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Login from "./Login";
import HorizontalBarChart from "../components/HorizontalBarChart";
import Alert from "../components/popup/Alert";
import IntroCharacter from "../images/IntroCharacter.png"

import Map from "../components/Map";
import theme from "../styles/theme";
import MainTo from "../components/MainTo";
import MainPopular from "../components/MainPopular";

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <>
      {modal_status && <Login />}

      <Intro>
        <img src={IntroCharacter} alt="" />
        <h1>
          여러분의 <span>백신 접종 후기</span>를 공유해주세요!
        </h1>
      </Intro>

      <MapAndChart>
        <Map />
        <HorizontalBarChart />
      </MapAndChart>

      <MainTo />

      <MainPopular board="vaccine" />

      {alert_status && <Alert />}
    </>
  );
};

const Intro = styled.div`
display: flex;
position: relative;

width: 100vw;
height: 200px;
background-color: ${theme.bg};

& > img {
  width: auto;
  height: auto;
  max-width: 330px;
  max-height: 330px;
  
  position: absolute;
  left: 300px;
  top: 85px;
}

& > h1 {
  position: absolute;
  left: 550px;
  top: 120px;


/* padding: 120px 0px 0px 500px; */
font-size: ${theme.headTwoHeight};
line-height: 42px;

color: #ffffff;

& > span {
font-weight: 600;
}
}
`;

const MapAndChart = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px auto;
`;

export default Main;
