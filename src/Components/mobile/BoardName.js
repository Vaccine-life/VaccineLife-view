import React from "react";
import { Grid, Text } from "../../elements";
import theme from "../../styles/theme";

const BoardName = (props) => {
  const { board } = props;
  return (
    <Grid is_flex="center" margin="0" height="60px" bg={theme.bg2}>
      <Text
        color={theme.white}
        size={theme.SubHeadOneSize}
        lineHeight={theme.headOneHeight}
        bold
      >
        {board === "vaccine" ? "백신 접종" : "격리"} 후기 게시판
      </Text>
    </Grid>
  );
};

export default BoardName;
