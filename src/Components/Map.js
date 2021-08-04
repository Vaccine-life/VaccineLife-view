import React, { useEffect, useState } from "react";
import axios from "axios";
import SouthKorea from "../images/South_Korea.png";
import styled from "styled-components";
import theme from "../styles/theme";

const Map = (props) => {
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=100000&serviceKey=g7z%2FjYsaSLHc65MfRAm09lQoXM3RSvq7toXdEiu%2BlYesH2wWNE%2FjrvSfRh%2FtyStEmKU9D4G6Ho6Ia9%2FHNJkITA%3D%3D"
      );
      makeData(res.data.data);
    };
    const makeData = (items) => {
      // todayList는 2000개가 넘던 items 중, 가장 최근인 '오늘'에 해당하는 요소들만 긁어옴
      const todayList = items.slice(items.length - 17, items.length);
      console.log(todayList);

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
  });

  return (
    <div>
      <MapBox>
        <img src={SouthKorea} alt="" />
        <Sido>
          <h3>경기</h3>
          <Shot>접종수</Shot>
        </Sido>
      </MapBox>
    </div>
  );
};

const MapBox = styled.div`
  /* position: absolute; */
  width: 504px;
  height: 490px;
  left: 208px;
  top: 339px;
  background: #edf2ff;
  border: 1px solid #dce5fe;
  box-sizing: border-box;
  border-radius: 16px;

  & > img {
    /* position: absolute; */
    width: 411px;
    height: 410px;
    left: 235px;
    top: 379px;
  }
`;

const Sido = styled.div`
  width: 70px;
  position: absolute;
  z-index: 3;

  & > h3 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.3px;
    color: ${theme.typoGrey3};
  }
`;

const Shot = styled.div`
  background-color: #3853c4;
  color: white;
  /* width: 70px;
    height: 40px; */
  width: 55px;
  height: 24px;
  border-radius: 12px;
  text-align: center;
  line-height: 40px;
`;

export default Map;
