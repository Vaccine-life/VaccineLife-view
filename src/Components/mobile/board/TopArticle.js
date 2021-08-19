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

const TopArticle = (props) => {
  const {
    board,
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
        <TitleDiv>
          <Text color={theme.errorColor} size={theme.bodyfourSize}>
            {title}
          </Text>
        </TitleDiv>
      </TextDiv>
      <Grid is_flex="space_row">
        <TextDiv>
          <EachDiv>
            {" "}
            <FontAwesomeIcon icon={faCommentAlt} />
            <p style={{ marginLeft: "3px" }}>{commentCount}</p>
          </EachDiv>
          <EachDiv>
            {" "}
            <FontAwesomeIcon icon={faEye} />
            <p style={{ marginLeft: "3px" }}>{totalVisitors}</p>
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
`;

const Div = styled.div`
  background-color: ${theme.typoLightGrey2};
  height: 1px;
  margin: 16px 0 16px 0;
`;
const EachDiv = styled.div`
  height: 100%;
  color: transparent;
  font-size: ${theme.bodyfourSize};
  line-height: ${theme.bodyfourHeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
  margin-top: 3px;
`;

const TitleDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default TopArticle;
