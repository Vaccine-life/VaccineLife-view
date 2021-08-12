import React from "react";
import moment from "moment";
import theme from "../../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Text, Grid } from "../../elements";
import { dispatch } from "react-redux";
import displayedAt from "../../shared/displayedAt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import CommentConfirm from "../popup/CommentConfirm";
import {
  acionSetCommentObj,
  actionCommentConfirm,
} from "../../redux/modules/popup";
import logger from "../../shared/logger";
import { actionDeleteCommentList } from "../../redux/modules/comment";

const CommentList = (props) => {
  const { board, commentId, boardId, comment, createdAt, userId, nickname } =
    props;
  const login_user = useSelector((state) => state.user.user.userId);
  const is_login = useSelector((state) => state.user.is_login);
  const comment_status = useSelector((state) => state.popup.commentConfirm);
  const dispatch = useDispatch();
  // 리덕스 이용 comment_list 받기

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
            {nickname}
          </Text>
        </Grid>

        <Grid align="left">
          <Text size={theme.bodyTwoSize}>{comment}</Text>
        </Grid>

        <Grid align="right" width="6rem">
          {is_login && login_user === userId ? (
            <Text
              color={theme.typoLightGrey2}
              size={theme.bodyTwoSize}
              margin="auto 5px auto auto"
              cursor="pointer"
              _onClick={() => {
                dispatch(acionSetCommentObj({ board, commentId, boardId }));
                dispatch(actionCommentConfirm());
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Text>
          ) : (
            ""
          )}
        </Grid>

        <Grid align="right" width="8rem">
          <Text size={theme.bodyTwoSize} color={theme.typoGrey2}>
            {displayedAt(createdAt)}
          </Text>
        </Grid>
      </Grid>

      {comment_status && <CommentConfirm confirmMessage="삭제하시겠습니까?" />}
    </React.Fragment>
  );
};

export default CommentList;
