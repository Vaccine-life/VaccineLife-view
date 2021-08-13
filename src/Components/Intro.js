import React from 'react'
import IntroCharacter from "../images/IntroCharacter.png";
import styled from "styled-components";
import theme from "../styles/theme";
import { isMobile } from "react-device-detect";

const Intro = () => {

    if (isMobile) {
        <MainIntroMobile>
            <img src={IntroCharacter} alt="" />
            <h1>
                여러분의 <span>백신 접종 후기</span>를 공유해주세요!
            </h1>
        </MainIntroMobile>
    }
    return (
        <MainIntro>
            <img src={IntroCharacter} alt="" />
            <h1>
                여러분의 <span>백신 접종 후기</span>를 공유해주세요!
            </h1>
        </MainIntro>
    )
}

const MainIntro = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

width: 100%;
height: 230px;
background-color: ${theme.bg};

& > img {
width: auto;
height: auto;
max-width: 330px;
max-height: 330px;

padding-top: 92px;
}

& > h1 {
padding-left: 0px;
padding-top: 75px;
font-size: ${theme.headTwoHeight};
line-height: 42px;

color: #ffffff;

& > span {
font-weight: 600;
}
}
`;

const MainIntroMobile = styled.div`

`

export default Intro
