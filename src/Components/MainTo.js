import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import { history } from "../redux/configStore";
import ToVacImage from "../images/ToVacImage.png"

const MainTo = (props) => {
    return (
        <Wrapper>
            <ToVacBoard
                onClick={() => {
                    history.push("/vaccine");
                }}>
                <h3>백신 접종 후기 보러가기</h3>
                {/* <hr /> */}
                <h6>백신 접종자들의 생생한 후기를 확인하고, 나의 경험도 공유해보세요!</h6>
                <img src={ToVacImage} alt="" />
            </ToVacBoard>

            <ToQuarBoard
                onClick={() => {
                    history.push("/quarantine");
                }}>
                <h3>자가격리 후기 보러가기</h3>
                {/* <hr /> */}
                <h6>
                    1. 자가격리 후기를 확인하고 경험이 있다면 공유해주세요!
                    2. 여러분의 소중한 2주간의 경험을 공유해주세요!
                    3. 여러분의 윌슨을 찾아주세요
                    4. 조금이나마 더 쾌적한? 나은? 격리생활을 위해 여러분의 경험을 공유해주세요!
                    5. 함께하면 좀 더 나은? 즐거운? 괜찮은? 격리생활!
                    6. 다양한 격리 후기를 보면서 자가격리 경험을 공유하고, 다채로운 2주를 경험해 보세요.

                </h6>
            </ToQuarBoard>

            <ToMedical
                onClick={() => {
                    history.push("/medical");
                }}>
                <h3>의료진 분들께 감사인사 전하기</h3>
                {/* <hr /> */}
                <h6>코로나 19 최전선에서 헌신하는 의료진을 위한 응원 메시지를 남겨주세요!</h6>
            </ToMedical>
        </Wrapper >
    )
}

const Wrapper = styled.div`
display : flex;
justify-content: center;
`

const ToVacBoard = styled.div`
width: 450px;
height: 450px;

position: relative;

background: ${theme.bg2};
border-radius: 16px;

padding-left: 50px;
margin-right : 50px;

cursor: pointer;
box-shadow: 10px 10px 10px -5px ${theme.typoLightGrey2};

&:hover {
background-color: ${theme.bg};
transition-duration:0.1s;
}

& > h3 {
width: 142px;
height: 68px;

padding-top: 50px;

font-weight: bold;
font-size: ${theme.headOneSize};
line-height: 34px;
letter-spacing: -0.3px;
text-align: left;

color: #FFFFFF;
}


& > hr {
width: 160px;
margin-left: 0px;
}

& > h6 {
width: 263px;
height: 48px;

padding-top: 10px;

font-weight: normal;
font-size: ${theme.bodyTwoSize};
line-height: 24px;
letter-spacing: -0.3px;
text-align: left;

color: #FFFFFF;
}

& > img {
width: auto;
height: auto;
max-width: 283px;
max-height: 283px;

position: absolute;
right: 10px;
top: 250px;

}
`

const ToQuarBoard = styled.div`
width: 450px;
height: 244px;

background: ${theme.bg2};
border-radius: 16px;

padding-left: 50px;
margin-right : 50px;

cursor: pointer;
box-shadow: 10px 10px 10px -5px ${theme.typoLightGrey2};

&:hover {
background-color: ${theme.bg2};
transition-duration:0.1s;
}

& > h3 {
width: 142px;
height: 68px;

padding-top: 50px;

font-weight: bold;
font-size: ${theme.headOneSize};
line-height: 34px;
letter-spacing: -0.3px;
text-align: left;

color: #FFFFFF;
}

& > hr {
width: 160px;
margin-left: 0px;
}

& > h6 {
width: 180px;
height: 48px;

padding-top: 10px;

font-weight: normal;
font-size: ${theme.bodyTwoSize};
line-height: 24px;
letter-spacing: -0.3px;
text-align: left;

color: #FFFFFF;
}
`

const ToMedical = styled.div`
width: 450px;
height: 244px;

background: ${theme.bg};
border-radius: 16px;

padding-left: 50px;
margin-left: 50px;

cursor: pointer;
box-shadow: 10px 10px 10px -5px ${theme.typoLightGrey2};

&:hover {
background-color: ${theme.bg};
transition-duration: 0.1s;
}

& > h3 {
width: 158px;
height: 68px;

padding-top: 50px;

font-weight: bold;
font-size: ${theme.headOneSize};
line-height: 34px;
letter-spacing: -0.3px;
text-align: left;

color: #FFFFFF;
}

& > hr {
width: 160px;
margin-left: 0px;
}

& > h6 {
width: 263px;
height: 48px;

padding-top: 10px;

font-weight: normal;
font-size: ${theme.bodyTwoSize};
line-height: 24px;
letter-spacing: -0.3px;
text-align: left;

color: #FFFFFF;
}
`


export default MainTo;
