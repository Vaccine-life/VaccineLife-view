import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import LikeIconChanger from "../LikeIconChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import displayedAt from "../../shared/displayedAt";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionClickContents } from "../../redux/modules/read";

const TableTr = (props) => {
  const {
    board,
    type,
    nickname,
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

  // 디테일 페이지 이동
  const handleMovePage = () => {
    dispatch(actionClickContents(board, boardId));
    history.push(`/detail/${boardId}`);
  };
  // 띄어쓰기 용
  const typeChanger = (type) => {
    if (type === "아스트라제네카") {
      return "아스트라제네카";
    } else if (type === "아스트라제네카+화이자") {
      return "아스트라제네카 + 화이자";
    } else {
      return type;
    }
  };
  return (
    <TableThread>
      <Td
        style={{
          color: `${theme.typoBlack}`,
          backgroundColor: `${theme.typoLightGrey1}`,
        }}
      >
        {typeChanger(type)}
      </Td>
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
  padding: 16px 0 16px 16px;
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
