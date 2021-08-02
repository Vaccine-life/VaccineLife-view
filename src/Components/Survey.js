import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";
import { useDispatch } from "react-redux";
import { actionVisible } from "../redux/modules/modal";

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
    console.log(e.target.value);
  };
  const handleDegreeClick = (e) => {
    setDegree(e.target.value);
    console.log(e.target.value);
  };
  const handleTypeClick = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };
  const handleGenderClick = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };
  const handleAgeClick = (e) => {
    setAge(e.target.value);
    console.log(e.target.value);
  };
  const handleDiseaseClick = (e) => {
    setDisease(e.target.value);
    console.log(e.target.value);
  };
  const handleAfterEffectClick = (e) => {
    setAfterEffect(e.target.value);
    console.log(e.target.value);
  };

  // const disableRest = () => {
  //   if(!isVaccine) {
  //     disabled
  //   }
  // }

  return (
    <>
      <form>
        <Text margin="2vh auto" size="14px">
          회원가입이 곧 마무리됩니다
        </Text>
        <Text margin="2vh 0 6vh 0" size="20px" bold>
          여러분의 백신 접종 경험을 공유해주세요
        </Text>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            백신 접종 여부
          </Text>
          <Options>
            <input
              type="radio"
              name="isVaccine"
              value="1"
              onClick={handleIsVaccineClick}
            />
            접종함
            <input
              type="radio"
              name="isVaccine"
              value="0"
              onClick={handleIsVaccineClick}
            />
            접종하지않음
          </Options>
          <div></div>
        </SurveyItem>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            접종 회차
          </Text>
          <Options>
            <input
              type="radio"
              name="degree"
              value="1"
              onClick={handleDegreeClick}
            />
            1차 접종 완료
            <input
              type="radio"
              name="degree"
              value="2"
              onClick={handleDegreeClick}
            />
            2차 접종 완료
          </Options>
          <div></div>
        </SurveyItem>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            백신 종류
          </Text>
          <Options>
            <input
              type="radio"
              name="type"
              value="모더나"
              onClick={handleTypeClick}
            />
            모더나
            <input
              type="radio"
              name="type"
              value="얀센"
              onClick={handleTypeClick}
            />
            얀센
            <input
              type="radio"
              name="type"
              value="아스트라제네카"
              onClick={handleTypeClick}
            />
            아스트라제네카
          </Options>
          <div></div>
          <Options>
            <input
              type="radio"
              name="type"
              value="화이자"
              onClick={handleTypeClick}
            />
            화이자
            <input
              type="radio"
              name="type"
              value="아스트라제네카 + 화이자"
              onClick={handleTypeClick}
            />
            아스트라제네카 + 화이자
          </Options>
          <div></div>
        </SurveyItem>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            성별
          </Text>
          <Options>
            <input
              type="radio"
              name="gender"
              value="남"
              onClick={handleGenderClick}
            />
            남
            <input
              type="radio"
              name="gender"
              value="여"
              onClick={handleGenderClick}
            />
            여
          </Options>
          <div></div>
        </SurveyItem>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            연령대
          </Text>
          <Options>
            <input
              type="radio"
              name="age"
              value="10"
              onClick={handleAgeClick}
            />
            10대
            <input
              type="radio"
              name="age"
              value="20"
              onClick={handleAgeClick}
            />
            20대
            <input
              type="radio"
              name="age"
              value="30"
              onClick={handleAgeClick}
            />
            30대
            <input
              type="radio"
              name="age"
              value="40"
              onClick={handleAgeClick}
            />
            40대
            <input
              type="radio"
              name="age"
              value="50"
              onClick={handleAgeClick}
            />
            50대
          </Options>
          <div></div>
          <Options>
            <input
              type="radio"
              name="age"
              value="60"
              onClick={handleAgeClick}
            />
            60대
            <input
              type="radio"
              name="age"
              value="70"
              onClick={handleAgeClick}
            />
            70대
            <input
              type="radio"
              name="age"
              value="80"
              onClick={handleAgeClick}
            />
            80대 이상
          </Options>
          <div></div>
        </SurveyItem>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            기저 질환
          </Text>
          <Options>
            <input
              type="radio"
              name="disease"
              value="1"
              onClick={handleDiseaseClick}
            />
            유
            <input
              type="radio"
              name="disease"
              value="0"
              onClick={handleDiseaseClick}
            />
            무
            <input
              type="radio"
              name="disease"
              value="2"
              onClick={handleDiseaseClick}
            />
            모름
          </Options>
          <div></div>
        </SurveyItem>

        <SurveyItem>
          <Text bold color={theme.btnColor}>
            후유증
          </Text>
          <Options>
            <input
              type="checkbox"
              name="afterEffect"
              value="fever"
              onClick={handleAfterEffectClick}
            />
            발열
            <input
              type="checkbox"
              name="afterEffect"
              value="partialAche"
              onClick={handleAfterEffectClick}
            />
            접종부위 통증
            <input
              type="checkbox"
              name="afterEffect"
              value="swelling"
              onClick={handleAfterEffectClick}
            />
            접종부위 부기/발적
            <input
              type="checkbox"
              name="afterEffect"
              value="vomit"
              onClick={handleAfterEffectClick}
            />
            구토/매스꺼움
          </Options>
          <div></div>
          <Options>
            <input
              type="checkbox"
              name="afterEffect"
              value="ache"
              onClick={handleAfterEffectClick}
            />
            두통/관절통/근육통
            <input
              type="checkbox"
              name="afterEffect"
              value="fatigue"
              onClick={handleAfterEffectClick}
            />
            피로감
            <input
              type="checkbox"
              name="afterEffect"
              value="alergy"
              onClick={handleAfterEffectClick}
            />
            알러지 반응
            <input
              type="checkbox"
              name="afterEffect"
              value="etc"
              onClick={handleAfterEffectClick}
            />
            기타
            <input
              type="checkbox"
              name="afterEffect"
              value="noSymptom"
              onClick={handleAfterEffectClick}
            />
            무증상
          </Options>
          <div></div>
        </SurveyItem>

        <Button
          margin="2vh auto"
          width="20%"
          height="3vh"
          type="submit"
          bg={theme.btnColor}
          _onClick={() => dispatch(actionVisible())}
        >
          회원가입
        </Button>
      </form>
    </>
  );
};

const SurveyItem = styled.div`
  width: 600px;
  height: auto;
  text-align: left;
  display: grid;
  grid-template-columns: 8em auto;
  row-gap: 1rem;
`;

const Options = styled.div`
  display: flex;
  justify-content: left;
`;

export default Survey;
