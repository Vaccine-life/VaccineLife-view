import React, { useState, useEffect } from "react";
import disc from "../images/disc.png";
import styled from "styled-components";
import theme from "../styles/theme";
import { ResponsiveBar } from "@nivo/bar";
import { isMobileOnly } from "react-device-detect";
import { mainAxios } from "../shared/api";
import logger from "../shared/logger";

const MainNivoBar = () => {
  const [afterEffect0, setAfterEffect0] = useState();
  const [afterEffect1, setAfterEffect1] = useState();
  const [afterEffect2, setAfterEffect2] = useState();
  const [afterEffect3, setAfterEffect3] = useState();

  const afterEffectData = async () => {
    try {
      const afterEffectRes = await mainAxios.getAfterEffectChart();
      // console.log("afterEffectRes.data", afterEffectRes.data);

      const afterEffectNumArr = Object.values(afterEffectRes.data);
      afterEffectNumArr.sort(function (a, b) {
        return b - a;
      });
      // console.log(afterEffectNumArr);
      setAfterEffect0(afterEffectNumArr[0]);
      setAfterEffect1(afterEffectNumArr[1]);
      setAfterEffect2(afterEffectNumArr[2]);
      setAfterEffect3(afterEffectNumArr[3]);
      console.log(afterEffect0, afterEffect1, afterEffect2, afterEffect3);

      const getKeybyValue = () => {
        const korNames = [];
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
        console.log(korNames);
      };
      getKeybyValue();
    } catch (error) {
      logger(error);
    }
  };

  // afterEffectRes.data의 value들을 배열에 넣고 내림차순으로 sort해~
  // -> e.g. [50, 47, 36, 35]
  // -> 이 배열의 요소를 value로 갖는 key를 뱉게 한다 e.g. headache...
  useEffect(() => {
    afterEffectData();
  }, []);

  // 내려온 숫자값들 넣기 -> afterEffectNumArr[0], ...
  // 한글이름(라벨)으로 바꿔주기
  // -> 상위 4개의 key값을 배열로 만들어주고
  // -> if문 활용? e.g. if headache => 두통/관절통/근육통으로 print

  if (isMobileOnly) {
    return (
      <div>
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
                    vaccine: 63862,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    vaccines: "얀센",
                    vaccine: 1135524,
                    vaccineColor: "hsl(169, 70%, 50%)",
                  },
                  {
                    vaccines: "화이자",
                    vaccine: 5349383,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    vaccines: "AZ",
                    vaccine: 6335453,
                    vaccineColor: "hsl(227, 86%, 63%)",
                  },
                ]}
                keys={["vaccine"]}
                indexBy="vaccines"
                margin={{ top: 0, right: 50, bottom: 0, left: 70 }}
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
                labelTextColor="white"
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

        <div>
          <BarTitle2Mobile>
            <img src={disc} alt="" />
            <h3>
              백신 부작용 Top4<span> (추후 서비스 제공)</span>
            </h3>
          </BarTitle2Mobile>
          <BoxWrapperMobile>
            <BarBoxMobile>
              <ResponsiveBar
                data={[
                  {
                    aftereffects: "",
                    aftereffect: 0,
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    aftereffects: "",
                    aftereffect: 0,
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    aftereffects: "",
                    aftereffect: 0,
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                  {
                    aftereffects: "",
                    aftereffect: 0,
                    ageColor: "hsl(227, 86%, 63%)",
                  },
                ]}
                keys={["aftereffect"]}
                indexBy="aftereffects"
                margin={{ top: 0, right: 50, bottom: 0, left: 70 }}
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
                // {
                //     tickSize: 5,
                //     tickPadding: ,
                //     tickRotation: 0,
                //     legend: '',
                //     legendPosition: 'middle',
                //     legendOffset: 32
                // }
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

  return (
    <div>
      <div>
        <BarTitle1>
          <img src={disc} alt="" />
          <h3>
            백신 종류별 접종수<span> (출처: 질병관리청)</span>
          </h3>
        </BarTitle1>
        <BarBox>
          <ResponsiveBar
            data={[
              {
                vaccines: "모더나",
                vaccine: 63862,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
              {
                vaccines: "얀센",
                vaccine: 1135524,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
              {
                vaccines: "화이자",
                vaccine: 5349383,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
              {
                vaccines: "AZ",
                vaccine: 6335453,
                vaccineColor: "hsl(227, 86%, 63%)",
              },
            ]}
            keys={["vaccine"]}
            indexBy="vaccines"
            margin={{ top: 0, right: 50, bottom: 0, left: 70 }}
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

      <div>
        <BarTitle2>
          <img src={disc} alt="" />
          <h3>
            백신 부작용 Top 4<span> (추후 서비스 제공)</span>
          </h3>
        </BarTitle2>
        <BarBox>
          <ResponsiveBar
            data={[
              {
                aftereffects: "",
                aftereffect: 0,
                ageColor: "hsl(227, 86%, 63%)",
              },
              {
                aftereffects: "",
                aftereffect: 0,
                ageColor: "hsl(227, 86%, 63%)",
              },
              {
                aftereffects: "",
                aftereffect: 0,
                ageColor: "hsl(227, 86%, 63%)",
              },
              {
                aftereffects: "",
                aftereffect: 0,
                ageColor: "hsl(227, 86%, 63%)",
              },
            ]}
            keys={["aftereffect"]}
            indexBy="aftereffects"
            margin={{ top: 0, right: 50, bottom: 0, left: 70 }}
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
            // {
            //     tickSize: 5,
            //     tickPadding: ,
            //     tickRotation: 0,
            //     legend: '',
            //     legendPosition: 'middle',
            //     legendOffset: 32
            // }
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
        </BarBox>
      </div>
    </div>
  );
};

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
    }
  }
`;

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
    }
  }
`;

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

export default MainNivoBar;
