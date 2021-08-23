import React from "react";
import { Grid, Text } from "../elements";
import theme from "../styles/theme";
import MypageCard from "./MypageCard";

const MyLike = (props) => {
  return (
    <Grid>
      <Text
        size={theme.SubHeadOneSize}
        color={theme.typoBlack}
        margin="0 0 40px 0"
        bold
      >
        내가 추천한 글
      </Text>
      <Grid margin="0 0 40px 0">
        <Text
          size={theme.bodyThreeSize}
          color={theme.typoGrey3}
          margin="0 0 16px 0"
        >
          백신 후기
        </Text>
        <MypageCard
          title
          createdAt
          likeCount
          commentCount
          totalVisitors
          board="vaccine"
          boardId
        />
      </Grid>
      <Grid margin="0 0 40px 0">
        <Text
          size={theme.bodyThreeSize}
          color={theme.typoGrey3}
          margin="0 0 16px 0"
        >
          격리 후기
        </Text>
      </Grid>
      <Grid margin="0 0 40px 0">
        <Text
          size={theme.bodyThreeSize}
          color={theme.typoGrey3}
          margin="0 0 16px 0"
        >
          의료진분들께
        </Text>
      </Grid>
    </Grid>
  );
};

export default MyLike;
