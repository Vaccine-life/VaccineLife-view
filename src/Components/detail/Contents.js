import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import "draft-js/dist/Draft.css";
import { convertFromRaw } from "draft-js";
import { Editor, EditorState } from "draft-js";
import { Grid, Text } from "../../elements";
import logger from "../../shared/logger";
import LikeIconChanger from "../LikeIconChanger";
import { isMobileOnly } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { actionPostLike } from "../../redux/modules/like";

const Contents = (props) => {
  // console.log(props)
  const { contents, board, boardId, likeCount } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.userId);
  // 클릭했을때 색 변경 추가할것
  const likeObj =
    board === "vaccine"
      ? {
          vacBoardId: parseInt(boardId),
          userId: parseInt(userId),
        }
      : {
          quarBoardId: parseInt(boardId),
          userId: parseInt(userId),
        };

  const handleLikeClick = () => {
    if (
      likeObj.userId === null ||
      likeObj?.vacBoardId === null ||
      likeObj?.quarBoardId === null
    ) {
      return;
    }
    dispatch(actionPostLike(board, likeObj));
  };
  if (isMobileOnly) {
    return (
      <WrapperM>
        {board === "vaccine" && (
          <Grid
            is_flex="column_left_start"
            height="120px"
            bg={theme.bg4}
            margin="0 0 67px 0"
            padding="0 0 0 29px"
          >
            <Text
              lineHeight={theme.bodyfourHeight}
              size={theme.bodyfourSize}
              bold
            >
              주의사항
            </Text>
            <Text
              lineHeight={theme.bodyfourHeight}
              size={theme.bodyfourSize}
              margin="0"
            >
              * 증상이 수 일 지속될 시 가까운 병원에 내원하십시오.
            </Text>
            <Text lineHeight={theme.bodyfourHeight} size={theme.bodyfourSize}>
              * 특정 병원 이름 언급시 무통보 삭제될 수 있습니다.
            </Text>
          </Grid>
        )}
        <ContentDiv
          isMobile={true}
          dangerouslySetInnerHTML={{ __html: contents }}
        ></ContentDiv>
        <LikeWrapperM>
          <LikeIconChanger
            board={board}
            boardId={boardId}
            size="1x"
            bigHeart
            inBoard={true}
          />
          <p
            style={{
              fontSize: `${theme.bodyTwoSize}`,
              marginBottom: "3px",
              marginLeft: "5.55px",
              fontWeight: "500",
              color: `${theme.btnColor}`,
            }}
          >
            {likeCount}
          </p>
        </LikeWrapperM>
      </WrapperM>
    );
  }

  return (
    <Wrapper>
      {board === "vaccine" && (
        <Grid
          is_flex="column_left_start"
          height="120px"
          bg={theme.bg4}
          margin="0 0 67px 0"
          padding="0 0 0 29px"
        >
          <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize} bold>
            주의사항
          </Text>
          <Text
            lineHeight={theme.bodyTwoHeight}
            size={theme.bodyTwoSize}
            margin="0"
          >
            * 증상이 수 일 지속될 시 가까운 병원에 내원하십시오.
          </Text>
          <Text lineHeight={theme.bodyTwoHeight} size={theme.bodyTwoSize}>
            * 특정 병원 이름 언급시 무통보 삭제될 수 있습니다.
          </Text>
        </Grid>
      )}
      <ContentDiv
        isMobile={false}
        dangerouslySetInnerHTML={{ __html: contents }}
      ></ContentDiv>
      <LikeWrapper>
        {/* <LikeIconChanger board={board} boardId={boardId} size="lg" bigHeart />
        <p
          style={{
            fontSize: `${theme.headTwoSize}`,
            marginBottom: "3px",
            marginLeft: "5.55px",
            fontWeight: "500",
            color: `${theme.btnColor}`,
          }}
        >
          {likeCount}
        </p> */}
        <LikeBtn onClick={handleLikeClick}>
          <LikeIconChanger
            board={board}
            boardId={boardId}
            size="lg"
            bigHeart
            inBoard={true}
          />
          <p
            style={{
              fontSize: `${theme.headTwoSize}`,
              marginLeft: "5.55px",
              fontWeight: "700",
              color: `${theme.bg}`,
            }}
          >
            {likeCount}
          </p>
        </LikeBtn>
      </LikeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 15px 0 15px 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .public-DraftEditor-content {
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  }
`;
const WrapperM = styled.div`
  margin: 23px 0 0 0;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .public-DraftEditor-content {
    padding: 0 16px 0 16px;
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  }
`;

const ContentDiv = styled.div`
  padding: 0 16px 0 16px;
  text-align: start;
  ${(props) =>
    props.isMobile
      ? `
    font-size: ${theme.bodyfourSize};
    line-height: ${theme.bodyfourHeight};
  `
      : `
    font-size: ${theme.bodyOneSize};
    line-height: ${theme.bodyOneHeight};
  `}
`;

const LikeWrapper = styled.div`
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  display: flex;
  margin: 87px auto 45px auto;
  font-size: ${theme.SubHeadOneSize};
  line-height: ${theme.SubHeadOneHeight};
`;

const LikeWrapperM = styled.div`
  width: ${theme.smallButtonWidth};
  height: ${theme.headOneHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px auto 25px auto;
  font-size: ${theme.SubHeadTwoSize};
  line-height: ${theme.SubHeadTwoHeight};
  border: 1.5px solid ${theme.btnColor};
`;

const LikeBtn = styled.button`
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.white};
  border: 1.5px solid ${theme.btnColor};
  :hover {
    cursor: pointer;
    font-size: ${theme.headTwoSize};
  }
`;

export default Contents;
