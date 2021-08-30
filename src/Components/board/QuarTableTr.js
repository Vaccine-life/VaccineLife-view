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

const TableTr = (props) => {
  const {
    nickname,
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
        <CommentPara>[{commentCount}]</CommentPara>
      </TdTitle>
      <Td style={{ color: `${theme.typoGrey2}` }}>{nickname}</Td>
      <Td>
        <EachTdDiv>
          {" "}
          <LikeIconChanger board={board} boardId={boardId} />
          <p style={{ marginLeft: "5.55px" }}>{likeCount}</p>
        </EachTdDiv>
      </Td>

      <Td>
        <EachTdDiv>
          {" "}
          <FontAwesomeIcon icon={faEye} />
          <p style={{ marginLeft: "5.55px" }}>{totalVisitors}</p>
        </EachTdDiv>
      </Td>
      <Td>{displayedAt(createAt)}</Td>
    </TableThread>
  );
};

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoLightGrey2};
  height: 40px;
`;

const TdTitle = styled.td`
  text-align: start;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  vertical-align: middle;
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
  ${(props) => (props.is_read ? `color:${theme.typoGrey2};` : `color: black;`)}
  cursor: pointer;
  :hover {
    color: ${theme.bg2};
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const CommentPara = styled.p`
  color: ${theme.bg2};
  font-size: ${theme.bodyTwoSize};
  margin-left: 4px;
`;

export default TableTr;
