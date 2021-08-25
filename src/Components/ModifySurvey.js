import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Text, Grid } from "../elements/index";
import { isMobileOnly } from "react-device-detect";
import { actionModifySurveyVisible } from "../redux/modules/modal";
import { actionSurveyUpdate } from "../redux/modules/user";

import styled from "styled-components";
import theme from "../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModifySurvey = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const [inputs, setInputs] = useState({
    isVaccine: user.isVaccine,
    degree: user.degree,
    type: user.type,
    gender: user.gender,
    age: user.age,
    disease: user.disease,
    afterEffect: user.afterEffect.split(", "),
  });

  // inputs에 있는 각각의 값들을 추출
  const { isVaccine, degree, type, gender, age, disease, afterEffect } = inputs;

  // 어느 하나라도 선택하지 않은 문항이 있다면 '수정'버튼을 비활성화
  const disableSubmitButton = () => {
    if (
      isVaccine === 2 ||
      degree === undefined ||
      type === undefined ||
      gender === undefined ||
      age === undefined ||
      disease === undefined ||
      afterEffect.includes("") ||
      afterEffect === []
    ) {
      return true;
    }
  };

  // 백신 접종 여부에서 '접종하지 않음'선택시 나머지 input을 disable하기 위해, isVaccine값은 선택 즉시 setState
  const handleIsVaccineClick = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: parseInt(value),
    });
  };

  // 클릭된 radio의 value를 setState
  const handleRadioClick = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    if (name === "isVaccine" && value === 1) {
      setInputs({
        ...inputs,
        [name]: parseInt(value),
      });
    }

    // 접종 회차는 백쪽에서 Int로 받아야해서 parseInt해준다
    else if (name === "degree") {
      setInputs({
        ...inputs,
        [name]: parseInt(value),
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  // 클릭된 checkbox의 value를 setState(유저가 후유증을 클릭한 순서대로 배열에 push해준다)
  const handleCheckboxClick = (e) => {
    const { value, name } = e.target;
    // console.log("클릭시 name, value 잘 가져오나?", name, value);
    // console.log("클릭시 afterEffect의 상태는?", afterEffect);

    // 접종하지않음에서 접종함으로 변경하는 경우, afterEffect의 첫상태가 [""]이다. 이때 발열 체크시 ["", "발열"] 이렇게 들어가기 때문에 원래 있던 ""를 지워줄 수 있어야한다.
    if (afterEffect.includes("")) {
      setInputs({
        ...inputs,
        [name]: [value],
      });
    } else {
      setInputs({
        ...inputs,
        [name]: [...afterEffect, value],
      });
    }

    // {
    //   ...inputs,
    //   [name]: afterEffect.filter((el) => el !== value),
    // }

    // 이미 클릭한 후유증을 또 클릭하는 경우, 선택을 취소하는 거니까 배열에서 삭제해준다.
    // inputs값이 현재값이라는걸 보장을 해줘야지!!!
    if (afterEffect.includes(value)) {
      setInputs((prev) => {
        const result = {
          ...prev,
          [name]: afterEffect.filter((el) => el !== value),
        };
        console.log(result.afterEffect);
        return result;
      });
    }
  };

  const handleSubmit = () => {
    if (afterEffect.indexOf("없음") !== -1) {
      setInputs((prev) => {
        const result = {
          ...prev,
          afterEffect: ["없음"],
        };
        return result;
      });
    }

    console.log(afterEffect);

    const userInfo = {
      id: user.userId,
      username: user.username,
      nickname: user.nickname,
    };

    const updatedUser = { ...inputs, ...userInfo };
    console.log(updatedUser);
    dispatch(actionSurveyUpdate(updatedUser));
  };
  // 동기가..아니야... setState는 이벤트처럼 처리됨.

  if (isMobileOnly) {
    return (
      <>
        <MobileOuter>
          <MobileInner onSubmit={handleSubmit}>
            <MobileXbutton
              onClick={() => {
                dispatch(actionModifySurveyVisible());
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                color={theme.typoGrey2}
                size="lg"
              />
            </MobileXbutton>
            <Grid is_flex="center" height="auto">
              <Text margin="70px auto 10px auto" size={theme.bodyOneSize} bold>
                백신 설문조사 수정
              </Text>
            </Grid>

            <MobileLine style={{ borderColor: "#242424" }} />
            <MobileSurveyItem>
              <Text bold color={theme.btnColor} size={theme.bodyOneSize}>
                백신 접종 여부
              </Text>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="isVaccine"
                    value="1"
                    id="isVaccine1"
                    onClick={handleIsVaccineClick}
                    defaultChecked={true === user.isVaccine}
                  />
                  <label
                    htmlFor="isVaccine1"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    접종함
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="isVaccine"
                    value="0"
                    id="isVaccine0"
                    onClick={handleIsVaccineClick}
                    defaultChecked={false === user.isVaccine}
                  />
                  <label
                    htmlFor="isVaccine0"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    접종하지않음
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </MobileSurveyItem>

            <MobileLine />
            <MobileSurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyOneSize}
              >
                접종 회차
              </Text>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="degree"
                    value="1"
                    id="degree1"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={1 === user.degree}
                  />
                  <label
                    htmlFor="degree1"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    1차 접종 완료
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="degree"
                    value="2"
                    id="degree2"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={2 === user.degree}
                  />
                  <label
                    htmlFor="degree2"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    2차 접종 완료
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </MobileSurveyItem>

            <MobileLine />
            <MobileSurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyOneSize}
              >
                백신 종류
              </Text>
              <ThreeOptions>
                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="모더나"
                    id="모더나"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"모더나" === user.type}
                  />
                  <label
                    htmlFor="모더나"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    모더나
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="얀센"
                    id="얀센"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"얀센" === user.type}
                  />
                  <label
                    htmlFor="얀센"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    얀센
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="아스트라제네카"
                    id="아스트라제네카"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"아스트라제네카" === user.type}
                  />
                  <label
                    htmlFor="아스트라제네카"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    아스트라제네카
                  </label>
                </Option>
              </ThreeOptions>
              <div></div>

              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="화이자"
                    id="화이자"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"화이자" === user.type}
                  />
                  <label
                    htmlFor="화이자"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    화이자
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="아스트라제네카 + 화이자"
                    id="아스트라제네카+화이자"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"아스트라제네카 + 화이자" === user.type}
                  />
                  <label
                    htmlFor="아스트라제네카+화이자"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    아스트라제네카 + 화이자
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </MobileSurveyItem>

            <MobileLine />
            <MobileSurveyItem>
              <Text bold color={theme.typoLightGrey2} size={theme.bodyOneSize}>
                성별
              </Text>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="gender"
                    value="남"
                    id="남"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"남" === user.gender}
                  />
                  <label
                    htmlFor="남"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    남
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="gender"
                    value="여"
                    id="여"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"여" === user.gender}
                  />
                  <label
                    htmlFor="여"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    여
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </MobileSurveyItem>

            <MobileLine />
            <MobileSurveyItem>
              <Text bold color={theme.typoLightGrey2} size={theme.bodyOneSize}>
                연령대
              </Text>
              <FourOptions>
                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="10"
                    id="10대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"10" === user.age}
                  />
                  <label
                    htmlFor="10대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    10대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="20"
                    id="20대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"20" === user.age}
                  />
                  <label
                    htmlFor="20대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    20대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="30"
                    id="30대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"30" === user.age}
                  />
                  <label
                    htmlFor="30대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    30대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="40"
                    id="40대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"40" === user.age}
                  />
                  <label
                    htmlFor="40대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    40대
                  </label>
                </Option>
              </FourOptions>
              <div></div>

              <FourOptions>
                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="50"
                    id="50대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"50" === user.age}
                  />
                  <label
                    htmlFor="50대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    50대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="60"
                    id="60대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"60" === user.age}
                  />
                  <label
                    htmlFor="60대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    60대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="70"
                    id="70대"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"70" === user.age}
                  />
                  <label
                    htmlFor="70대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    70대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="80"
                    id="80대이상"
                    onClick={handleRadioClick}
                    disabled={true}
                    defaultChecked={"80" === user.age}
                  />
                  <label
                    htmlFor="80대이상"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    80대 이상
                  </label>
                </Option>
              </FourOptions>
              {/* <div></div> */}
            </MobileSurveyItem>

            <MobileLine />
            <MobileSurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyOneSize}
              >
                기저 질환
              </Text>
              <ThreeOptions>
                <Option>
                  <input
                    type="radio"
                    name="disease"
                    value="유"
                    id="유"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"유" === user.disease}
                  />
                  <label
                    htmlFor="유"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    유
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="disease"
                    value="무"
                    id="무"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"무" === user.disease}
                  />
                  <label
                    htmlFor="무"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    무
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="disease"
                    value="모름"
                    id="모름"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"모름" === user.disease}
                  />
                  <label
                    htmlFor="모름"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    모름
                  </label>
                </Option>
              </ThreeOptions>
              {/* <div></div> */}
            </MobileSurveyItem>

            <MobileLine />
            <MobileSurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyOneSize}
              >
                부작용 (중복선택가능)
              </Text>
              <MobileLowerCheckbox style={{ marginBottom: "5px" }}>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="없음"
                    id="없음"
                    onClick={handleCheckboxClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={user.afterEffect.includes("없음")}
                  />
                  <label
                    htmlFor="없음"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    없음
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="발열"
                    id="발열"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("발열")}
                  />
                  <label
                    htmlFor="발열"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    발열
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="두통/관절통/근육통"
                    id="두통관절통근육통"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes(
                      "두통/관절통/근육통"
                    )}
                  />
                  <label
                    htmlFor="두통관절통근육통"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    두통/관절통/근육통
                  </label>
                </Option>
              </MobileLowerCheckbox>

              <MobileLowerCheckbox style={{ marginBottom: "5px" }}>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="피로감"
                    id="피로감"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("피로감")}
                  />
                  <label
                    htmlFor="피로감"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    피로감
                  </label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="접종부위 통증"
                    id="접종부위통증"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("접종부위 통증")}
                  />
                  <label
                    htmlFor="접종부위통증"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    접종부위 통증
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="구토/매스꺼움"
                    id="구토매스꺼움"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("구토/매스꺼움")}
                  />
                  <label
                    htmlFor="구토매스꺼움"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    구토/매스꺼움
                  </label>
                </Option>
              </MobileLowerCheckbox>

              <MobileLowerCheckbox style={{ marginBottom: "5px" }}>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="접종부위 부기/발적"
                    id="접종부위부기발적"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes(
                      "접종부위 부기/발적"
                    )}
                  />
                  <label
                    htmlFor="접종부위부기발적"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    접종부위 부기/발적
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="알러지 반응"
                    id="알러지반응"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("알러지 반응")}
                  />
                  <label
                    htmlFor="알러지반응"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    알러지 반응
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="기타"
                    id="기타"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("기타")}
                  />
                  <label
                    htmlFor="기타"
                    style={{ fontSize: `${theme.bodyThreeSize}` }}
                  >
                    기타
                  </label>
                </Option>
              </MobileLowerCheckbox>
              {/* <div></div> */}
            </MobileSurveyItem>

            <Grid is_flex="center" height="auto">
              <MobileSubmitButton
                type="submit"
                disabled={disableSubmitButton()}
              >
                수정완료
              </MobileSubmitButton>
            </Grid>
          </MobileInner>
        </MobileOuter>
      </>
    );
  }

  // form태그 onSubmit에 제출시 일어날 일을 함수로 주자.. 꼭!
  return (
    <>
      <Bg>
        <Modal>
          <Xbutton
            onClick={() => {
              dispatch(actionModifySurveyVisible());
            }}
          >
            <FontAwesomeIcon icon={faTimes} color={theme.typoGrey2} size="lg" />
          </Xbutton>

          <Wrapper onSubmit={handleSubmit}>
            {/* <form > */}

            <Text margin="10px auto" size={theme.headOneSize} bold>
              백신 설문조사 수정
            </Text>

            <Line style={{ borderColor: "#242424" }} />
            <SurveyItem>
              <Text bold color={theme.btnColor} size={theme.bodyTwoSize}>
                백신 접종 여부
              </Text>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="isVaccine"
                    value="1"
                    id="isVaccine1"
                    onClick={handleIsVaccineClick}
                    defaultChecked={true === user.isVaccine}
                  />
                  <label
                    htmlFor="isVaccine1"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    접종함
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="isVaccine"
                    value="0"
                    id="isVaccine0"
                    onClick={handleIsVaccineClick}
                    disabled={true}
                    defaultChecked={false === user.isVaccine}
                  />
                  <label
                    htmlFor="isVaccine0"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    접종하지않음
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </SurveyItem>

            <Line />
            <SurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyTwoSize}
              >
                접종 회차
              </Text>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="degree"
                    value="1"
                    id="degree1"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={1 === user.degree}
                  />
                  <label
                    htmlFor="degree1"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    1차 접종 완료
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="degree"
                    value="2"
                    id="degree2"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={2 === user.degree}
                  />
                  <label
                    htmlFor="degree2"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    2차 접종 완료
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </SurveyItem>

            <Line />
            <SurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyTwoSize}
              >
                백신 종류
              </Text>
              <ThreeOptions>
                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="모더나"
                    id="모더나"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"모더나" === user.type}
                  />
                  <label
                    htmlFor="모더나"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    모더나
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="얀센"
                    id="얀센"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"얀센" === user.type}
                  />
                  <label
                    htmlFor="얀센"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    얀센
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="아스트라제네카"
                    id="아스트라제네카"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"아스트라제네카" === user.type}
                  />
                  <label
                    htmlFor="아스트라제네카"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    아스트라제네카
                  </label>
                </Option>
              </ThreeOptions>
              <div></div>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="화이자"
                    id="화이자"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"화이자" === user.type}
                  />
                  <label
                    htmlFor="화이자"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    화이자
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="type"
                    value="아스트라제네카 + 화이자"
                    id="아스트라제네카+화이자"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"아스트라제네카 + 화이자" === user.type}
                  />
                  <label
                    htmlFor="아스트라제네카+화이자"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    아스트라제네카 + 화이자
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </SurveyItem>

            <Line />
            <SurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyTwoSize}
              >
                성별
              </Text>
              <TwoOptions>
                <Option>
                  <input
                    type="radio"
                    name="gender"
                    value="남"
                    id="남"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"남" === user.gender}
                  />
                  <label
                    htmlFor="남"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    남
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="gender"
                    value="여"
                    id="여"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"여" === user.gender}
                  />
                  <label
                    htmlFor="여"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    여
                  </label>
                </Option>
              </TwoOptions>
              {/* <div></div> */}
            </SurveyItem>

            <Line />
            <SurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyTwoSize}
              >
                연령대
              </Text>
              <FourOptions>
                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="10"
                    id="10대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"10" === user.age}
                  />
                  <label
                    htmlFor="10대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    10대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="20"
                    id="20대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"20" === user.age}
                  />
                  <label
                    htmlFor="20대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    20대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="30"
                    id="30대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"30" === user.age}
                  />
                  <label
                    htmlFor="30대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    30대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="40"
                    id="40대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"40" === user.age}
                  />
                  <label
                    htmlFor="40대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    40대
                  </label>
                </Option>
              </FourOptions>
              <div></div>

              <FourOptions>
                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="50"
                    id="50대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"50" === user.age}
                  />
                  <label
                    htmlFor="50대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    50대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="60"
                    id="60대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"60" === user.age}
                  />
                  <label
                    htmlFor="60대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    60대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="70"
                    id="70대"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"70" === user.age}
                  />
                  <label
                    htmlFor="70대"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    70대
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="age"
                    value="80"
                    id="80대이상"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"80" === user.age}
                  />
                  <label
                    htmlFor="80대이상"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    80대 이상
                  </label>
                </Option>
              </FourOptions>
              {/* <div></div> */}
            </SurveyItem>

            <Line />
            <SurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyTwoSize}
              >
                기저 질환
              </Text>
              <ThreeOptions>
                <Option>
                  <input
                    type="radio"
                    name="disease"
                    value="유"
                    id="유"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"유" === user.disease}
                  />
                  <label
                    htmlFor="유"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    유
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="disease"
                    value="무"
                    id="무"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"무" === user.disease}
                  />
                  <label
                    htmlFor="무"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    무
                  </label>
                </Option>

                <Option>
                  <input
                    type="radio"
                    name="disease"
                    value="모름"
                    id="모름"
                    onClick={handleRadioClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={"모름" === user.disease}
                  />
                  <label
                    htmlFor="모름"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    모름
                  </label>
                </Option>
              </ThreeOptions>
              {/* <div></div> */}
            </SurveyItem>

            <Line />
            <SurveyItem>
              <Text
                bold
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyTwoSize}
              >
                부작용
              </Text>
              <UpperCheckbox>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="없음"
                    id="없음"
                    onClick={handleCheckboxClick}
                    disabled={!isVaccine && "disabled"}
                    defaultChecked={user.afterEffect.includes("없음")}
                  />
                  <label
                    htmlFor="없음"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    없음
                  </label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="발열"
                    id="발열"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("발열")}
                  />
                  <label
                    htmlFor="발열"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    발열
                  </label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="두통/관절통/근육통"
                    id="두통관절통근육통"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes(
                      "두통/관절통/근육통"
                    )}
                  />
                  <label
                    htmlFor="두통관절통근육통"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    두통/관절통/근육통
                  </label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="피로감"
                    id="피로감"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("피로감")}
                  />
                  <label
                    htmlFor="피로감"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    피로감
                  </label>
                </Option>
              </UpperCheckbox>
              <Text
                color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
                size={theme.bodyThreeSize}
              >
                (중복선택가능)
              </Text>

              <TwoOptions>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="접종부위 통증"
                    id="접종부위통증"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("접종부위 통증")}
                  />
                  <label
                    htmlFor="접종부위통증"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    접종부위 통증
                  </label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="접종부위 부기/발적"
                    id="접종부위부기발적"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes(
                      "접종부위 부기/발적"
                    )}
                  />
                  <label
                    htmlFor="접종부위부기발적"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    접종부위 부기/발적
                  </label>
                </Option>
              </TwoOptions>
              <div></div>

              <ThreeOptions>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="구토/매스꺼움"
                    id="구토매스꺼움"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("구토/매스꺼움")}
                  />
                  <label
                    htmlFor="구토매스꺼움"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    구토/매스꺼움
                  </label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="알러지 반응"
                    id="알러지반응"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("알러지 반응")}
                  />
                  <label
                    htmlFor="알러지반응"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    알러지 반응
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    name="afterEffect"
                    value="기타"
                    id="기타"
                    onClick={handleCheckboxClick}
                    disabled={
                      (!isVaccine || afterEffect.includes("없음")) && "disabled"
                    }
                    defaultChecked={user.afterEffect.includes("기타")}
                  />
                  <label
                    htmlFor="기타"
                    style={{ fontSize: `${theme.bodyTwoSize}` }}
                  >
                    기타
                  </label>
                </Option>
              </ThreeOptions>
              {/* <div></div> */}
            </SurveyItem>

            <SubmitButton
              type="submit"
              disabled={disableSubmitButton()}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              수정
            </SubmitButton>
            {/* </form> */}
          </Wrapper>
        </Modal>
      </Bg>
    </>
  );
};

// 모달 떴을 때 배경에 깔리는 반투명한 까망이
const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
`;

// (하얀 배경의) 모달
const Modal = styled.div`
  width: max-content;
  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 40px;
`;

const Xbutton = styled.div`
  margin: 0 0 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.form`
  width: max-content;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${theme.typoLightGrey2};
  margin: 15px 0;
`;

const SurveyItem = styled.div`
  width: 550px;
  height: auto;
  text-align: left;
  display: grid;
  grid-template-columns: 130px auto;
  row-gap: 1rem;
`;

const Option = styled.div`
  display: flex;
`;

const TwoOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35%, auto));
`;

const ThreeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(27%, auto));
`;

const FourOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(20%, auto));
`;

const UpperCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(15%, auto));
`;

const SubmitButton = styled.button`
  margin: 30px 0 0 0;
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  background-color: ${theme.typoBlack};
  border: none;
  color: white;
  transition: background-color 0.3s;
  font-size: ${theme.bodyTwoSize};
  :hover {
    cursor: pointer;
    background-color: white;
    color: ${theme.typoBlack};
    border: 1px solid ${theme.typoBlack};
  }
  :disabled {
    background-color: ${theme.typoLightGrey2};
    cursor: default;
    color: white;
    border: none;
  }
`;

// <========= Mobile ==========>

const MobileOuter = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
`;

const MobileInner = styled.form`
  width: 90%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MobileLine = styled.div`
  width: 100%;
  border-top: 1px solid ${theme.typoLightGrey2};
  margin: ${theme.bodyTwoHeight} 0;
`;

const MobileSurveyItem = styled.div`
  width: 100%;
  height: auto;
  text-align: left;
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
`;

const MobileLowerCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(20%, auto));
  margin-bottom: 5px;
`;

const MobileSubmitButton = styled.button`
  margin: 60px 0 80px 0;
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  background-color: ${theme.typoBlack};
  border: none;
  color: white;
  transition: background-color 0.3s;
  font-size: ${theme.bodyTwoSize};
  :disabled {
    background-color: ${theme.typoLightGrey2};
    cursor: default;
    color: white;
    border: none;
  }
`;

const MobileXbutton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default ModifySurvey;
