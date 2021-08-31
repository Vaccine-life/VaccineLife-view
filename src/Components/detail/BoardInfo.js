import React from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { history } from "../../redux/configStore";
import { actionConfirm } from "../../redux/modules/popup";
import displayedRestrict from "../../shared/displayedRestrict";
import theme from "../../styles/theme";

const BoardInfo = (props) => {
  // 로그인 유저 정보
  const is_login = useSelector((state) => state.user.is_login);
  const login_userId = useSelector((state) => state.user.user.userId);

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

  const dispatch = useDispatch();

  // 수정버튼 클릭 함수
  const handleOnClick = () => {
    if (board === "vaccine") {
      history.push(`/modify/${boardId}`);
    } else {
      history.push(`/quarantinemodify/${boardId}`);
    }
  };

  if (isMobileOnly) {
    return (
      <Grid margin="30px auto 52px auto" padding="0 16px 0 16px">
        <Grid is_flex="space_row" margin="0 auto 16px auto">
          <Text
            bold
            size={theme.SubHeadOneSize}
            lineHeight={theme.headOneHeight}
          >
            {title}
          </Text>
          <BtnWrapperM>
            {userId === login_userId && is_login && (
              <Text
                size={theme.SubHeadTwoSize}
                color={theme.bg2}
                _onClick={handleOnClick}
              >
                수정
              </Text>
            )}
            {userId === login_userId && is_login && (
              <Text
                margin="0 0 0 8px"
                size={theme.SubHeadTwoSize}
                color={theme.bg}
                _onClick={() => dispatch(actionConfirm())}
              >
                삭제
              </Text>
            )}
          </BtnWrapperM>
        </Grid>
        <NameHitWrapper>
          <Text
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
            color={theme.typoGrey3}
          >
            {nickname}
          </Text>
          <VerticalLineM />
          <Text
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
            margin="0 5px 0 0"
            color={theme.typoGrey3}
          >
            조회
          </Text>
          <Text
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
            color={theme.typoGrey3}
          >
            {totalVisitors}
          </Text>
          <VerticalLineM />
          <Text
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
            margin="0 5px 0 0"
            color={theme.typoGrey3}
          >
            추천
          </Text>
          <Text
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
            color={theme.typoGrey3}
          >
            {likeCount}
          </Text>
        </NameHitWrapper>
        <NameHitWrapper>
          <Text
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
            color={theme.typoGrey3}
          >
            {displayedRestrict(createdAt)}
          </Text>
        </NameHitWrapper>
      </Grid>
    );
  }

  return (
    <Grid margin="30px auto 24px auto">
      <Grid is_flex="space_row" margin="0 auto 24px auto">
        <Text bold size={theme.headOneSize} lineHeight={theme.headOneHeight}>
          {title}
        </Text>
        <BtnWrapper>
          {userId === login_userId && is_login && (
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
          {userId === login_userId && is_login && (
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
const BtnWrapperM = styled.div`
  display: flex;
`;

const VerticalLine = styled.div`
  height: 20px;
  width: 1px;
  background-color: ${theme.typoGrey3};
  margin: 0 10px 0 10px;
`;
const VerticalLineM = styled.div`
  height: 17px;
  width: 1px;
  background-color: ${theme.typoGrey3};
  margin: 0 10px 0 10px;
`;

export default BoardInfo;
