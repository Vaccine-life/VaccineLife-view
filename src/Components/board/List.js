import React from "react";
import logger from "../../shared/logger";
import styled from "styled-components";
import theme from "../../styles/theme";
import TableTr from "./TableTr";
import InfinityScroll from "../../shared/InfinityScroll";

const List = (props) => {
  const { board } = props;

  return (
    <Table>
      <thead>
        <TableThread>
          <Th style={{ width: `${(100 / 600) * 100}%` }}>태그</Th>
          <Th style={{ width: `${(300 / 600) * 100}%` }}>글제목</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>추천</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>댓글</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>조회</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>날짜</Th>
        </TableThread>
      </thead>
      <tbody>
        {/* map돌리기 */}
        <InfinityScroll>
          <TableTr />
        </InfinityScroll>
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-top: 1px solid ${theme.typoGrey2};
  border-collapse: collapse;
  color: ${theme.typoGrey2};
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
`;

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoGrey2};
  height: 40px;
`;
const Th = styled.th`
  text-align: start;
  line-height: 40px;
  vertical-align: center;
`;
export default List;
