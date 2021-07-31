import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as amptyHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import theme from "../styles/theme";

const LikeIconChanger = (props) => {
  const { isHeart } = props;
  return (
    <Wrapper>
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
  justify-content: center;
  align-items: center;
  color: ${theme.btnColor};
  :hover {
    cursor: pointer;
  }
`;
export default LikeIconChanger;
