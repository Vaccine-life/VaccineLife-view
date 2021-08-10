import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as amptyHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import logger from "../shared/logger";
import { actionPostLike } from "../redux/modules/like";

const LikeIconChanger = (props) => {
  const { board, boardId, size, bigHeart } = props;
  const is_login = useSelector((state) => state.user.is_login);
  const userId = useSelector((state) => state.user.user.userId);
  const like_list_vac = useSelector((state) => state.like.likeListVac);
  const like_list_quar = useSelector((state) => state.like.likeListQuar);
  const dispatch = useDispatch();
  const isHeart =
    board === "vaccine"
      ? like_list_vac.includes(boardId)
      : like_list_quar.includes(boardId);

  const likeObj =
    board === "vaccine"
      ? {
          vacBoardId: boardId,
          userId,
        }
      : {
          quarBoardId: boardId,
          userId,
        };

  const handleLikeClick = () => {
    dispatch(actionPostLike(board, likeObj));
  };

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

export default LikeIconChanger;
