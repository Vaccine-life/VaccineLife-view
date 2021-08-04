import React, { useEffect, useState } from "react";
import axios from "axios";
import koreaMap from "../images/koreaMap.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import styled from "styled-components";

const Map = () => {
  const [totalFirstCnt, setTotalFirstCnt] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=100000&serviceKey=g7z%2FjYsaSLHc65MfRAm09lQoXM3RSvq7toXdEiu%2BlYesH2wWNE%2FjrvSfRh%2FtyStEmKU9D4G6Ho6Ia9%2FHNJkITA%3D%3D"
      );
      // console.log(res)
      makeData(res.data.data);
    };
    const makeData = (items) => {
      // todayList는 2000개가 넘던 items 중, 오늘에 해당하는 요소들만 긁어옴
      const todayList = items.slice(items.length - 17, items.length);
      console.log(todayList);

      // todayNum이라는 빈객체에 {시도: 2차접종자수}로 이루어진 키값쌍을 넣어준다.
      // 근데 모든 시도를 다 돌아야 하니까 map해줌
      const todayNum = {};
      todayList.map((item) => {
        todayNum[item.sido] = Math.floor(item.totalSecondCnt / 10000);
      });
      console.log(todayNum);
    };
    fetchEvents();
  });

  return (
    <div>
      <h1>시도별 접종 현황</h1>
      <div className="map_part">
        <img src={koreaMap} alt="" />
        <Gyeonggi>
          <h3 style={{ margin: "0px 18px" }}>경기</h3>
          <Tippy
            content={"접종수"}
            interactive={true}
            animation={"shift-away"}
            placement={"bottom"}
            arrow={false}
            offset={[0, 0]}
          >
            <ShotRatio>접종률</ShotRatio>
          </Tippy>
        </Gyeonggi>
      </div>
    </div>
  );
};

const Gyeonggi = styled.div`
  width: 70px;
  position: relative;
  z-index: 2;
`;

const ShotRatio = styled.div`
  background-color: skyblue;
  width: 70px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
`;

export default Map;
