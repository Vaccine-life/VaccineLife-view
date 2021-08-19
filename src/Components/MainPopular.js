import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import PopularCard from "./board/PopularCard";
import QuarPostCard from "./board/QuarPostCard";
import Arrow from "../images/Arrow.png";
import Slider from "./mobile/board/Silder";
import { history } from "../redux/configStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetTopThree } from "../redux/modules/board";
import { isMobileOnly } from "react-device-detect";

const MainPopular = (props) => {
  const { board } = props;
  const dispatch = useDispatch();
  // 백신 접종 후기 탑3 dispatch 해주기
  // 추후 격리용으로 재사용시 참고하기: board==="vaccine"이 true면 백신top3가 나오는거고 false면 격리top3 나오는거
  useEffect(() => {
    //  게시판 타입에 따라 디스패치 다르게 할 것
    dispatch(actionGetTopThree("vaccine"));
    dispatch(actionGetTopThree("quarantine"));
  }, []);
  const top_list_vac = useSelector((state) => state.board.topThreeVac);
  const top_list_quar = useSelector((state) => state.board.topThreeQuar);

  if (isMobileOnly) {
    return (
      <>
        <MainPopularWrapperMobile>
          <GreyBoxMobile>
            <PopularTitleMobile>
              <h1>백신 접종 후기 인기글</h1>
              <h3
                onClick={() => {
                  history.push("/vaccine");
                }}
              >
                더보기
              </h3>
            </PopularTitleMobile>
            <Slider
              board="vaccine"
              top_list_vac={top_list_vac}
              top_list_quar={top_list_quar}
            />
            <PopularTitleMobile style={{ marginTop: "32px" }}>
              <h1>자가 격리 후기 인기글</h1>
              <h3
                onClick={() => {
                  history.push("/vaccine");
                }}
              >
                더보기
              </h3>
            </PopularTitleMobile>
            <Slider
              board="quarantine"
              top_list_vac={top_list_vac}
              top_list_quar={top_list_quar}
            />
          </GreyBoxMobile>
        </MainPopularWrapperMobile>
      </>
    );
  }

  return (
    <div style={{ marginTop: "90px" }}>
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
            top_list_vac?.map((each, index) => {
              return (
                <div>
                  <PopularCard
                    key={index}
                    board="vaccine"
                    boardId={each.vacBoardId}
                    title={each.title}
                    likeCount={each.likeCount}
                    totalVisitors={each.totalVisitors}
                    commentCount={each.commentCount}
                    contents={each.contents}
                    createdAt={each.createdAt}
                    type={each.type}
                  />
                </div>
              );
            })}
        </PopularCards>
      </GreyBox>

      <GreyBox>
        <PopularTitle>
          <h1>자가격리 후기 인기글</h1>
          <div>
            <h3
              onClick={() => {
                history.push("/quarantine");
              }}
            >
              더보기
            </h3>
            <img src={Arrow} alt="" />
          </div>
        </PopularTitle>
        <PopularCards>
          {top_list_quar?.map((each, index) => {
            return (
              <div>
                <QuarPostCard
                  key={index}
                  board="quarantine"
                  boardId={each.quarBoardId}
                  title={each.title}
                  likeCount={each.likeCount}
                  totalVisitors={each.totalVisitors}
                  commentCount={each.commentCount}
                  contents={each.contents}
                  createdAt={each.createdAt}
                  type={each.type}
                />
              </div>
            );
          })}
        </PopularCards>
      </GreyBox>
    </div>
  );
};

const GreyBox = styled.div`
  background-color: ${theme.typoLightGrey1};
  width: 100%;
  height: 550px;
`;

const PopularTitle = styled.div`
  display: flex;
  width: 1250px;
  justify-content: space-between;
  margin: auto;
  padding-bottom: 20px;
  /* background-color: red; */
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
      color: ${theme.typoGrey1};
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
  justify-content: space-between;
  width: 1250px;
  height: 66%;
  margin: auto;
`;

// <========= Mobile ===========>

const MainPopularWrapperMobile = styled.div`
  width: 100%;
`;

const GreyBoxMobile = styled.div`
  background-color: ${theme.typoLightGrey1};
  height: 640px;
  margin-top: 48px;
  padding-top: 32px;
`;

const PopularTitleMobile = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: space-between;
  & > h1 {
    width: max-content;
    height: 34px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
  & > h3 {
    width: 50px;
    height: 34px;
    font-weight: normal;
    font-size: ${theme.bodyThreeSize};
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.3px;
    color: ${theme.typoGrey3};
  }
`;

export default MainPopular;
