import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { isMobileOnly } from "react-device-detect";
import { mainAxios } from "../shared/api";
import logger from "../shared/logger";
import disc from "../images/disc.png";
import styled from "styled-components";
import theme from "../styles/theme";

// MainNivoBar: 차트2개_백신 종류별 접종수, 백신 부작용 Top4
// nivo bar 라이브러리 사용

const MainNivoBar = () => {
  // dataArr: 부작용별 밸류 담기
  const [dataArr, setDataArr] = useState([]);
  // korNames: 영어로 내려준 부작용명 한글로 변환
  const [korNames, setKorNames] = useState([]);

  // 백신 부작용 Top4용 데이터 가져오기
  const afterEffectData = async () => {
    try {
      const afterEffectRes = await mainAxios.getAfterEffectChart();
      // afterEffectNumArr: 각 부작용별 밸류(사람 수)만 가져오기
      const afterEffectNumArr = Object.values(afterEffectRes.data);
      // Top4를 위해 afterEffectNumArr 내림차순으로 정렬하기
      afterEffectNumArr.sort(function (a, b) {
        return b - a;
      });
      // DataArr에 내림차수 된 값들 넣어주기
      setDataArr([...afterEffectNumArr]);

      // value를 통해 서버에서 영문으로 내려주는 key 찾기
      // 그 후 상응하는 한글로 변환시키기
      const getKeybyValue = () => {
        const korNames = [];
        // 상위 4개 골라내기
        for (let i = 0; i < 4; i++) {
          const engName = Object.keys(afterEffectRes.data).find(
            (key) => afterEffectRes.data[key] === afterEffectNumArr[i]
          );
          if (engName === "none") {
            korNames.push("없음");
          }
          if (engName === "fever") {
            korNames.push("발열");
          }
          if (engName === "headache") {
            korNames.push("두통/관절통/근육통");
          }
          if (engName === "fatigue") {
            korNames.push("피로감");
          }
          if (engName === "pain") {
            korNames.push("접종부위 통증");
          }
          if (engName === "swell") {
            korNames.push("접종부위 부기/발적");
          }
          if (engName === "sickness") {
            korNames.push("구토/매스꺼움");
          }
          if (engName === "allergy") {
            korNames.push("알러지 반응");
          }
          if (engName === "others") {
            korNames.push("기타");
          }
        }
        setKorNames(korNames);
      };
      getKeybyValue();
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    afterEffectData();
  }, []);

  // 모바일의 경우
  if (isMobileOnly) {
    return (
      <div>
        {/* 차트1_백신 종류별 접종수 */}
        <div>
          <BarTitle1Mobile>
            <img src={disc} alt="" />
            <h3>
              백신 종류별 접종수<span> (출처: 질병관리청)</span>
            </h3>
          </BarTitle1Mobile>
          <BoxWrapperMobile>
            <BarBoxMobile>
              <ResponsiveBar
                data={[
                  {
                    vaccines: "모더나",
                    vaccine: 96483,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    vaccines: "얀센",
                    vaccine: 1240262,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    vaccines: "화이자",
                    vaccine: 5796242,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    vaccines: "아스트라제네카",
                    vaccine: 9650845,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                ]}
                keys={["vaccine"]}
                indexBy="vaccines"
                margin={{ top: 0, right: 50, bottom: 0, left: 110 }}
                padding={0.3}
                groupMode="grouped"
                layout="horizontal"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                valueFormat={{ format: "", enabled: false }}
                colors={"hsl(227, 86%, 63%)"}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "fries",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "sandwich",
                    },
                    id: "lines",
                  },
                ]}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                enableGridY={false}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[]}
                tooltip={({ value, color }) => (
                  <div
                    style={{
                      padding: 12,
                      color,
                      background: "#f7f7f7",
                      borderRadius: "10px",
                    }}
                  >
                    <strong>{value.toLocaleString("ko-KR")}명</strong>
                  </div>
                )}
              />
            </BarBoxMobile>
          </BoxWrapperMobile>
        </div>

        {/* 차트2_백신 부작용 Top4 */}
        <div>
          <BarTitle2Mobile>
            <img src={disc} alt="" />
            <h3>
              백신 부작용 Top4<span> (출처: 자체 설문조사)</span>
            </h3>
          </BarTitle2Mobile>
          <BoxWrapperMobile>
            <BarBoxMobile>
              <ResponsiveBar
                data={[
                  {
                    aftereffects: korNames[3],
                    aftereffect: dataArr[3],
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    aftereffects: korNames[2],
                    aftereffect: dataArr[2],
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    aftereffects: korNames[1],
                    aftereffect: dataArr[1],
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    aftereffects: korNames[0],
                    aftereffect: dataArr[0],
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                ]}
                keys={["aftereffect"]}
                indexBy="aftereffects"
                margin={{ top: 0, right: 50, bottom: 0, left: 110 }}
                padding={0.3}
                groupMode="grouped"
                layout="horizontal"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                valueFormat={{ format: "", enabled: false }}
                colors={"hsl(227, 86%, 63%)"}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "fries",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "sandwich",
                    },
                    id: "lines",
                  },
                ]}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                enableGridY={false}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[]}
                tooltip={({ value, color }) => (
                  <div
                    style={{
                      padding: 12,
                      color,
                      background: "#f7f7f7",
                      borderRadius: "10px",
                    }}
                  >
                    <strong>{value}명</strong>
                  </div>
                )}
              />
            </BarBoxMobile>
          </BoxWrapperMobile>
        </div>
      </div>
    );
  }

  // 웹의 경우
  return (
    <div>
      {/* 차트1_백신 종류별 접종수 */}
      <div>
        <BarTitle1>
          <img src={disc} alt="" />
          <h3 style={{ fontFamily: "Noto Sans KR" }}>
            백신 종류별 접종수<span> (출처: 질병관리청)</span>
          </h3>
        </BarTitle1>
        <BarBox>
          <ResponsiveBar
            data={[
              {
                vaccines: "모더나",
                vaccine: 96483,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
              {
                vaccines: "얀센",
                vaccine: 1240262,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
              {
                vaccines: "화이자",
                vaccine: 5796242,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
              {
                vaccines: "아스트라제네카",
                vaccine: 9650845,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
            ]}
            keys={["vaccine"]}
            indexBy="vaccines"
            margin={{ top: 0, right: 50, bottom: 0, left: 110 }}
            padding={0.3}
            groupMode="grouped"
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            valueFormat={{ format: "", enabled: false }}
            colors={"hsl(227, 86%, 63%)"}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "fries",
                },
                id: "dots",
              },
              {
                match: {
                  id: "sandwich",
                },
                id: "lines",
              },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            enableGridY={false}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[]}
            tooltip={({ value, color }) => (
              <div
                style={{
                  padding: 12,
                  color,
                  background: "#f7f7f7",
                  borderRadius: "10px",
                }}
              >
                <strong>{value.toLocaleString("ko-KR")}명</strong>
              </div>
            )}
          />
        </BarBox>
      </div>

      {/* 차트2_백신 부작용 Top4 */}
      <div>
        <BarTitle2>
          <img src={disc} alt="" />
          <h3 style={{ fontFamily: "Noto Sans KR" }}>
            백신 부작용 Top 4<span> (출처: 자체 설문조사)</span>
          </h3>
        </BarTitle2>
        <BarBox>
          <ResponsiveBar
            data={[
              {
                aftereffects: korNames[3],
                aftereffect: dataArr[3],
                ageColor: "hsl(227, 86%, 63%)",
              },
              {
                aftereffects: korNames[2],
                aftereffect: dataArr[2],
                ageColor: "hsl(227, 86%, 63%)",
              },
              {
                aftereffects: korNames[1],
                aftereffect: dataArr[1],
                ageColor: "hsl(227, 86%, 63%)",
              },
              {
                aftereffects: korNames[0],
                aftereffect: dataArr[0],
                ageColor: "hsl(227, 86%, 63%)",
              },
            ]}
            keys={["aftereffect"]}
            indexBy="aftereffects"
            margin={{ top: 0, right: 50, bottom: 0, left: 120 }}
            padding={0.3}
            groupMode="grouped"
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            valueFormat={{ format: "", enabled: false }}
            colors={"hsl(227, 86%, 63%)"}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "fries",
                },
                id: "dots",
              },
              {
                match: {
                  id: "sandwich",
                },
                id: "lines",
              },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            enableGridY={false}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[]}
            tooltip={({ value, color }) => (
              <div
                style={{
                  padding: 12,
                  color,
                  background: "#f7f7f7",
                  borderRadius: "10px",
                }}
              >
                <strong>{value.toLocaleString("ko-KR")}명</strong>
              </div>
            )}
          />
        </BarBox>
      </div>
    </div>
  );
};


// styled-components

// <========= 웹 =========>
// BarTitle1: '백신 종류별 접종수' 제목_디스크 이미지(img), 제목(h3), 출처(span)
const BarTitle1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 166px;
  height: 26px;
  margin-bottom: 10px;
  & > img {
    width: 24px;
    height: 24px;
  }
  & > h3 {
    width: 138px;
    white-space: nowrap;
    height: 26px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 26px;
    letter-spacing: -0.3px;
    color: #242424;
    padding-left: 4px;

    & > span {
      font-size: 12px;
      font-weight: lighter;
      color: ${theme.typoGrey3};
    }
  }
`;

// BarTitle2: '백신 부작용 Top4' 제목_디스크 이미지(img), 제목(h3), 출처(span)
const BarTitle2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 13px;
  width: 183px;
  height: 26px;
  margin-bottom: 10px;
  & > img {
    width: 24px;
    height: 24px;
  }
  & > h3 {
    width: 155px;
    white-space: nowrap;
    height: 26px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 26px;
    letter-spacing: -0.3px;
    color: #242424;
    padding-left: 4px;

    & > span {
      font-size: 12px;
      font-weight: lighter;
      color: ${theme.typoGrey3};
    }
  }
`;

//BarBox: 차트 감싸고 있는 네모 선박스
const BarBox = styled.div`
  width: 500px;
  height: 220px;
  border: 1px solid ${theme.typoLightGrey2};
  box-sizing: border-box;
  border-radius: 16px;
`;


// <========= Mobile ===========>

const BarTitle1Mobile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: 26px;
  margin: 40px auto 10px 16px;
  & > img {
    width: 24px;
    height: 24px;
  }
  & > h3 {
    /* width: 138px; */
    width: max-content;
    height: 26px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 26px;
    letter-spacing: -0.3px;
    color: #242424;
    padding-left: 4px;

    & > span {
      font-size: 10px;
      font-weight: lighter;
      color: ${theme.typoGrey3};
    }
  }
`;

const BarTitle2Mobile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px auto 10px 16px;
  /* width: 183px; */
  width: max-content;
  height: 26px;
  & > img {
    width: 24px;
    height: 24px;
  }
  & > h3 {
    /* width: 155px; */
    width: max-content;
    height: 26px;
    font-weight: bold;
    font-size: ${theme.SubHeadOneSize};
    line-height: 26px;
    letter-spacing: -0.3px;
    color: #242424;
    padding-left: 4px;

    & > span {
      font-size: 10px;
      font-weight: lighter;
      color: ${theme.typoGrey3};
    }
  }
`;

const BoxWrapperMobile = styled.div`
  width: 100%;
`;

const BarBoxMobile = styled.div`
  margin: 0px 16px;
  height: 220px;
  border: 1px solid ${theme.typoLightGrey2};
  box-sizing: border-box;
  border-radius: 16px;
`;

export default MainNivoBar
