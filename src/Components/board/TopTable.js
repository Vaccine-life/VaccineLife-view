import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionClickContents } from "../../redux/modules/read";

const TopTable = (props) => {
  const { board, type, boardId, title } = props;
  const dispatch = useDispatch();
  // 읽고 쓰기 색변경
  const vac_read_list = useSelector((state) => state.read.vacList);
  const is_read = vac_read_list?.includes(boardId);

  // 공지 페이지 이동
  const handleMovePage = () => {
    dispatch(actionClickContents(board, boardId));
    history.push(`/detail/${boardId}`);
  };

  return (
    <TableThread>
      <Td
        style={{
          color: `${theme.typoBlack}`,
          backgroundColor: `${theme.typoLightGrey1}`,
        }}
      >
        {type}
      </Td>
      <TdTitle onClick={handleMovePage} is_read={is_read}>
        <TextDiv>공지</TextDiv> {title}
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
  text-align: center;
  padding: 16px 0 16px 16px;
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
  padding: 16px 0 16px 16px;
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

export default TopTable;
