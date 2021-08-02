import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

import { Text, Grid, Image } from "../elements";

const Banner = (props) => {
  return (
    <FixedBanner>
      <Grid is_flex="center" padding="10px 0">
        <Grid is_flex="space_column">
          <Image shape="squre" size="40px" cursor="pointer" src="https://pbs.twimg.com/media/EwiXRXDUUAEcOkL.jpg"/>
          <Text size="12px" margin="20px"><span style={{color: theme.bg2}}>코로나19</span> 백신·치료제 정보</Text>
        </Grid>
          <Text color="#c1c1c1" size="20px" margin="5px">|</Text>
        <Grid is_flex="space_column">
          <Image shape="squre" size="40px" src="https://pbs.twimg.com/media/EwiXRXDUUAEcOkL.jpg"/>
          <Text size="12px" margin="20px"><span style={{color: theme.bg2}}>코로나19</span> 관련 안전성서한(속보)</Text>
        </Grid>
          <Text color="#c1c1c1" size="20px" margin="5px">|</Text>
        <Grid is_flex="space_column">
          <Image shape="squre" size="40px" src="https://pbs.twimg.com/media/EwiXRXDUUAEcOkL.jpg"/>
          <Text size="12px" margin="20px"><span style={{color: theme.bg2}}>코로나19</span> 전자예방접종증명</Text>
        </Grid>
      </Grid>
    </FixedBanner>
  );
};

const FixedBanner = styled.div`
  margin-top: auto;
  width: 100%;
  /* position: fixed; */
`;

export default Banner;
