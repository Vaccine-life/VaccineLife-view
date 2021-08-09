import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import LikeIconChanger from "../LikeIconChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import displayedAt from "../../shared/displayedAt";
import { history } from "../../redux/configStore";

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

  const handleMovePage = () => {
    history.push(`/detail/${boardId}`);
  };

  return (
    <TableThread>
      <Td style={{ color: "black" }}>{type}</Td>
      <TdTitle onClick={handleMovePage}>{title}</TdTitle>
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
  color: black;
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
