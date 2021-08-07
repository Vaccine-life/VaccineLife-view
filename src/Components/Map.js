import React, { useEffect, useState } from "react";
import axios from "axios";
import SouthKorea from "../images/South_Korea.png";
import disc from "../images/disc.png";
import styled from "styled-components";
import theme from "../styles/theme";

const Map = () => {

  const [GyeonggiShot, setGyeonggiShot] = useState("");
  const [SeoulShot, setSeoulShot] = useState("");
  const [GangwonShot, setGangwonShot] = useState("");
  const [GyeongNamShot, setGyeongNamShot] = useState("");
  const [GyeongBookShot, setGyeongBookShot] = useState("");
  const [GwangjuShot, setGwangjuShot] = useState("");
  const [DaeguShot, setDaeguShot] = useState("");
  const [BusanShot, setBusanShot] = useState("");
  const [SejongShot, setSejongShot] = useState("");
  const [WoolsanShot, setWoolsanShot] = useState("");
  const [IncheonShot, setIncheonShot] = useState("");
  const [JeonNamShot, setJeonNamShot] = useState("");
  const [JeonBookShot, setJeonBookShot] = useState("");
  const [JejuShot, setJejuShot] = useState("");
  const [ChoongNamShot, setChoongNamShot] = useState("");
  const [ChoongBookShot, setChoongBookShot] = useState("");
  const [DaejeonShot, setDaejeonShot] = useState("");

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
        todayNum[item.sido] = Math.floor(item.totalSecondCnt);
      });
      // console.log(todayNum);
      setGyeonggiShot(todayNum.경기도)
      setSeoulShot(todayNum.서울특별시)
      setGangwonShot(todayNum.강원도)
      setGyeongNamShot(todayNum.경상남도)
      setGyeongBookShot(todayNum.경상북도)
      setGwangjuShot(todayNum.광주광역시)
      setDaeguShot(todayNum.대구광역시)
      setBusanShot(todayNum.부산광역시)
      setSejongShot(todayNum.세종특별자치시)
      setWoolsanShot(todayNum.울산광역시)
      setIncheonShot(todayNum.인천광역시)
      setJeonNamShot(todayNum.전라남도)
      setJeonBookShot(todayNum.전라북도)
      setJejuShot(todayNum.제주특별자치도)
      setChoongNamShot(todayNum.충청남도)
      setChoongBookShot(todayNum.충청북도)
      setDaejeonShot(todayNum.대전광역시)
    };
    fetchEvents();
  }, [])

  // const GyeonggiShot = () => {
  //     setTodayShot(todayNum.경기도)
  // }



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
            {GyeonggiShot.toLocaleString('ko-KR')}
          </Shot>
        </Gyeonggi>

        <Gangwon>
          <h3>강원</h3>
          <Shot>
            {GangwonShot.toLocaleString('ko-KR')}
          </Shot>
        </Gangwon>

        <Seoul>
          <h3>서울</h3>
          <Shot>
            {SeoulShot.toLocaleString('ko-KR')}
          </Shot>
        </Seoul>

        <Incheon>
          <h3>인천</h3>
          <Shot>
            {IncheonShot.toLocaleString('ko-KR')}
          </Shot>
        </Incheon>

        <Sejong>
          <h3>세종</h3>
          <Shot>
            {SejongShot.toLocaleString('ko-KR')}
          </Shot>
        </Sejong>

        <ChoongNam>
          <h3>충남</h3>
          <Shot>
            {ChoongNamShot.toLocaleString('ko-KR')}
          </Shot>
        </ChoongNam>

        <ChoongBook>
          <h3>충북</h3>
          <Shot>
            {ChoongBookShot.toLocaleString('ko-KR')}
          </Shot>
        </ChoongBook>

        <GyeongBook>
          <h3>경북</h3>
          <Shot>
            {GyeongBookShot.toLocaleString('ko-KR')}
          </Shot>
        </GyeongBook>

        <Daejeon>
          <h3>대전</h3>
          <Shot>
            {DaejeonShot.toLocaleString('ko-KR')}
          </Shot>
        </Daejeon>

        <JeonBook>
          <h3>전북</h3>
          <Shot>
            {JeonBookShot.toLocaleString('ko-KR')}
          </Shot>
        </JeonBook>

        <Gwangju>
          <h3>광주</h3>
          <Shot>
            {GwangjuShot.toLocaleString('ko-KR')}
          </Shot>
        </Gwangju>

        <JeonNam>
          <h3>전남</h3>
          <Shot>
            {JeonNamShot.toLocaleString('ko-KR')}
          </Shot>
        </JeonNam>

        <Jeju>
          <h3>제주</h3>
          <Shot>
            {JejuShot.toLocaleString('ko-KR')}
          </Shot>
        </Jeju>

        <GyeongNam>
          <h3>경남</h3>
          <Shot>
            {GyeongNamShot.toLocaleString('ko-KR')}
          </Shot>
        </GyeongNam>

        <Daegu>
          <h3>대구</h3>
          <Shot>
            {DaeguShot.toLocaleString('ko-KR')}
          </Shot>
        </Daegu>

        <Woolsan>
          <h3>울산</h3>
          <Shot>
            {WoolsanShot.toLocaleString('ko-KR')}
          </Shot>
        </Woolsan>

        <Busan>
          <h3>부산</h3>
          <Shot>
            {BusanShot.toLocaleString('ko-KR')}
          </Shot>
        </Busan>

      </MapBox>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-right: 50px;
`;

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
`;

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
`;

const Shot = styled.div`
padding: 0px 5px;

width: max-content;
height: max-content;

background: ${theme.bg};
/* border-radius: 12px; */
border-radius: 9px;
/* border-radius: 0px; */

font-weight: normal;
font-size: ${theme.bodyThreeSize};
/* font-size: ${theme.bodyfourSize}; */
line-height: 24px;
color: #FFFFFF;

/* margin: 0px auto; */
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
`;
const Gangwon = styled.div`
  position: absolute;
  left: 280px;
  top: 70px;
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
`;
const Seoul = styled.div`
  position: absolute;
  left: 180px;
  top: 80px;
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
`;
const Incheon = styled.div`
  position: absolute;
  left: 90px;
  top: 70px;
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
`;
const Sejong = styled.div`
  position: absolute;
  left: 180px;
  top: 130px;
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
`;
const ChoongNam = styled.div`
  position: absolute;
  left: 120px;
  top: 170px;
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
`;
const ChoongBook = styled.div`
  position: absolute;
  left: 235px;
  top: 160px;
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
`;
const GyeongBook = styled.div`
  position: absolute;
  left: 300px;
  top: 185px;
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
`;
const Daejeon = styled.div`
  position: absolute;
  left: 185px;
  top: 196px;
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
`;
const JeonBook = styled.div`
  position: absolute;
  left: 180px;
  top: 245px;
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
`;
const Gwangju = styled.div`
  position: absolute;
  left: 170px;
  top: 295px;
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
`;
const JeonNam = styled.div`
  position: absolute;
  left: 130px;
  top: 340px;
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
`;
const Jeju = styled.div`
position: absolute;
left: 190px;
top: 425px;
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
const GyeongNam = styled.div`
position: absolute;
left: 250px;
top: 280px;
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
const Daegu = styled.div`
  position: absolute;
  left: 300px;
  top: 235px;
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
`;
const Woolsan = styled.div`
  position: absolute;
  left: 360px;
  top: 270px;
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
`;
const Busan = styled.div`
position: absolute;
left: 320px;
top: 320px;
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


export default Map;
