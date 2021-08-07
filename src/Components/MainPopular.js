import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import PopularCard from "./board/PopularCard";
import Arrow from "../images/Arrow.png";
import { history } from "../redux/configStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetTopThreeVac } from "../redux/modules/board";

const MainPopular = (props) => {
  const { board } = props;
  const dispatch = useDispatch();
  // 백신 접종 후기 탑3 dispatch 해주기
  // 추후 격리용으로 재사용시 참고하기: board==="vaccine"이 true면 백신top3가 나오는거고 false면 격리top3 나오는거
  useEffect(() => {
    //  게시판 타입에 따라 디스패치 다르게 할 것
    if (board === "vaccine") {
      dispatch(actionGetTopThreeVac("vaccine"));
    } else {
      dispatch(actionGetTopThreeVac("quarantine"));
    }
  }, []);
  const top_list = useSelector((state) => state.board.topThree);
  return (
    <div>
      <GreyBox>
        <PopularTitle>
          <h1>백신 접종 후기 인기글</h1>

          <div>
            <h3
              onClick={() => {
                history.push("/vaccine");
              }}
            >
              더보기
            </h3>
            <img src={Arrow} alt="" />
          </div>
        </PopularTitle>

        <PopularCards>
          {board === "vaccine" &&
            top_list?.map((each, index) => {
              return (
                <PopularCard
                  key={index}
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
        </PopularCards>
      </GreyBox>
    </div>
  );
};

const GreyBox = styled.div`
  background-color: ${theme.typoLightGrey1};
  width: 100vw;
  height: 630px;
  margin-top: 90px;
`;

const PopularTitle = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-between;
  /* background-color: red; */
  margin: auto;

  & > h1 {
    width: 212px;
    height: 34px;

    font-weight: bold;
    font-size: ${theme.headOneSize};
    line-height: 34px;

    text-align: center;
    letter-spacing: -0.3px;

    color: #242424;

    padding-top: 5%;
  }

  & > div {
    display: flex;
    cursor: pointer;
    margin-top: 6%;

    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }

    & > h3 {
      width: 60px;
      height: 26px;

      font-weight: normal;
      font-size: ${theme.bodyOneSize};
      line-height: 26px;

      text-align: center;
      letter-spacing: -0.3px;

      color: ${theme.typoGrey3};
    }

    & > img {
      width: auto;
      height: auto;
      max-width: 15px;
      max-height: 15px;

      margin-top: 7px;
      margin-left: 8px;
    }
  }
`;

const PopularCards = styled.div`
  display: flex;
  width: 90vw;
  /* background-color: gray; */
  margin-left: 5%;

  padding-top: 40px;
`;

export default MainPopular;
