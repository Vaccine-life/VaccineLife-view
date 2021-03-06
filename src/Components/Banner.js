import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import { Text, Image } from "../elements";
import syringe from "../images/syringe.png";
import news from "../images/news.png";
import phone from "../images/phone.png";
import { withRouter } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import BannerMobile from "./mobile/BannerMobile";

// 코로나19관련 정보링크를 뫃아놓은 배너
const Banner = (props) => {
  const syringeAddress = "https://www.mfds.go.kr/vaccine_covid19.jsp";
  const newsAddress =
    "https://nedrug.mfds.go.kr/pbp/CCBAC01/getItem?&safeLetterNo=458";
  const phoneAddress = "https://ncv.kdca.go.kr/coov";

  // 현재 페이지의 경로명(pathname)을 가져와서 배너 색상을 분기함.
  const url = history.location.pathname;

  if (isMobileOnly) {
    return (
      <>
        <BannerMobile />
      </>
    );
  }

  // 브라우저
  if (url === "/") {
    return (
      <FixedBanner>
        <Common style={{ backgroundColor: "white" }}>
          <EachDiv
            onClick={() => {
              window.open(syringeAddress);
            }}
          >
            <Image
              shape="square"
              size="80px"
              margin="20px 0 0 0"
              src={syringe}
            />
            <Text size={theme.bodyTwoSize} margin="20px">
              <span style={{ color: theme.bg2 }}>코로나19</span> 백신·치료제
              정보
            </Text>
          </EachDiv>

          <Stick>
            <Text color={theme.typoGrey1} size="20px" margin="5px">
              |
            </Text>
          </Stick>

          <EachDiv
            onClick={() => {
              window.open(newsAddress);
            }}
          >
            <Image shape="square" size="80px" margin="20px 0 0 0" src={news} />
            <Text size={theme.bodyTwoSize} margin="20px">
              <span style={{ color: theme.bg2 }}>코로나19</span> 관련
              안전성서한(속보)
            </Text>
          </EachDiv>

          <Stick>
            <Text color={theme.typoGrey1} size="20px" margin="5px">
              |
            </Text>
          </Stick>

          <EachDiv
            onClick={() => {
              window.open(phoneAddress);
            }}
          >
            <Image shape="square" size="80px" margin="20px 0 0 0" src={phone} />
            <Text size={theme.bodyTwoSize} margin="20px">
              <span style={{ color: theme.bg2 }}>코로나19</span>{" "}
              전자예방접종증명
            </Text>
          </EachDiv>
        </Common>
      </FixedBanner>
    );
  }
  return (
    <FixedBanner>
      <Common style={{ backgroundColor: `${theme.typoLightGrey1}` }}>
        <EachDiv
          onClick={() => {
            window.open(syringeAddress);
          }}
        >
          <Image shape="square" size="80px" margin="20px 0 0 0" src={syringe} />
          <Text size={theme.bodyTwoSize} color={theme.typoBlack} margin="20px">
            <span style={{ color: theme.bg2 }}>코로나19</span> 백신·치료제 정보
          </Text>
        </EachDiv>

        <Stick>
          <Text color={theme.typoGrey1} size="20px" margin="5px">
            |
          </Text>
        </Stick>

        <EachDiv
          onClick={() => {
            window.open(newsAddress);
          }}
        >
          <Image shape="square" size="80px" margin="20px 0 0 0" src={news} />
          <Text size={theme.bodyTwoSize} color={theme.typoBlack} margin="20px">
            <span style={{ color: theme.bg2 }}>코로나19</span> 관련
            안전성서한(속보)
          </Text>
        </EachDiv>

        <Stick>
          <Text color={theme.typoGrey1} size="20px" margin="5px">
            |
          </Text>
        </Stick>

        <EachDiv
          onClick={() => {
            window.open(phoneAddress);
          }}
        >
          <Image shape="square" size="80px" margin="20px 0 0 0" src={phone} />
          <Text size={theme.bodyTwoSize} color={theme.typoBlack} margin="20px">
            <span style={{ color: theme.bg2 }}>코로나19</span> 전자예방접종증명
          </Text>
        </EachDiv>
      </Common>
    </FixedBanner>
  );
};

const FixedBanner = styled.div`
  margin-top: auto;
  width: 100%;
`;

const EachDiv = styled.div`
  white-space: nowrap;
  cursor: pointer;
  /* width: auto; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: ${theme.headTwoSize};
  line-height: ${theme.headTwoHeight};
  flex-direction: column;
`;

const Common = styled.div`
  display: flex;
  padding: 3rem 10rem;
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
    margin: auto;
  }
`;

const Stick = styled.div`
  @media (max-width: 960px) {
    transform: rotate(90deg);
    transform-origin: 50% 60%;
    -ms-transform: rotate(90deg); // IE 9 이상에서 사용
    -webkit-transform: rotate(90deg); // 사파리, 크롬, 오페라 브라우저 사용
  }
`;

export default withRouter(Banner);
