import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as amptyHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import theme from "../styles/theme";

const LikeIconChanger = (props) => {
  const { isHeart } = props;
  return (
    <Wrapper isHeart={isHeart}>
      {isHeart ? (
        <FontAwesomeIcon icon={faHeart} />
      ) : (
        <FontAwesomeIcon icon={amptyHeart} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
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
export default LikeIconChanger;
