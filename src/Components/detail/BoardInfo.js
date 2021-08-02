import moment from "moment";
import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { history } from "../../redux/configStore";
import displayedAt from "../../shared/displayedAt";
import theme from "../../styles/theme";

const BoardInfo = (props) => {
  const { vacBoardId, title, hits, createdAt, user, likeCount } = props;
  const handleOnClick = () => {
    history.push(`/modify/${vacBoardId}`);
  };

  return (
    <Grid margin="30px auto 24px auto">
      <Grid is_flex="space_row" margin="0 auto 24px auto">
        <Text bold size={theme.headOneSize}>
          {title}
        </Text>
        <BtnWrapper>
          <Button
            _onClick={handleOnClick}
            width="88px"
            height="42px"
            fontSize={theme.bodyTwoSize}
            bg={theme.bg2}
          >
            수정
          </Button>
          <Button
            width="88px"
            height="42px"
            margin="0 0 0 16px"
            fontSize={theme.bodyTwoSize}
            bg={theme.bg}
          >
            삭제
          </Button>
        </BtnWrapper>
      </Grid>
      <NameHitWrapper>
        <Text
          size={theme.bodyOneSize}
          margin="0 5px 0 0"
          color={theme.typoGrey3}
        >
          작성자
        </Text>
        <Text size={theme.bodyOneSize} color={theme.typoGrey3}>
          {user.nickname}
        </Text>
        <VerticalLine />
        <Text
          size={theme.bodyOneSize}
          margin="0 5px 0 0"
          color={theme.typoGrey3}
        >
          조회
        </Text>
        <Text size={theme.bodyOneSize} color={theme.typoGrey3}>
          {hits} 회
        </Text>
        <VerticalLine />
        <Text
          size={theme.bodyOneSize}
          margin="0 5px 0 0"
          color={theme.typoGrey3}
        >
          추천
        </Text>
        <Text size={theme.bodyOneSize} color={theme.typoGrey3}>
          {likeCount}
        </Text>
      </NameHitWrapper>
      <NameHitWrapper>
        <Text size={theme.bodyOneSize} color={theme.typoGrey3}>
          {moment(createdAt).format("YYYY.MM.DD hh:mm")}
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
