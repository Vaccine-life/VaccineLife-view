import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import { Text, Image } from "../elements";
import syringe from "../images/syringe.png"
import news from "../images/news.png"
import phone from "../images/phone.png"
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
        <Common>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "3rem 10rem",
            backgroundColor: "white",
          }}
        >
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
            <Text color="#c1c1c1" size="20px" margin="5px">|</Text>
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
            <Text color="#c1c1c1" size="20px" margin="5px">|</Text>
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
        </div>
        </Common>
      </FixedBanner>
    );
  }
  return (
    <FixedBanner>
      <Common>
      <div 
        style={{
          display:"flex", 
          alignItems:"center", 
          padding:"3rem 10rem", 
          backgroundColor:`${theme.typoLightGrey1}`
        }}
      >

        <EachDiv onClick={() => {window.open(syringeAddress)}}>
          <Image shape="square" size="80px" margin="20px 0 0 0" src={syringe}/>
          <Text 
            size={theme.bodyTwoSize} 
            color={theme.typoBlack} 
            margin="20px">
              <span style={{color: theme.bg2}}>코로나19</span> 백신·치료제 정보
          </Text>
        </EachDiv>

        <Stick>
          <Text color="#c1c1c1" size="20px" margin="5px">|</Text>
        </Stick>

        <EachDiv onClick={() => {window.open(newsAddress)}}>
          <Image shape="square" size="80px" margin="20px 0 0 0" src={news}/>
          <Text 
            size={theme.bodyTwoSize} 
            color={theme.typoBlack} 
            margin="20px">
              <span style={{color: theme.bg2}}>코로나19</span> 관련 안전성서한(속보)
          </Text>
        </EachDiv>

        <Stick>
          <Text color="#c1c1c1" size="20px" margin="5px">|</Text>
        </Stick>

        <EachDiv onClick={() => {window.open(phoneAddress)}}>
          <Image shape="square" size="80px" margin="20px 0 0 0" src={phone}/>
          <Text 
            size={theme.bodyTwoSize} 
            color={theme.typoBlack} 
            margin="20px">
              <span style={{color: theme.bg2}}>코로나19</span> 전자예방접종증명
          </Text>
        </EachDiv>

      </div>
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
  width: 100%;
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
  
  @media (max-width: 700px) {
    display: block;
    flex-direction: column;
    text-align: left;
    
  }
`

const Stick = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

export default withRouter(Banner);
