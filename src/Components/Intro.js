import React from "react";
import IntroCharacter from "../images/IntroCharacter.png";
import styled from "styled-components";
import theme from "../styles/theme";
import { isMobileOnly } from "react-device-detect";

const Intro = () => {
  if (isMobileOnly) {
    return (
      <MainIntroWrapperMobile>
        <MainIntroMobile>
          <img src={IntroCharacter} alt="" />
          <h1>
            여러분의 <span>백신 접종 후기</span>를 공유해주세요!
          </h1>
        </MainIntroMobile>
      </MainIntroWrapperMobile>
    );
  }
  return (
    <MainIntro>
      <img src={IntroCharacter} alt="" />
      <h1>
        여러분의 <span>백신 접종 후기</span>를 공유해주세요!
      </h1>
    </MainIntro>
  );
};

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


// <========= Mobile ===========>

const MainIntroWrapperMobile = styled.div`
width: 100%;
`;

const MainIntroMobile = styled.div`
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 140px;
  background-color: ${theme.bg};
  display: flex;
  align-items: center;

  & > img {
    position: absolute;
    width: auto;
    height: auto;
    max-width: 250px;
    max-height: 250px;

    padding-left: 40px;
  }

  & > h1 {
    position: absolute;
    right: 50px;
    width: 180px;
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
