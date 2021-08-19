import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import TableTr from "./TableTr";
import InfinityScroll from "../../shared/InfinityScroll";
import { useDispatch, useSelector } from "react-redux";
import { actionGetBoard } from "../../redux/modules/board";
import { isMobileOnly } from "react-device-detect";
import Ariticle from "../mobile/board/Ariticle";
import TopArticle from "../mobile/board/TopArticle";
import TopTable from "./TopTable";

const List = (props) => {
  const { board } = props;
  const is_loading = useSelector((state) => state.isLoading.isLoading);
  const pagingVac = useSelector((state) => state.board.pagingVac);
  const { nextPage, totalPage } = pagingVac;
  const vac_list = useSelector((state) => state.board.listVac);
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
        <TopArticle
          board={board}
          type="공지"
          title="슬기로운 백신생활을 이용하고 피드백을 남겨주세요!"
          likeCount={0}
          commentCount={0}
          totalVisitors={0}
          createAt="2021-08-19 16:33:33"
          boardId={70}
        />
        {vac_list?.map((each, index) => {
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
          <Th style={{ width: `${(100 / 600) * 100}%` }}>태그</Th>
          <Th style={{ width: `${(300 / 600) * 100}%` }}>글제목</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>추천</Th>
          <Th style={{ width: `${(50 / 600) * 100}%` }}>댓글</Th>
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
            title="슬기로운 백신생활을 이용하고 피드백을 남겨주세요!"
            likeCount={0}
            commentCount={0}
            totalVisitors={0}
            createAt="2021-08-19 16:33:33"
            boardId={70}
          />
          {vac_list?.map((each, index) => {
            return (
              <TableTr
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
export default List;
