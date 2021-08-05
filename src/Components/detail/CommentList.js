import React from "react";
import moment from "moment";
import theme from "../../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Input, Text, Button, Grid } from "../../elements";
import { dispatch } from "react-redux";

const CommentList = (props) => {
  const { board, comment_list } = props;
  const dispatch = useDispatch();
  // 리덕스 이용 comment_list 받기
  React.useEffect = (() => {}, []);

  return (
    <React.Fragment>
      <Grid is_flex="space_row" margin="2rem 0">
        <Grid align="left" width="12rem">
          <Text
            bold
            size={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
            color={theme.fontColor}
          >
            {props.nickname}
          </Text>
        </Grid>

        <Grid align="left">
          <Text size={theme.bodyTwoSize}>{props.comment}</Text>
        </Grid>

        <Grid align="right" width="6rem">
          <Text
            color={theme.typoLightGrey2}
            size={theme.bodyTwoSize}
            cursor="pointer"
            _onClick={() => {
              console.log("삭제!");
            }}
          >
            삭제
          </Text>
        </Grid>

        <Grid align="right" width="8rem">
          <Text size={theme.bodyTwoSize}>{props.insert_dt}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;
