import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { actionClickContents } from "../../redux/modules/read";

const TopQuarTable = (props) => {
  const { board, boardId, title } = props;
  const dispatch = useDispatch();
  // 읽고 쓰기 색변경
  const quar_read_list = useSelector((state) => state.read.quarList);
  const is_read = quar_read_list?.includes(boardId);

  // 공지 디테일 페이지 이동
  const handleMovePage = () => {
    dispatch(actionClickContents(board, boardId));
    history.push(`/quarantinedetail/${boardId}`);
  };

  return (
    <TableThread>
      <TdTitle onClick={handleMovePage} is_read={is_read}>
        <TextDiv>공지</TextDiv>
        {title}
      </TdTitle>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
    </TableThread>
  );
};

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoLightGrey2};
  height: 40px;
`;

const TdTitle = styled.td`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 16px 0 16px 16px;
  text-align: center;
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
  color: ${theme.bg2};
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

const TextDiv = styled.div`
  width: 49px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.white};
  background-color: ${theme.bg2};
  font-size: ${theme.bodyTwoSize};
  margin-right: 8px;
`;

export default TopQuarTable;
