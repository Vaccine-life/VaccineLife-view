import React, { useEffect } from "react";
import logger from "../../shared/logger";
import styled from "styled-components";
import theme from "../../styles/theme";
import QuarTableTr from "./QuarTableTr";
import InfinityScroll from "../../shared/InfinityScroll";
import { useDispatch, useSelector } from "react-redux";
import { actionGetBoard } from "../../redux/modules/board";
import { isMobileOnly } from "react-device-detect";
import Ariticle from "../mobile/board/Ariticle";

const QuarList = (props) => {
  const { board } = props;
  const is_loading = useSelector((state) => state.isLoading.isLoading);
  const pagingQuar = useSelector((state) => state.board.pagingQuar);
  const { nextPage, totalPage } = pagingQuar;
  const quar_list = useSelector((state) => state.board.listQuar);
  const dispatch = useDispatch();
  const nextCall = () => {
    dispatch(actionGetBoard(board));
  };

  useEffect(() => {
    dispatch(actionGetBoard(board));
  }, []);

  if (isMobileOnly) {
    return (
      <InfinityScroll
        nextCall={nextCall}
        is_next={nextPage <= totalPage ? true : false}
        is_loading={is_loading}
        size={750}
      >
        {/* map돌리기 */}
        {quar_list?.map((each, index) => {
          return (
            <Ariticle
              key={index}
              board={board}
              type={each.type}
              title={each.title}
              likeCount={each.likeCount}
              commentCount={each.commentCount}
              totalVisitors={each.totalVisitors}
              createAt={each.createdAt}
              boardId={each.id}
            />
          );
        })}
      </InfinityScroll>
    );
  }

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
        <InfinityScroll
          nextCall={nextCall}
          is_next={nextPage <= totalPage ? true : false}
          is_loading={is_loading}
          size={300}
        >
          {/* map돌리기 */}
          {quar_list?.map((each, index) => {
            return (
              <QuarTableTr
                key={index}
                board={board}
                title={each.title}
                likeCount={each.likeCount}
                commentCount={each.commentCount}
                totalVisitors={each.totalVisitors}
                createAt={each.createdAt}
                boardId={each.id}
              />
            );
          })}
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
  margin-bottom: 50px;
`;

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoGrey2};
  height: 40px;
`;
const Th = styled.th`
  text-align: start;
  line-height: 40px;
  vertical-align: middle;
  padding-left: 15px;
`;
export default QuarList;
