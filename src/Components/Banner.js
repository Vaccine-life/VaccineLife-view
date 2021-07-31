import React from "react";
import styled from "styled-components";

import { Text, Grid } from "../elements";

const Banner = (props) => {
  return (
    <FixedBanner>
      <Grid bg="#f5f6fa" is_flex="center" padding="10px 0">
        <Grid is_flex="center" width="12rem">
          <Text bold>바로가기 모음</Text>
        </Grid>

        <Grid is_flex="center">
          <Text margin="10px">코로나19 백신·치료제 정보</Text>
          <Text margin="10px">코로나19 관련 안전성서한(속보)</Text>
          <Text margin="10px">코로나19 전자예방접종증명</Text>
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
