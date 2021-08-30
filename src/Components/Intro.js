import React from "react";
import { isMobileOnly } from "react-device-detect";
import IntroCharacter from "../images/IntroCharacter.png";
import styled from "styled-components";
import theme from "../styles/theme";

// Intro: 헤더밑 '여러분의 백신 접종 후기를 공유해주세요!' 파란div

const Intro = () => {

  // 모바일의 경우
  if (isMobileOnly) {
    return (
      <MainIntroMobile>
        <img src={IntroCharacter} alt="" />
        <h1>
          여러분의 <span>백신 접종 후기</span>를 <br /> 공유해주세요!
        </h1>
      </MainIntroMobile>
    );
  }

  //웹의 경우
  return (
    <MainIntro>
      <img src={IntroCharacter} alt="" />
      <h1>
        여러분의 <span>백신 접종 후기</span>를 공유해주세요!
      </h1>
    </MainIntro>
  );
};


// styled-components

// <========= 웹 =========>
// MainIntro: 사람아이콘(img), 글귀(h1), 볼드처리(span)
const MainIntro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 230px;
  background-color: ${theme.bg};
  & > img {
    width: auto;
    height: auto;
    max-width: 330px;
    max-height: 330px;
    padding-top: 92px;
  }
  & > h1 {
    padding-left: 0px;
    padding-top: 75px;
    font-size: ${theme.headTwoHeight};
    line-height: 42px;
    color: #ffffff;
    & > span {
      font-weight: 600;
    }
  }
`;

// <========= 모바일 =========>
const MainIntroMobile = styled.div`
position: relative;
  margin-top: 80px;
  height: 140px;
  background-color: ${theme.bg};
  display: flex;
  align-items: center;
  & > img {
    position: absolute;
    width: auto;
    height: auto;
    max-width: 85%;
    max-height: 85%;
    margin-top: auto;
    left: 40px;
    bottom: 0px;
  }
  & > h1 {
    position: absolute;
    right: 40px;
    width: max-content;
    text-align: right;
    font-size: ${theme.SubHeadTwoSize};
    line-height: 25px;
    color: #ffffff;
    & > span {
      font-weight: 600;
    }
  }
`;

export default Intro;
