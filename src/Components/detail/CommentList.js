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
import { isMobileOnly } from "react-device-detect";

const CommentList = (props) => {
  const { board, commentId, boardId, comment, createdAt, userId, nickname } =
    props;
  // 현재 유저정보
  const login_user = useSelector((state) => state.user.user.userId);
  const is_login = useSelector((state) => state.user.is_login);
  // 코멘트 컨펌 상태창
  const comment_status = useSelector((state) => state.popup.commentConfirm);
  const dispatch = useDispatch();
  // 리덕스 이용 comment_list 받기

  if (isMobileOnly) {
    return (
      <React.Fragment>
        <Grid
          is_flex="space_colomn"
          margin="16px 0 0 0"
          padding="0 16px 0 16px"
        >
          <Grid is_flex="space_row" margin="0 0 4px 0">
            <p
              style={{
                fontSize: `${theme.bodyfourSize}`,
                lineHeight: `${theme.bodyfourHeight}`,
                color: `${theme.bg}`,
                whiteSpace: "nowrap",
              }}
            >
              {nickname}
            </p>
            <Grid is_flex="center" align="right">
              {is_login && login_user === userId ? (
                <Text
                  color={theme.typoLightGrey2}
                  size={theme.bodyfourSize}
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
                <Text
                  color={theme.typoLightGrey2}
                  size={theme.bodyfourSize}
                  margin="auto 5px auto auto"
                ></Text>
              )}
              <Text size={theme.bodyfourSize} color={theme.typoGrey2}>
                {displayedAt(createdAt)}
              </Text>
            </Grid>
          </Grid>

          <Grid align="left">
            <Text size={theme.bodyfourSize} lineHeight={theme.bodyTwoHeight}>
              {comment}
            </Text>
          </Grid>
          <div
            style={{
              height: "1px",
              width: "100%",
              backgroundColor: `${theme.typoLightGrey2}`,
              marginTop: "16px",
            }}
          ></div>
        </Grid>

        {comment_status && (
          <CommentConfirm confirmMessage="삭제하시겠습니까?" />
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex="space_row" margin="2rem 0">
        <Grid align="left" width="12rem" margin="0 0 auto 0">
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
          <Text size={theme.bodyTwoSize} lineHeight={theme.bodyTwoHeight}>
            {comment}
          </Text>
        </Grid>

        <Grid align="right" width="6rem" margin="0 0 auto 0">
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

        <Grid align="right" width="8rem" margin="0 0 auto 0">
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
