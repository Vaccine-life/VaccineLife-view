import React from "react";
import theme from "../styles/theme";
import styled from "styled-components";
import { Grid, Text, Button } from "../elements";
import MetaScript from "../shared/MetaScript";

const MyPage = () => {
  return (
    <Grid width={theme.boardWidth} margin={`160px auto 120px auto`}>
      <MetaScript title={`슬기로운 백신생활 | 마이페이지`} />
      <Grid margin="0 auto 40px 0">
        <Text size={theme.headOneSize} lineHeight={theme.headOneHeight} bold>
          마이 페이지
        </Text>
        <Line />
      </Grid>

      <Grid is_flex="space_row">
        <Grid width={theme.mediumButtonWidth} margin="0 120px 0 0">
          <Button>좌단 세로 메뉴</Button>
          <Button>좌단 세로 메뉴</Button>
          <Button>좌단 세로 메뉴</Button>
          <Line />
        </Grid>
        <Grid is_flex="column" margin="0 0 auto 0">
          <Grid is_flex="space_row">
            <Text
              width={theme.userSurveywidth}
              size={theme.SubHeadTwoSize}
              color={theme.typoGrey3}
              margin="0 55px 0 0 "
            >
              닉네임
            </Text>
            <Grid width="auto" margin="0 auto 0 0">
              <Text size={theme.SubHeadTwoSize}>짖어라왈왈</Text>
            </Grid>
          </Grid>
          <Grid>엥</Grid>
          <Grid>엥</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.typoLightGrey2};
  margin: ${theme.SubHeadTwoHeight} 0;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default MyPage;
