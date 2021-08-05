import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

import { Text, Grid, Image } from "../elements";
import syringe from "../images/syringe.png"
import news from "../images/news.png"
import phone from "../images/phone.png"


const Banner = (props) => {

  const syringeAddress = "https://www.mfds.go.kr/vaccine_covid19.jsp"
  const newsAddress = "https://nedrug.mfds.go.kr/pbp/CCBAC01/getItem?&safeLetterNo=458"
  const phoneAddress = "https://ncv.kdca.go.kr/coov"

  return (
    <FixedBanner>
      {/* <Grid is_flex="center" margin="30px"> */}
      <div style={{display:"flex", alignItems:"center", margin:"3rem 10rem"}}>

        <Grid is_flex="space_column" cursor="pointer" _onClick={() => {window.open(syringeAddress)}}>
          <Image shape="square" size="80px" margin="30px 0 0 0" src={syringe}/>
          <Text size={theme.bodyTwoSize} margin="20px"><span style={{color: theme.bg2}}>코로나19</span> 백신·치료제 정보</Text>
        </Grid>

          <Text color="#c1c1c1" size="20px" margin="5px">|</Text>

        <Grid is_flex="space_column" cursor="pointer" _onClick={() => {window.open(newsAddress)}}>
          <Image shape="square" size="80px" margin="30px 0 0 0" src={news}/>
          <Text size={theme.bodyTwoSize} margin="20px"><span style={{color: theme.bg2}}>코로나19</span> 관련 안전성서한(속보)</Text>
        </Grid>

          <Text color="#c1c1c1" size="20px" margin="5px">|</Text>

        <Grid is_flex="space_column" cursor="pointer" _onClick={() => {window.open(phoneAddress)}}>
          <Image shape="square" size="80px" margin="30px 0 0 0" src={phone}/>
          <Text size={theme.bodyTwoSize} margin="20px"><span style={{color: theme.bg2}}>코로나19</span> 전자예방접종증명</Text>
        </Grid>

      </div>
      {/* </Grid> */}
    </FixedBanner>
  );
};

const FixedBanner = styled.div`
  margin-top: auto;
  width: 100%;
  /* position: fixed; */
`;

export default Banner;
