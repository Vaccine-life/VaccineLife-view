import React from "react";
import logger from "../../shared/logger";
import styled from "styled-components";
import theme from "../../styles/theme";
import QuarTableTr from "./QuarTableTr";
import InfinityScroll from "../../shared/InfinityScroll";

const QuarList = (props) => {
  const { board } = props;
  // dispatch 하기  boardId를 넣을것
  return (
    <Table>
      <thead>
        <TableThread>
          <Th style={{ width: `${(320 / 600) * 100}%` }}>글제목</Th>
          <Th style={{ width: `${(70 / 600) * 100}%` }}>추천</Th>
          <Th style={{ width: `${(70 / 600) * 100}%` }}>댓글</Th>
          <Th style={{ width: `${(70 / 600) * 100}%` }}>조회</Th>
          <Th style={{ width: `${(70 / 600) * 100}%` }}>날짜</Th>
        </TableThread>
      </thead>
      <tbody>
        <InfinityScroll>
          {/* map돌리기 */}
          <QuarTableTr />
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
export default QuarList;
