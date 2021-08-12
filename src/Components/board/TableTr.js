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

const TableTr = (props) => {
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
      <Td style={{ color: "black" }}>{type}</Td>
      <TdTitle onClick={handleMovePage} is_read={is_read}>
        {title}
      </TdTitle>
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
          <FontAwesomeIcon icon={faCommentAlt} />
          <p style={{ marginLeft: "5.55px" }}>{commentCount}</p>
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
  border-bottom: 1px solid ${theme.typoGrey2};
  height: 40px;
`;

const TdTitle = styled.td`
  text-align: start;
  padding-left: 15px;
  vertical-align: middle;
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
  ${(props) => (props.is_read ? `color:#7D2779;` : `color: black;`)}
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

export default TableTr;
