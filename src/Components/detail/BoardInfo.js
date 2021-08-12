import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { history } from "../../redux/configStore";
import { actionConfirm } from "../../redux/modules/popup";
import displayedRestrict from "../../shared/displayedRestrict";
import logger from "../../shared/logger";
import theme from "../../styles/theme";

const BoardInfo = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const lonin_userId = useSelector((state) => state.user.user.userId);

  const {
    board,
    boardId,
    title,
    userId,
    totalVisitors,
    createdAt,
    nickname,
    likeCount,
  } = props;
  //logger(boardId);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    if (board === "vaccine") {
      history.push(`/modify/${boardId}`);
    } else {
      history.push(`/quarantinemodify/${boardId}`);
    }
  };

  return (
    <Grid margin="30px auto 24px auto">
      <Grid is_flex="space_row" margin="0 auto 24px auto">
        <Text bold size={theme.headOneSize} lineHeight={theme.headOneHeight}>
          {title}
        </Text>
        <BtnWrapper>
          {userId === lonin_userId && is_login && (
            <Button
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadTwoSize}
              bg={theme.bg2}
              bold
              _onClick={handleOnClick}
            >
              수정
            </Button>
          )}
          {userId === lonin_userId && is_login && (
            <Button
              margin="0 0 0 16px"
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadTwoSize}
              bg={theme.bg}
              bold
              _onClick={() => dispatch(actionConfirm())}
            >
              삭제
            </Button>
          )}
        </BtnWrapper>
      </Grid>
      <NameHitWrapper>
        <Text
          size={theme.bodyTwoSize}
          lineHeight={theme.bodyTwoHeight}
          color={theme.typoGrey3}
        >
          {nickname}
        </Text>
        <VerticalLine />
        <Text
          size={theme.bodyTwoSize}
          lineHeight={theme.bodyTwoHeight}
          margin="0 5px 0 0"
          color={theme.typoGrey3}
        >
          조회
        </Text>
        <Text
          size={theme.bodyTwoSize}
          lineHeight={theme.bodyTwoHeight}
          color={theme.typoGrey3}
        >
          {totalVisitors}
        </Text>
        <VerticalLine />
        <Text
          size={theme.bodyTwoSize}
          lineHeight={theme.bodyTwoHeight}
          margin="0 5px 0 0"
          color={theme.typoGrey3}
        >
          추천
        </Text>
        <Text
          size={theme.bodyTwoSize}
          lineHeight={theme.bodyTwoHeight}
          color={theme.typoGrey3}
        >
          {likeCount}
        </Text>
      </NameHitWrapper>
      <NameHitWrapper>
        <Text
          size={theme.bodyTwoSize}
          lineHeight={theme.bodyTwoHeight}
          color={theme.typoGrey3}
        >
          {displayedRestrict(createdAt)}
        </Text>
      </NameHitWrapper>
    </Grid>
  );
};

const NameHitWrapper = styled.div`
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BtnWrapper = styled.div``;

const VerticalLine = styled.div`
  height: 20px;
  width: 1px;
  background-color: ${theme.typoGrey3};
  margin: 0 10px 0 10px;
`;

export default BoardInfo;
