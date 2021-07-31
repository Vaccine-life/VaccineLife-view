import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import theme from "../../styles/theme";

const UserInfo = (props) => {
  const { type, gender, age, disease, degree, afterEffect } = props;

  return (
    <Wrapper>
      <EachWrapper>
        <Grid bg={theme.bg} is_flex="center">
          백신 종류
        </Grid>
        <Grid bg={theme.tagColor} is_flex="center">
          {type}
        </Grid>
      </EachWrapper>

      <EachWrapper>
        <Grid bg={theme.bg} is_flex="center">
          성별
        </Grid>
        <Grid bg={theme.tagColor} is_flex="center">
          {gender}
        </Grid>
      </EachWrapper>

      <EachWrapper>
        <Grid bg={theme.bg} is_flex="center">
          연령대
        </Grid>
        <Grid bg={theme.tagColor} is_flex="center">
          {age}
        </Grid>
      </EachWrapper>

      <EachWrapper>
        <Grid bg={theme.bg} is_flex="center">
          기저질환 유무
        </Grid>
        <Grid bg={theme.tagColor} is_flex="center">
          {disease === 1 ? "유" : "무"}
        </Grid>
      </EachWrapper>

      <EachWrapper>
        <Grid bg={theme.bg} is_flex="center">
          차수
        </Grid>
        <Grid bg={theme.tagColor} is_flex="center">
          {degree} 차
        </Grid>
      </EachWrapper>

      <EachWrapper>
        <Grid bg={theme.bg} is_flex="center">
          후유증
        </Grid>
        <Grid bg={theme.tagColor} is_flex="center">
          {afterEffect}
        </Grid>
      </EachWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`;

const EachWrapper = styled.div`
  width: 30%;
  display: flex;
  height: 30px;
  margin: 10px;
`;
export default UserInfo;
