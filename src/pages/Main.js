import React, { useEffect } from "react";
import theme from "../styles/theme";
import { useSelector } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";
import Login from "./Login";
import Alert from "../components/popup/Alert";
import Intro from "../components/Intro";
import Map from "../components/Map";
import MainTo from "../components/MainTo";
import MainPopular from "../components/MainPopular";
import MainNivoBar from "../components/MainNivoBar";
import NavModal from "../components/mobile/NavModal";
import ModifySurvey from "../components/ModifySurvey";

// Intro: 헤더밑 '여러분의 백신 접종 후기를 공유해주세요!' 파란div
// Map: 지도_지역별 접종수
// MainNivoBar: 차트2개_백신 종류별 접종수, 백신 부작용 Top4
// MainTo: 지도와 차트 밑 백신접종후기/자가격리후기/의료진감사게시판 보러가기
// MainPopular: 백신접종후기/자가격리후기 인기글

const Main = () => {
  // 메인페이지에서도 로그인, 회원가입, 설문조사, 그리고 네브바 모달창이 뜨게 하기
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  const surveyModal_status = useSelector((state) => state.modal.surveyVisible);
  // alert창 뜨게하기
  const alert_status = useSelector((state) => state.popup.alert);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //모바일의 경우
  if (isMobileOnly) {
    return (
      <>
        {navModal_status && <NavModal />}
        {modal_status && <Login />}
        {alert_status && <Alert />}
        <Intro />
        <Map />
        <MainNivoBar />
        <MainTo />
        <MainPopular />
      </>
    );
  }

  //웹의 경우
  return (
    <>
      {modal_status && <Login />}
      {alert_status && <Alert />}
      {surveyModal_status && <ModifySurvey />}
      <Intro />
      <MapAndChart>
        <Map />
        <MainNivoBar />
      </MapAndChart>
      <MainTo />
      <MainPopular board="vaccine" />
    </>
  );
};


// styled-components

const MapAndChart = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px auto 60px auto;
`;

export default Main;
