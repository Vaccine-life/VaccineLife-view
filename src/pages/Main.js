import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Login from "./Login";
import HorizontalBarChart from "../components/HorizontalBarChart";
import Alert from "../components/popup/Alert";
import Input from "../elements/Input";
import Map from "../components/Map";
import theme from '../styles/theme';

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);

  return (
    <>
      {modal_status && <Login />}
      <Intro>
        <h1>여러분의 <span>백신 접종 후기</span>를 공유해주세요</h1>
      </Intro>
      <MapAndChart>
        <Map />
        <HorizontalBarChart />
      </MapAndChart>
      {alert_status && <Alert />}
    </>
  );
};

const MapAndChart = styled.div`
  display: flex;
  justify-content: space-around;
`

const Intro = styled.div`
  background-color: ${theme.bg};
  height: 200px;
  margin-bottom: 100px;
  & > h1 {
    color: white;
    font-size: 30px;
    padding-top: 115px;
    & > span {
      font-weight: 600;
    }
  }
`



export default Main;
