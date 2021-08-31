import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import TableTr from "./TableTr";
import InfinityScroll from "../../shared/InfinityScroll";
import { useDispatch, useSelector } from "react-redux";
import { actionGetBoard, actionGetBoardType } from "../../redux/modules/board";
import { isMobileOnly } from "react-device-detect";
import Ariticle from "../mobile/board/Ariticle";
import TopArticle from "../mobile/board/TopArticle";
import TopTable from "./TopTable";
import logger from "../../shared/logger";

const List = (props) => {
  const { board } = props;
  const is_loading = useSelector((state) => state.isLoading.isLoading);
  // 백신보드 페이지 보기(무한스크롤용)
  const pagingVac = useSelector((state) => state.board.pagingVac);
  const { nextPage, totalPage } = pagingVac;
  // 필터링용 보드타입 전환
  const board_type = useSelector((state) => state.board.type);
  // 백신 게시판 리스트 받아오기
  const vac_list = useSelector((state) => state.board.listVac);

  const dispatch = useDispatch();

  const nextCall = () => {
    if (board_type === "전체") {
      dispatch(actionGetBoard(board));
    } else {
      dispatch(actionGetBoardType(board, board_type));
    }
  };

  useEffect(() => {
    if (board_type === "전체") {
      dispatch(actionGetBoard(board));
    } else {
      logger(board_type);
      dispatch(actionGetBoardType(board, board_type));
    }
  }, [board_type]);

  if (isMobileOnly) {
    return (
      <InfinityScroll
        nextCall={nextCall}
        is_next={nextPage <= totalPage ? true : false}
        is_loading={is_loading}
        size={750}
      >
        {/* map돌리기 */}
        <TopArticle
          board={board}
          type="공지"
          title="슬기로운 백신생활에서 준비한 이벤트!"
          likeCount={0}
          commentCount={0}
          totalVisitors={0}
          createAt="2021-08-19 16:33:33"
          boardId={70}
        />
        {vac_list?.map((each, index) => {
          return (
            <Ariticle
              nickname={each.nickname}
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
          <Th
            style={{
              width: `${(100 / 600) * 100}%`,
              backgroundColor: `${theme.typoLightGrey1}`,
            }}
          >
            태그
          </Th>
          <Th style={{ width: `${(270 / 600) * 100}%` }}>글제목</Th>
          <Th style={{ width: `${(80 / 600) * 100}%` }}>작성자</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>추천</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>조회</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>날짜</Th>
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
          <TopTable
            type="공지"
            title="슬기로운 백신생활에서 준비한 이벤트!"
            likeCount={0}
            commentCount={0}
            totalVisitors={0}
            createAt="2021-08-19 16:33:33"
            boardId={70}
          />
          {vac_list?.map((each, index) => {
            return (
              <TableTr
                nickname={each.nickname}
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
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-top: 1px solid ${theme.typoLightGrey2};
  border-collapse: collapse;
  color: ${theme.typoGrey2};
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
  margin-bottom: 50px;
`;

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoLightGrey2};
`;
const Th = styled.th`
  text-align: start;
  vertical-align: middle;
  padding: 16px 0 16px 16px;
`;
export default List;
