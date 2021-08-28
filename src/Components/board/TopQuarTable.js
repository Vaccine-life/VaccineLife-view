import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import LikeIconChanger from "../LikeIconChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import displayedAt from "../../shared/displayedAt";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { actionClickContents } from "../../redux/modules/read";

const TopQuarTable = (props) => {
  const {
    board,
    boardId,
    title,
    likeCount,
    commentCount,
    totalVisitors,
    createAt,
  } = props;
  const dispatch = useDispatch();
  // 읽고 쓰기 색변경
  const quar_read_list = useSelector((state) => state.read.quarList);
  const is_read = quar_read_list?.includes(boardId);

  const handleMovePage = () => {
    dispatch(actionClickContents(board, boardId));
    history.push(`/quarantinedetail/${boardId}`);
  };

  return (
    <TableThread>
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

export default TopQuarTable;
