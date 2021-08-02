import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import koreaMap from "../images/koreaMap.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/shift-away.css';
import styled from 'styled-components';
import { fetchProducts } from "../redux/modules/map";


const Map = () => {
    const [totalFirstCnt, setTotalFirstCnt] = useState("");

    const url = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10000&serviceKey=g7z%2FjYsaSLHc65MfRAm09lQoXM3RSvq7toXdEiu%2BlYesH2wWNE%2FjrvSfRh%2FtyStEmKU9D4G6Ho6Ia9%2FHNJkITA%3D%3D"

    //파라미터가 필요한 함수는 콜백으로 불러다가 쓴다.
    //dispatch를 쓸 때는 반드시 콜백으로 연다.
    const dispatch = useDispatch();

    //useSelector는 redux에 있는 initialState값만 가져올 수 있다.
    const { mapData } = useSelector(state => state.map);
    console.log(mapData);

    useEffect(() => {
        dispatch(fetchProducts(url))
    }, [dispatch, url])

    return (
        <div>
            <h1>시도별 접종 현황</h1>
            <div className="map_part">
                <img src={koreaMap} alt="" />
                <Gyeonggi>
                    <h3 style={{ margin: "0px 18px" }}>
                        경기
                    </h3>
                    <Tippy
                        content={"접종수"}
                        interactive={true}
                        animation={"shift-away"}
                        placement={"bottom"}
                        arrow={false}
                        offset={[0, 0]}
                    >
                        <ShotRatio>
                            접종률
                        </ShotRatio>
                    </Tippy>
                </Gyeonggi>
            </div>
        </div>
    )
}

const Gyeonggi = styled.div`
    width: 70px;
    position: relative;
    z-index: 2;

`

const ShotRatio = styled.div`
    background-color: skyblue;
    width: 70px;
    height: 40px;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
`

export default Map;
