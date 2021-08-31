import React from "react";
import { useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import { actionGetTopThree } from "../../redux/modules/board";

import theme from "../../styles/theme";
import Silder from "../mobile/board/Silder";
import PopularCard from "./PopularCard";
import QuarPostCard from "./QuarPostCard";

const Popular = (props) => {
  const { board } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    //  게시판 타입에 따라 디스패치 다르게 실행
    if (board === "vaccine") {
      dispatch(actionGetTopThree("vaccine"));
    } else {
      dispatch(actionGetTopThree("quarantine"));
    }
  }, []);

  const top_list_vac = useSelector((state) => state.board.topThreeVac);
  const top_list_quar = useSelector((state) => state.board.topThreeQuar);

  if (isMobileOnly) {
    return (
      <Wrapper>
        <Grid height={theme.headOneHeight} is_flex="space_row">
          <Text
            margin="42px 0 10px 24px"
            size={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
            bold
          >
            인기글
          </Text>
        </Grid>
        <Grid margin="0">
          <Silder
            board={board}
            top_list_vac={top_list_vac}
            top_list_quar={top_list_quar}
          />
        </Grid>
      </Wrapper>
    );
  }

  return (
    <>
      <Grid is_flex="space_row" margin="0 auto 40px 0">
        <Text size={theme.headOneSize} lineHeight={theme.headOneHeight} bold>
          {board === "vaccine" ? "백신접종" : "격리후기"} 인기글
        </Text>
      </Grid>
      <Grid is_flex="space_row">
        {/* 맵돌리는 부분 카드 하나당*/}
        {board === "vaccine" &&
          top_list_vac?.map((each, index) => {
            return (
              <PopularCard
                key={index}
                board={board}
                boardId={each.vacBoardId}
                title={each.title}
                likeCount={each.likeCount}
                totalVisitors={each.totalVisitors}
                commentCount={each.commentCount}
                contents={each.contents}
                createdAt={each.createdAt}
                type={each.type}
              />
            );
          })}
        {board === "quarantine" &&
          top_list_quar?.map((each, index) => {
            return (
              <QuarPostCard
                key={index}
                board={board}
                boardId={each.quarBoardId}
                title={each.title}
                likeCount={each.likeCount}
                totalVisitors={each.totalVisitors}
                commentCount={each.commentCount}
                contents={each.contents}
                createdAt={each.createdAt}
                type={each.type}
              />
            );
          })}
      </Grid>
    </>
  );
};

Popular.defaultProps = {
  vacBoardId: -1,
  quarBoardId: -1,
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.typoLightGrey1};
  height: 334px;
`;

export default Popular;
