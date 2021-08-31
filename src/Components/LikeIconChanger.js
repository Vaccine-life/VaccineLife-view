import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as amptyHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { actionPostLike } from "../redux/modules/like";
import { isMobileOnly } from "react-device-detect";

const LikeIconChanger = (props) => {
  const { board, boardId, size, bigHeart, inBoard } = props;

  // 좋아요 클릭시 아이디 전송
  const userId = useSelector((state) => state.user.user.userId);
  // 좋아요 누른 아이디 리스트 받기
  const like_list_vac = useSelector((state) => state.like.likeListVac);
  const like_list_quar = useSelector((state) => state.like.likeListQuar);
  const dispatch = useDispatch();

  // 현재 게시판 타입에 따라 게시판 아이디가
  // 좋아요 리스트포함 여부에 따라 true false
  const isHeart =
    board === "vaccine"
      ? like_list_vac.includes(boardId)
      : like_list_quar.includes(boardId);

  // 좋아요 클릭시 게시판 타입에 따른 객체 구성
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
    // 상세글 안에 좋아요 클릭버튼이면 리턴
    if (inBoard) {
      return;
    }
    // null값 존재시 리턴
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
    if (bigHeart) {
      return (
        <BigWrapperM isHeart={isHeart} onClick={handleLikeClick}>
          {isHeart ? (
            <FontAwesomeIcon icon={faHeart} size={size} />
          ) : (
            <FontAwesomeIcon icon={amptyHeart} size={size} />
          )}
        </BigWrapperM>
      );
    } else {
      return (
        <WrapperM isHeart={isHeart} onClick={handleLikeClick}>
          {isHeart ? (
            <FontAwesomeIcon icon={faHeart} size={size} />
          ) : (
            <FontAwesomeIcon icon={amptyHeart} size={size} />
          )}
        </WrapperM>
      );
    }
  }

  if (bigHeart) {
    return (
      <BigWrapper isHeart={isHeart} onClick={handleLikeClick}>
        {isHeart ? (
          <FontAwesomeIcon icon={faHeart} size={size} />
        ) : (
          <FontAwesomeIcon icon={amptyHeart} size={size} />
        )}
      </BigWrapper>
    );
  } else {
    return (
      <Wrapper isHeart={isHeart} onClick={handleLikeClick}>
        {isHeart ? (
          <FontAwesomeIcon icon={faHeart} size={size} />
        ) : (
          <FontAwesomeIcon icon={amptyHeart} size={size} />
        )}
      </Wrapper>
    );
  }
};

LikeIconChanger.defaultProps = {
  size: "1x",
  bigHeart: false,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  ${(props) =>
    props.isHeart
      ? `
 color: ${theme.btnColor};
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
  `
      : `
  color: ${theme.typoGrey2};
  :hover {
    cursor: pointer;
    color: ${theme.btnColor};
  }
  `}
`;
const WrapperM = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  ${(props) =>
    props.isHeart
      ? `
 color: ${theme.btnColor};
  `
      : `
  color: ${theme.typoGrey2};

  `}
`;

const BigWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  ${(props) =>
    props.isHeart
      ? `
 color: ${theme.btnColor};
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
  `
      : `
  color: ${theme.btnColor};
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
  `}
`;
const BigWrapperM = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  ${(props) =>
    props.isHeart
      ? `
 color: ${theme.btnColor};

  `
      : `
  color: ${theme.btnColor};
 
  `}
`;

export default LikeIconChanger;
