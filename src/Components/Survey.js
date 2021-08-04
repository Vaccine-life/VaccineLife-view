import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";
import { useDispatch } from "react-redux";
import { actionVisible } from "../redux/modules/modal";
import { actionSetUser } from "../redux/modules/user";

const Survey = (props) => {
  const dispatch = useDispatch();
  const [isVaccine, setIsVaccine] = useState(1); // 0 1
  const [degree, setDegree] = useState(1); // 1 2
  const [type, setType] = useState(""); // 나머지 string
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(10);
  const [disease, setDisease] = useState(0);
  const [afterEffect, setAfterEffect] = useState("");

  const handleIsVaccineClick = (e) => {
    setIsVaccine(e.target.value);
  };
  const handleDegreeClick = (e) => {
    setDegree(e.target.value);
  };
  const handleTypeClick = (e) => {
    setType(e.target.value);
  };
  const handleGenderClick = (e) => {
    setGender(e.target.value);
  };
  const handleAgeClick = (e) => {
    setAge(e.target.value);
  };
  const handleDiseaseClick = (e) => {
    setDisease(e.target.value);
  };
  const handleAfterEffectClick = (e) => {
    setAfterEffect(e.target.value);
  };

  const submitSurvey = () => {
    let survey = {
      isVaccine: isVaccine,
      degree: degree,
      type: type,
      gender: gender,
      age: age,
      disease: disease,
      afterEffect: afterEffect,
    };

    // state.user에 설문조사 데이터를 넣어줌
    dispatch(actionSetUser(survey));
    console.log(survey);

    // 모달 끄기
    dispatch(actionVisible());
  };

  return (
    <>
      <form>
        <Text margin="0 auto 15px auto" size="14px" color={theme.typoGrey3}>
          회원가입이 곧 마무리됩니다
        </Text>
        <Text margin="15px auto" size="20px" bold>
          여러분의 백신 접종 경험을 공유해주세요
        </Text>

        <Line style={{ borderColor: "#242424" }} />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            백신 접종 여부
          </Text>
          <TwoOptions>
            <input
              type="radio"
              name="isVaccine"
              value="1"
              id="isVaccine1"
              onClick={handleIsVaccineClick}
            />
            <label htmlFor="isVaccine1">접종함</label>
            <input
              type="radio"
              name="isVaccine"
              value="0"
              id="isVaccine0"
              onClick={handleIsVaccineClick}
            />
            <label htmlFor="isVaccine0">접종하지않음</label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            접종 회차
          </Text>
          <TwoOptions>
            <input
              type="radio"
              name="degree"
              value="1"
              id="degree1"
              onClick={handleDegreeClick}
            />
            <label htmlFor="degree1">1차 접종 완료</label>
            <input
              type="radio"
              name="degree"
              value="2"
              id="degree2"
              onClick={handleDegreeClick}
            />
            <label htmlFor="degree2">2차 접종 완료</label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            백신 종류
          </Text>
          <ThreeOptions>
            <input
              type="radio"
              name="type"
              value="모더나"
              id="모더나"
              onClick={handleTypeClick}
            />
            <label htmlFor="모더나">모더나</label>
            <input
              type="radio"
              name="type"
              value="얀센"
              id="얀센"
              onClick={handleTypeClick}
            />
            <label htmlFor="얀센">얀센</label>
            <input
              type="radio"
              name="type"
              value="아스트라제네카"
              id="아스트라제네카"
              onClick={handleTypeClick}
            />
            <label htmlFor="아스트라제네카">아스트라제네카</label>
          </ThreeOptions>
          <div></div>
          <TwoOptions>
            <input
              type="radio"
              name="type"
              value="화이자"
              id="화이자"
              onClick={handleTypeClick}
            />
            <label htmlFor="화이자">화이자</label>
            <input
              type="radio"
              name="type"
              value="아스트라제네카 + 화이자"
              id="아스트라제네카 + 화이자"
              onClick={handleTypeClick}
            />
            <label htmlFor="아스트라제네카 + 화이자">
              아스트라제네카 + 화이자
            </label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            성별
          </Text>
          <TwoOptions>
            <input
              type="radio"
              name="gender"
              value="남"
              id="남"
              onClick={handleGenderClick}
            />
            <label htmlFor="남">남</label>
            <input
              type="radio"
              name="gender"
              value="여"
              id="여"
              onClick={handleGenderClick}
            />
            <label htmlFor="여">여</label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            연령대
          </Text>
          <FourOptions>
            <input
              type="radio"
              name="age"
              value="10"
              id="10대"
              onClick={handleAgeClick}
            />
            <label htmlFor="10대">10대</label>
            <input
              type="radio"
              name="age"
              value="20"
              id="20대"
              onClick={handleAgeClick}
            />
            <label htmlFor="20대">20대</label>
            <input
              type="radio"
              name="age"
              value="30"
              id="30대"
              onClick={handleAgeClick}
            />
            <label htmlFor="30대">30대</label>
            <input
              type="radio"
              name="age"
              value="40"
              id="40대"
              onClick={handleAgeClick}
            />
            <label htmlFor="40대">40대</label>
          </FourOptions>
          <div></div>

          <FourOptions>
            <input
              type="radio"
              name="age"
              value="50"
              id="50대"
              onClick={handleAgeClick}
            />
            <label htmlFor="50대">50대</label>
            <input
              type="radio"
              name="age"
              value="60"
              id="60대"
              onClick={handleAgeClick}
            />
            <label htmlFor="60대">60대</label>
            <input
              type="radio"
              name="age"
              value="70"
              id="70대"
              onClick={handleAgeClick}
            />
            <label htmlFor="70대">70대</label>
            <input
              type="radio"
              name="age"
              value="80"
              id="80대이상"
              onClick={handleAgeClick}
            />
            <label htmlFor="80대이상">80대 이상</label>
          </FourOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            기저 질환
          </Text>
          <ThreeOptions>
            <input
              type="radio"
              name="disease"
              value="1"
              id="유"
              onClick={handleDiseaseClick}
            />
            <label htmlFor="유">유</label>
            <input
              type="radio"
              name="disease"
              value="0"
              id="무"
              onClick={handleDiseaseClick}
            />
            <label htmlFor="무">무</label>
            <input
              type="radio"
              name="disease"
              value="2"
              id="모름"
              onClick={handleDiseaseClick}
            />
            <label htmlFor="모름">모름</label>
          </ThreeOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text bold color={theme.btnColor}>
            후유증
            <br />
            (중복선택가능)
          </Text>
          <FourCheckbox>
            <input
              type="checkbox"
              name="afterEffect"
              value="fever"
              id="발열"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="발열">발열</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="partialAche"
              id="접종부위통증"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="접종부위통증">접종부위 통증</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="swelling"
              id="접종부위부기발적"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="접종부위부기발적">접종부위 부기/발적</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="vomit"
              id="구토매스꺼움"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="구토매스꺼움">구토/매스꺼움</label>
          </FourCheckbox>
          <div></div>
          <FiveCheckbox>
            <input
              type="checkbox"
              name="afterEffect"
              value="ache"
              id="두통관절통근육통"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="두통관절통근육통">두통/관절통/근육통</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="fatigue"
              id="피로감"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="피로감">피로감</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="alergy"
              id="알러지반응"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="알러지반응">알러지 반응</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="etc"
              id="기타"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="기타">기타</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="noSymptom"
              id="무증상"
              onClick={handleAfterEffectClick}
            />
            <label htmlFor="무증상">무증상</label>
          </FiveCheckbox>
          {/* <div></div> */}
        </SurveyItem>

        <Button
          margin="35px 0 0 0"
          width={theme.mediumButtonWidth}
          height={theme.mediumButtonHeight}
          type="submit"
          bg="#242424"
          _onClick={submitSurvey}
        >
          회원가입
        </Button>
      </form>
    </>
  );
};

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
  grid-template-columns: 100px auto;
  row-gap: 1rem;
`;

const TwoOptions = styled.div`
  display: grid;
  grid-template-columns: 20px 220px 20px 220px;
`;

const ThreeOptions = styled.div`
  display: grid;
  grid-template-columns: 20px 120px 20px 120px 20px 160px;
`;

const FourOptions = styled.div`
  display: grid;
  grid-template-columns: 20px 60px 20px 60px 20px 60px 20px 90px;
`;

const FourCheckbox = styled.div`
  display: grid;
  grid-template-columns: 20px 38px 20px 98px 20px 135px 20px 100px;
`;

const FiveCheckbox = styled.div`
  display: grid;
  grid-template-columns: 20px 135px 20px 50px 20px 80px 20px 35px 20px 50px;
`;

export default Survey;
