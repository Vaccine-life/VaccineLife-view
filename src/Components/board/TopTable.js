import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import LikeIconChanger from "../LikeIconChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import displayedAt from "../../shared/displayedAt";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionClickContents } from "../../redux/modules/read";
import logger from "../../shared/logger";

const TopTable = (props) => {
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
  const is_read = vac_read_list?.includes(boardId);

  const handleMovePage = () => {
    dispatch(actionClickContents(board, boardId));
    history.push(`/detail/${boardId}`);
  };

  return (
    <TableThread>
      <Td
        style={{
          color: `${theme.errorColor}`,
          fontWeight: "700",
          backgroundColor: `rgba(237, 242, 255, 0.5)`,
        }}
      >
        {type}
      </Td>
      <TdTitle onClick={handleMovePage} is_read={is_read}>
        {title}
      </TdTitle>
      <Td style={{ color: `${theme.errorColor}` }}>관리자</Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>

      <Td>{displayedAt(createAt)}</Td>
    </TableThread>
  );
};

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoGrey2};
  height: 40px;
`;

const TdTitle = styled.td`
  text-align: start;
  padding-left: 15px;
  vertical-align: middle;
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
  color: ${theme.errorColor};
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  :hover {
    color: ${theme.bg2};
  }
`;

const Td = styled.td`
  text-align: start;
  padding-left: 15px;
  vertical-align: middle;
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
`;

const EachTdDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default TopTable;
