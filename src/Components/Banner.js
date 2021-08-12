import React, { useState } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import { Text, Grid, Image } from "../elements";
import syringe from "../images/syringe.png";
import news from "../images/news.png";
import phone from "../images/phone.png";
import { withRouter } from "react-router-dom";

const Banner = (props) => {
  const syringeAddress = "https://www.mfds.go.kr/vaccine_covid19.jsp";
  const newsAddress =
    "https://nedrug.mfds.go.kr/pbp/CCBAC01/getItem?&safeLetterNo=458";
  const phoneAddress = "https://ncv.kdca.go.kr/coov";

  const url = history.location.pathname;

  if (url === "/") {
    return (
      <FixedBanner>
        {/* {url==="/" ? (<div style={{backgroundColor:"#ffffff"}}></div>) : (<div style={{backgroundColor:`${theme.typoLightGrey1}`}}></div>)} */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "3rem 10rem",
            backgroundColor: "white",
          }}
        >
          <EachDiv
            // nav={JSON.stringify(url) === "/" ? true : false}
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

          <Text color={theme.typoGrey1} size="20px" margin="5px">
            |
          </Text>

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

          <Text color={theme.typoGrey1} size="20px" margin="5px">
            |
          </Text>

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
        </div>
      </FixedBanner>
    );
  }
  return (
    <FixedBanner>
      {/* {url==="/" ? (<div style={{backgroundColor:"#fffff"}}></div>) : (<div style={{backgroundColor:`${theme.typoLightGrey1}`}}></div>)} */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "3rem 10rem",
          backgroundColor: `${theme.typoLightGrey1}`,
        }}
      >
        <EachDiv
          onClick={() => {
            window.open(syringeAddress);
          }}
        >
          <Image shape="square" size="80px" margin="20px 0 0 0" src={syringe} />
          <Text size={theme.bodyTwoSize} margin="20px">
            <span style={{ color: theme.bg2 }}>코로나19</span> 백신·치료제 정보
          </Text>
        </EachDiv>

        <Text color="#c1c1c1" size="20px" margin="5px">
          |
        </Text>

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

        <Text color="#c1c1c1" size="20px" margin="5px">
          |
        </Text>

        <EachDiv
          onClick={() => {
            window.open(phoneAddress);
          }}
        >
          <Image shape="square" size="80px" margin="20px 0 0 0" src={phone} />
          <Text size={theme.bodyTwoSize} margin="20px">
            <span style={{ color: theme.bg2 }}>코로나19</span> 전자예방접종증명
          </Text>
        </EachDiv>
      </div>
    </FixedBanner>
  );
};

const FixedBanner = styled.div`
  margin-top: auto;
  width: 100%;
  /* position: fixed; */
  /* ${(props) => props.nav && `background-color: #ffffff`} */
`;

const EachDiv = styled.div`
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: ${theme.headTwoSize};
  line-height: ${theme.headTwoHeight};

  flex-direction: column;

  /* ${(props) => props.nav && `background-color: ${theme.typoLightGrey1}`} */
`;

export default withRouter(Banner);
