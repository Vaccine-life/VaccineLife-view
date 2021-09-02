import React, { useEffect, useState } from "react";
import axios from "axios";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";
import theme from "../styles/theme";
import SouthKorea from "../images/South_Korea.png";
import disc from "../images/disc.png";

// Map: 지도_지역별 접종수

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

  // 공공데이터포털api 가져오기
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=100000&serviceKey=g7z%2FjYsaSLHc65MfRAm09lQoXM3RSvq7toXdEiu%2BlYesH2wWNE%2FjrvSfRh%2FtyStEmKU9D4G6Ho6Ia9%2FHNJkITA%3D%3D"
      );
      makeData(res.data.data);
    };

    // makeData: 가져온 데이터 가공하기
    const makeData = (items) => {

      // todayList: 2000개 넘는 items 중, 가장 최근인(리스트의 끝에 있는) '오늘'에 해당하는 요소들만 긁어옴
      const todayList = items.slice(items.length - 17, items.length);

      // todayNum이라는 빈객체에 {지역(sido): 2차접종자수}로 이루어진 키값쌍 넣어주기
      // 모든 지역을 다 돌아야하니 map돌려주기
      const todayNum = {};
      todayList.map((item) => {
        todayNum[item.sido] = item.totalSecondCnt;
      });

      // 각 지역마다 업데이트 되는 숫자가 들어가게끔 세팅
      setGyeonggiShot(todayNum.경기도);
      setSeoulShot(todayNum.서울특별시);
      setGangwonShot(todayNum.강원도);
      setGyeongNamShot(todayNum.경상남도);
      setGyeongBookShot(todayNum.경상북도);
      setGwangjuShot(todayNum.광주광역시);
      setDaeguShot(todayNum.대구광역시);
      setBusanShot(todayNum.부산광역시);
      setSejongShot(todayNum.세종특별자치시);
      setWoolsanShot(todayNum.울산광역시);
      setIncheonShot(todayNum.인천광역시);
      setJeonNamShot(todayNum.전라남도);
      setJeonBookShot(todayNum.전라북도);
      setJejuShot(todayNum.제주특별자치도);
      setChoongNamShot(todayNum.충청남도);
      setChoongBookShot(todayNum.충청북도);
      setDaejeonShot(todayNum.대전광역시);
    };
    fetchEvents();
  }, []);

  // 모바일의 경우
  if (isMobileOnly) {
    return (
      <WrapperMobile>
        <MapTitleMobile>
          <img src={disc} alt="" />
          <h3>
            지역별 접종수<span> (만 명)</span>
          </h3>
        </MapTitleMobile>
        <MapBoxWrapperMobile>
          <MapBoxMobile>
            <img src={SouthKorea} alt="" />

            {/* 
              // 이 밑으로 각 지역별 데이터 적용
              // 모바일의 경우 화면이 협소하여 데이터 별 나누기 10000(만) 후 Math.floor적용(같거나 작은 정수 중 가장 큰 정수 반환)
              // toLocalString으로 1000단위마다 ','표시하기
            */}

            <GyeonggiMobile>
              <h3>경기</h3>
              <ShotMobile>
                {Math.floor(GyeonggiShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </GyeonggiMobile>

            <GangwonMobile>
              <h3>강원</h3>
              <ShotMobile>
                {Math.floor(GangwonShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </GangwonMobile>

            <SeoulMobile>
              <h3>서울</h3>
              <ShotMobile>
                {Math.floor(SeoulShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </SeoulMobile>

            <IncheonMobile>
              <h3>인천</h3>
              <ShotMobile>
                {Math.floor(IncheonShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </IncheonMobile>

            <SejongMobile>
              <h3>세종</h3>
              <ShotMobile>
                {Math.floor(SejongShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </SejongMobile>

            <ChoongNamMobile>
              <h3>충남</h3>
              <ShotMobile>
                {Math.floor(ChoongNamShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </ChoongNamMobile>

            <ChoongBookMobile>
              <h3>충북</h3>
              <ShotMobile>
                {Math.floor(ChoongBookShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </ChoongBookMobile>

            <GyeongBookMobile>
              <h3>경북</h3>
              <ShotMobile>
                {Math.floor(GyeongBookShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </GyeongBookMobile>

            <DaejeonMobile>
              <h3>대전</h3>
              <ShotMobile>
                {Math.floor(DaejeonShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </DaejeonMobile>

            <JeonBookMobile>
              <h3>전북</h3>
              <ShotMobile>
                {Math.floor(JeonBookShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </JeonBookMobile>

            <GwangjuMobile>
              <h3>광주</h3>
              <ShotMobile>
                {Math.floor(GwangjuShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </GwangjuMobile>

            <JeonNamMobile>
              <h3>전남</h3>
              <ShotMobile>
                {Math.floor(JeonNamShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </JeonNamMobile>

            <JejuMobile>
              <h3>제주</h3>
              <ShotMobile>
                {Math.floor(JejuShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </JejuMobile>

            <GyeongNamMobile>
              <h3>경남</h3>
              <ShotMobile>
                {Math.floor(GyeongNamShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </GyeongNamMobile>

            <DaeguMobile>
              <h3>대구</h3>
              <ShotMobile>
                {Math.floor(DaeguShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </DaeguMobile>

            <WoolsanMobile>
              <h3>울산</h3>
              <ShotMobile>
                {Math.floor(WoolsanShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </WoolsanMobile>

            <BusanMobile>
              <h3>부산</h3>
              <ShotMobile>
                {Math.floor(BusanShot / 10000).toLocaleString("ko-KR")}
              </ShotMobile>
            </BusanMobile>
          </MapBoxMobile>
        </MapBoxWrapperMobile>
      </WrapperMobile>
    );
  }

  // 웹의 경우
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
          <Shot>{GyeonggiShot.toLocaleString("ko-KR")}</Shot>
        </Gyeonggi>

        <Gangwon>
          <h3>강원</h3>
          <Shot>{GangwonShot.toLocaleString("ko-KR")}</Shot>
        </Gangwon>

        <Seoul>
          <h3>서울</h3>
          <Shot>{SeoulShot.toLocaleString("ko-KR")}</Shot>
        </Seoul>

        <Incheon>
          <h3>인천</h3>
          <Shot>{IncheonShot.toLocaleString("ko-KR")}</Shot>
        </Incheon>

        <Sejong>
          <h3>세종</h3>
          <Shot>{SejongShot.toLocaleString("ko-KR")}</Shot>
        </Sejong>

        <ChoongNam>
          <h3>충남</h3>
          <Shot>{ChoongNamShot.toLocaleString("ko-KR")}</Shot>
        </ChoongNam>

        <ChoongBook>
          <h3>충북</h3>
          <Shot>{ChoongBookShot.toLocaleString("ko-KR")}</Shot>
        </ChoongBook>

        <GyeongBook>
          <h3>경북</h3>
          <Shot>{GyeongBookShot.toLocaleString("ko-KR")}</Shot>
        </GyeongBook>

        <Daejeon>
          <h3>대전</h3>
          <Shot>{DaejeonShot.toLocaleString("ko-KR")}</Shot>
        </Daejeon>

        <JeonBook>
          <h3>전북</h3>
          <Shot>{JeonBookShot.toLocaleString("ko-KR")}</Shot>
        </JeonBook>

        <Gwangju>
          <h3>광주</h3>
          <Shot>{GwangjuShot.toLocaleString("ko-KR")}</Shot>
        </Gwangju>

        <JeonNam>
          <h3>전남</h3>
          <Shot>{JeonNamShot.toLocaleString("ko-KR")}</Shot>
        </JeonNam>

        <Jeju>
          <h3>제주</h3>
          <Shot>{JejuShot.toLocaleString("ko-KR")}</Shot>
        </Jeju>

        <GyeongNam>
          <h3>경남</h3>
          <Shot>{GyeongNamShot.toLocaleString("ko-KR")}</Shot>
        </GyeongNam>

        <Daegu>
          <h3>대구</h3>
          <Shot>{DaeguShot.toLocaleString("ko-KR")}</Shot>
        </Daegu>

        <Woolsan>
          <h3>울산</h3>
          <Shot>{WoolsanShot.toLocaleString("ko-KR")}</Shot>
        </Woolsan>

        <Busan>
          <h3>부산</h3>
          <Shot>{BusanShot.toLocaleString("ko-KR")}</Shot>
        </Busan>
      </MapBox>
    </Wrapper>
  );
};


// styled-components

// <========= 웹 =========>
const Wrapper = styled.div`
  margin-right: 50px;
`;

// MapTitle: 제목_디스크 아이콘(img), 글귀(h3)
const MapTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: 26px;
  margin-bottom: 10px;
  & > img {
    width: 24px;
    height: 24px;
  }
  & > h3 {
    width: 102px;
    height: 26px;
    white-space: nowrap;
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

// MapBox: 지도를 감싸고 있는 네모박스_한반도이미지(img)
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

// Shot: 각 지역명 하단의 데이터 담은 파란박스
const Shot = styled.div`
  padding: 0px 5px;
  width: max-content;
  height: max-content;
  background: ${theme.bg};
  border-radius: 9px;
  font-weight: normal;
  font-size: ${theme.bodyThreeSize};
  line-height: 24px;
  color: #ffffff;
  margin: auto;
`;

// Gyeonggi (하기의 다른 지역들에도 통일 적용): 상단의 지역명(h3) + 하단의 데이터 담은 파란박스(Shot)
// 한반도 이미지 위에 배치하기 위해 묶음
const Gyeonggi = styled.div`
  position: absolute;
  left: 160px;
  top: 30px;
  width: 70px;
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
const GyeongNam = styled.div`
  position: absolute;
  left: 250px;
  top: 280px;
  width: 70px;
  white-space: nowrap;
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
const Daegu = styled.div`
  position: absolute;
  left: 300px;
  top: 235px;
  width: 70px;
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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

// <========= 모바일 =========>

const WrapperMobile = styled.div`
  margin: "auto";
  width: 100%;
`;

const MapTitleMobile = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  height: 26px;
  margin: 40px auto 10px 16px;
  & > img {
    width: 24px;
    height: 24px;
  }
  & > h3 {
    width: max-content;
    height: 26px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 20px;
    letter-spacing: -0.3px;
    color: #242424;
    flex: none;
    order: 1;
    flex-grow: 0;
    padding-left: 4px;

    & > span {
      font-size: 10px;
      font-weight: lighter;
    }
  }
`;

const MapBoxWrapperMobile = styled.div`
  width: 100%;
`;

const MapBoxMobile = styled.div`
  position: relative;
  margin: 0px 16px;
  width: 284px;
  height: 350px;
  background: ${theme.bg4};
  border: 1px solid ${theme.bg3};
  box-sizing: border-box;
  border-radius: 16px;
  margin: auto;
  & > img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    padding-top: 30px;
  }
`;

const ShotMobile = styled.div`
  padding: 0px 5px;
  width: max-content;
  height: max-content;
  background: ${theme.bg};
  border-radius: 9px;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  color: #ffffff;
  margin: auto;
`;

const GyeonggiMobile = styled.div`
  position: absolute;
  left: 80px;
  top: 28px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const GangwonMobile = styled.div`
  position: absolute;
  right: 70px;
  top: 50px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const SeoulMobile = styled.div`
  position: absolute;
  left: 90px;
  top: 65px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const IncheonMobile = styled.div`
  position: absolute;
  left: 40px;
  top: 55px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const SejongMobile = styled.div`
  position: absolute;
  left: 80px;
  top: 100px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const ChoongNamMobile = styled.div`
  position: absolute;
  left: 50px;
  top: 110px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const ChoongBookMobile = styled.div`
  position: absolute;
  left: 120px;
  top: 95px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const GyeongBookMobile = styled.div`
  position: absolute;
  right: 40px;
  top: 120px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const DaejeonMobile = styled.div`
  position: absolute;
  left: 90px;
  top: 143px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const JeonBookMobile = styled.div`
  position: absolute;
  left: 60px;
  bottom: 145px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const GwangjuMobile = styled.div`
  position: absolute;
  left: 80px;
  bottom: 110px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const JeonNamMobile = styled.div`
  position: absolute;
  left: 50px;
  bottom: 90px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const JejuMobile = styled.div`
  position: absolute;
  left: 80px;
  bottom: 45px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const GyeongNamMobile = styled.div`
  position: absolute;
  right: 90px;
  bottom: 100px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const DaeguMobile = styled.div`
  position: absolute;
  right: 70px;
  top: 150px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const WoolsanMobile = styled.div`
  position: absolute;
  right: 20px;
  bottom: 140px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

const BusanMobile = styled.div`
  position: absolute;
  right: 50px;
  bottom: 105px;
  width: 70px;
  z-index: 1;
  & > h3 {
    width: 30px;
    height: 24px;
    margin: auto;
    font-weight: bold;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #242424;
  }
`;

export default Map;
