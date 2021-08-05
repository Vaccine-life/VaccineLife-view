import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const MainTo = () => {
    return (
        <Wrapper>
            <ToVacBoard>
                <h3>백신 접종 후기 보러가기</h3>
                <hr />
                <h6>백신 접종자들의 생생한 후기를 확인하고, 나의 경험도 공유해보세요!</h6>
            </ToVacBoard>

            <ToMedical>
                <h3>의료진 분들께 감사인사 전하기</h3>
                <hr />
                <h6>코로나 19 최전선에서 헌신하는 의료진을 위한 응원 메시지를 남겨주세요!</h6>
            </ToMedical>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display : flex;
    justify-content: center;
`

const ToVacBoard = styled.div`
    width: 450px;
    height: 244px;

    background: ${theme.bg2};
    border-radius: 16px;

    padding-left: 50px;
    margin-right : 50px;

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

    background: ${theme.bg2};
    border-radius: 16px;

    padding-left: 50px;
    margin-left: 50px;

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

    font-weight: normal;
    font-size: ${theme.bodyTwoSize};
    line-height: 24px;
    letter-spacing: -0.3px;
    text-align: left;

    color: #FFFFFF;
    }
    `


export default MainTo;
