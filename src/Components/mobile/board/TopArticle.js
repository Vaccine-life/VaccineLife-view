import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../redux/configStore";
import { actionClickContents } from "../../../redux/modules/read";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { Grid, Text } from "../../../elements";
import logger from "../../../shared/logger";

const TopArticle = (props) => {
  const {
    board,

    boardId,
    title,
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

  return (
    <Grid padding="0 16px 0 16px">
      <TextDiv onClick={handleMovePage}>
        <TagDiv>공지</TagDiv>
        <TitleDiv>
          <Text color={theme.bg2} size={theme.bodyfourSize}>
            {title}
          </Text>
        </TitleDiv>
      </TextDiv>

      <Div></Div>
    </Grid>
  );
};

const TextDiv = styled.div`
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

const TagDiv = styled.div`
  width: 38px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.white};
  background-color: ${theme.bg2};
  font-size: ${theme.bodyfourSize};
  margin-right: 8px;
`;

export default TopArticle;
