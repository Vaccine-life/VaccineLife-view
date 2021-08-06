import React, { useEffect, useState } from 'react';
import axios from "axios";
import SouthKorea from "../images/South_Korea.png"
import disc from "../images/disc.png";
import styled from 'styled-components';
import theme from '../styles/theme';

const Map = () => {

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get("https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=100000&serviceKey=g7z%2FjYsaSLHc65MfRAm09lQoXM3RSvq7toXdEiu%2BlYesH2wWNE%2FjrvSfRh%2FtyStEmKU9D4G6Ho6Ia9%2FHNJkITA%3D%3D")
            makeData(res.data.data)
        }
        const makeData = (items) => {
            // todayList는 2000개가 넘던 items 중, 가장 최근인 '오늘'에 해당하는 요소들만 긁어옴
            const todayList = items.slice(items.length - 17, items.length);

            // todayNum이라는 빈객체에 {시도: 2차접종자수}로 이루어진 키값쌍을 넣어준다.
            // 근데 모든 시도를 다 돌아야 하니까 map해줌
            const todayNum = {};
            todayList.map((item) => {
                // 객체에다가 새로운 "키 = 값" 쌍을 넣어주는 방법
                todayNum[item.sido] = Math.floor(item.totalSecondCnt / 10000);
            });
            console.log(todayNum);
        };
        fetchEvents();
    }, [])

    return (
        <Wrapper>

            <MapTitle>
                <img src={disc} alt="" />
                <h3>지역별 접종수</h3>
            </MapTitle>

            <MapBox>
                <img src={SouthKorea} alt="" />

                <Gyeonggi>
                    <h3>경기</h3>
                    <Shot>
                        <h4>접종수</h4>
                    </Shot>
                </Gyeonggi>

            </MapBox>

        </Wrapper>
    )
}

const Wrapper = styled.div`
margin-right : 50px;
`

const MapTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 130px;
height: 26px;

& > img {
width: 24px;
height: 24px;   
}

& > h3 {
width: 102px;
height: 26px;

font-weight: bold;
font-size: ${theme.SubHeadOneSize};
line-height: 26px;

letter-spacing: -0.3px;

color: #242424;

flex: none;
order: 1;
flex-grow: 0;
padding-left: 4px;
}

`

const MapBox = styled.div`
position: relative;
width: 504px;
height: 490px;

background: ${theme.bg4};

border: 1px solid ${theme.bg3};
box-sizing: border-box;
border-radius: 16px;

& > img {
width: auto;
height: auto;
max-width: 450px;
max-height: 450px;
padding-top: 20px;
}
`

const Gyeonggi = styled.div`
position: absolute;
left: 160px;
top: 30px;
width: 70px;
z-index: 1;

& > h3 {
width: 30px;
height: 24px;
margin: 0px auto;

font-weight: bold;
font-size: ${theme.SubHeadTwoSize};
line-height: 24px;

text-align: center;
letter-spacing: -0.3px;

color: #242424;
}
`

const Shot = styled.div`
/* display: flex; */
/* flex-direction: row; */
/* align-items: flex-start; */
padding: 0px 10px;

position: static;
width: 55px;
height: 24px;
left: 0px;
top: 24px;

background: ${theme.bg};
border-radius: 12px;

& > h4 {
width: 50px;
height: 24px;

font-weight: normal;
font-size: ${theme.bodyThreeSize};
line-height: 24px;

color: #FFFFFF;

margin: 0px auto;
}
`

export default Map;
