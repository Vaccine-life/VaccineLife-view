import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as amptyHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import logger from "../shared/logger";
import { actionMediLike } from "../redux/modules/like";
import { isMobileOnly } from "react-device-detect";

const LikeIconMedi = (props) => {
  // console.log(props)
  const { boardId, size, bigHeart } = props;
  const userId = useSelector((state) => state.user.user.userId);
  const like_list_medi = useSelector((state) => state.like.likeListMedi);
  // console.log(like_list_medi)
  const dispatch = useDispatch();

  const isHeart = like_list_medi.includes(boardId);
  // console.log(isHeart)
  const is_login = useSelector((state) => state.user.is_login);

  const likeObj = {
    medicalId: parseInt(boardId),
    userId: parseInt(userId),
  };
  // console.log(likeObj)

  const handleLikeClick = () => {
    if (likeObj.userId === null || likeObj?.medicalId === null) {
      return;
    }
    dispatch(actionMediLike(likeObj));
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

LikeIconMedi.defaultProps = {
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
 color: ${theme.bg};
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
  `
      : `
  color: ${theme.typoGrey2};
  :hover {
    cursor: pointer;
    color: ${theme.bg};
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
 color: ${theme.bg};
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
 color: ${theme.bg};
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
  `
      : `
  color: ${theme.bg};
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
 color: ${theme.bg};

  `
      : `
  color: ${theme.bg};
 
  `}
`;

export default LikeIconMedi;
