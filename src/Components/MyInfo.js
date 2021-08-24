import React from "react";
import theme from "../styles/theme";
import { Grid, Text } from "../elements";
import pencil from "../images/pencil.png";

const MyInfo = () => {
  return (
    <>
      <Text
        width={theme.userSurveywidth}
        lineHeight={theme.mediumButtonHeight}
        size={theme.SubHeadOneSize}
        margin="0 0 40px 0"
        bold
      >
        계정 정보
      </Text>

      <Grid is_flex="space_row" margin="0 0 16px 0">
        <Text
          width={theme.userSurveywidth}
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin="0 55px 0 0 "
        >
          닉네임
        </Text>
        <Grid is_flex="space_row" width="auto" margin="0 auto 0 0">
          <Text size={theme.SubHeadTwoSize}>짖어라왈왈 </Text>
          <img
            src={pencil}
            alt=""
            style={{
              width: `${theme.bodyOneSize}`,
              height: `${theme.bodyOneSize}`,
              margin: "0 0 0 4px",
            }}
          />
        </Grid>
      </Grid>
      <Grid className="아이디 있는 줄" is_flex="space_row" margin="0 0 110px 0">
        <Text
          width={theme.userSurveywidth}
          size={theme.SubHeadTwoSize}
          color={theme.typoGrey3}
          margin="0 55px 0 0 "
        >
          아이디
        </Text>
        <Grid width="auto" margin="0 auto 0 0">
          <Text size={theme.SubHeadTwoSize}>hello</Text>
        </Grid>
      </Grid>

      <Grid is_flex="space_row" margin="0 0 40px 0">
        <Text
          width={theme.userSurveywidth}
          size={theme.SubHeadOneSize}
          margin="0 0 0 0"
          bold
        >
          건강 정보
        </Text>

        <img
          src={pencil}
          alt=""
          style={{
            width: `${theme.bodyOneSize}`,
            height: `${theme.bodyOneSize}`,
            margin: "0 4px 0 auto",
          }}
        />
        <Text size={theme.bodyThreeSize} color={theme.btnColor}>
          수정하기
        </Text>
      </Grid>
    </>
  );
};

export default MyInfo;
