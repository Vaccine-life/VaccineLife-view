import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../redux/configStore";
import { actionClickContents } from "../../../redux/modules/read";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import LikeIconChanger from "../../LikeIconChanger";
import displayedAt from "../../../shared/displayedAt";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { Grid, Text } from "../../../elements";
import logger from "../../../shared/logger";

const Ariticle = (props) => {
  const {
    board,
    nickname,
    type,
    boardId,
    title,
    likeCount,
    commentCount,
    totalVisitors,
    createAt,
  } = props;
  const dispatch = useDispatch();
  // 읽고 쓰기 색변경
  const vac_read_list = useSelector((state) => state.read.vacList);
  const quar_read_list = useSelector((state) => state.read.quarList);
  const is_read =
    board === "vaccine"
      ? vac_read_list?.includes(boardId)
      : quar_read_list?.includes(boardId);

  logger(is_read);

  const handleMovePage = () => {
    dispatch(actionClickContents(board, boardId));
    if (board === "vaccine") {
      history.push(`/detail/${boardId}`);
    } else {
      history.push(`/quarantinedetail/${boardId}`);
    }
  };
  const typeChanger = (type) => {
    if (type === "아스트라제네카") {
      return "AZ";
    } else if (type === "아스트라제네카 + 화이자") {
      return "AZ + PF";
    } else {
      return type;
    }
  };

  return (
    <Grid padding="0 16px 0 16px">
      <TextDiv onClick={handleMovePage}>
        {board === "vaccine" && (
          <Text size={theme.bodyfourSize} color={theme.bg2} margin="0 4px 0 0">
            [{typeChanger(type)}]
          </Text>
        )}
        <TitleDiv>
          <Text
            block={true}
            color={is_read ? theme.typoGrey2 : theme.bodyfourSize}
            size={theme.bodyfourSize}
          >
            {title}
          </Text>
          <CommentPara>[{commentCount}]</CommentPara>
        </TitleDiv>
        <NameDiv>{nickname}</NameDiv>
      </TextDiv>
      <Grid is_flex="space_row">
        <TextDiv>
          <EachDiv>
            {" "}
            <LikeIconChanger board={board} boardId={boardId} />
            <p style={{ marginLeft: "5.03px" }}>{likeCount}</p>
          </EachDiv>

          <EachDiv>
            {" "}
            <FontAwesomeIcon icon={faEye} />
            <p style={{ marginLeft: "5.03px" }}>{totalVisitors}</p>
          </EachDiv>
        </TextDiv>
        <Text color={theme.typoGrey1}>{displayedAt(createAt)}</Text>
      </Grid>
      <Div></Div>
    </Grid>
  );
};

const TextDiv = styled.div`
  text-align: start;
  display: flex;
  margin-bottom: 6px;
`;

const TitleDiv = styled.div`
  width: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Div = styled.div`
  background-color: ${theme.typoLightGrey2};
  height: 1px;
  margin: 16px 0 16px 0;
`;
const EachDiv = styled.div`
  height: 100%;
  color: ${theme.typoGrey1};
  font-size: ${theme.bodyfourSize};
  line-height: ${theme.bodyfourHeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 14px;
`;

const NameDiv = styled.div`
  font-size: ${theme.bodyfourSize};
  color: ${theme.typoBlack};
  margin: 0 0 0 auto;
`;

const CommentPara = styled.p`
  color: ${theme.bg2};
  font-size: ${theme.bodyfourSize};
  margin-left: 4px;
`;

export default Ariticle;
