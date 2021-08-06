import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Login from "./Login";
import HorizontalBarChart from "../components/HorizontalBarChart";
import Alert from "../components/popup/Alert";
import Input from "../elements/Input";
import Map from "../components/Map";
import theme from '../styles/theme';
import MainTo from '../components/MainTo';
import MainPopular from '../components/MainPopular';

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <>
      {modal_status && <Login />}

      <Intro>
        <h1>여러분의 <span>백신 접종 후기</span>를 공유해주세요!</h1>
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
width: 100vw;
height: 200px;
background-color: ${theme.bg};

& > h1 {
padding-top: 120px;

font-size: ${theme.headTwoHeight};
line-height: 42px;

color: #FFFFFF;

& > span {
  font-weight: 600;
}
}
`

const MapAndChart = styled.div`
display: flex;
justify-content: center;
margin: 80px auto;
`


export default Main;
