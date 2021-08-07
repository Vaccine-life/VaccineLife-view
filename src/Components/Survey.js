import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { actionVisible } from "../redux/modules/modal";
import { actionSetUser } from "../redux/modules/user";
import survey from "./survey.css";

const Survey = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [inputs, setInputs] = useState({
    isVaccine: 2,
    degree: 0,
    type: "",
    gender: "",
    age: "",
    disease: "",
    afterEffect: "",
  });

  // useEffect(() => {
  //   // dispatch(actionSetUser(inputs));
  //   console.log(user);
  // }, []);

  // inputs에 있는 각각의 값들을 추출
  const { isVaccine, degree, type, gender, age, disease, afterEffect } = inputs;

  // 어느 하나라도 입력이 안되어 기본값으로만 되어있다면, SubmitButton을 disabled처리한다.
  const ableSubmitButton = () => {
    console.log("user.isVaccine", user.isVaccine);
    if (user.isVaccine === 0) {
      return false;
    }
    if (
      user.isVaccine === 2 ||
      user.degree === 0 ||
      user.type === "" ||
      user.gender === "" ||
      user.age === "" ||
      user.disease === "" ||
      user.afterEffect === ""
    ) {
      return true;
    }
  };

  // 백신 접종 여부에서 '접종하지 않음'선택시 나머지 input을 disable하기 위해, isVaccine값은 선택 즉시 store에 저장
  const handleIsVaccineClick = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: parseInt(value),
    });

    console.log(name, value);
    console.log(inputs);
    // state.user에 설문조사 데이터를 넣어줌
    dispatch(actionSetUser(inputs));
  };

  // 클릭된 radio의 value를 setState
  const handleRadioClick = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });

    console.log(name, value);
    // state.user에 설문조사 데이터를 넣어줌
    dispatch(actionSetUser(inputs));
  };

  // 클릭된 checkbox의 value를 setState(유저가 후유증을 클릭한 순서대로 배열에 push해준다)
  const handleCheckboxClick = (e) => {
    const { value, name } = e.target;

    // if문: 이미 클릭한 후유증을 또 클릭하는 경우, 선택을 취소하는 거니까 배열에서 삭제해준다.
    if (afterEffect.includes(value)) {
      setInputs({
        ...inputs,
        [name]: afterEffect.filter((el) => el !== value),
      });
    } else {
      setInputs({
        ...inputs,
        [name]: [...afterEffect, value],
      });
    }
  };

  const submitSurvey = () => {
    let survey = {
      isVaccine: parseInt(isVaccine),
      degree: parseInt(degree),
      type: type,
      gender: gender,
      age: age,
      disease: disease,
      afterEffect: afterEffect.sort().join(", "),
    };

    console.log(survey);

    // state.user에 설문조사 데이터를 넣어줌
    dispatch(actionSetUser(survey));

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
          <Text
            bold
            color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
          >
            접종 회차
          </Text>
          <TwoOptions>
            <input
              type="radio"
              name="degree"
              value="1"
              id="degree1"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="degree1">1차 접종 완료</label>
            <input
              type="radio"
              name="degree"
              value="2"
              id="degree2"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="degree2">2차 접종 완료</label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text
            bold
            color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
          >
            백신 종류
          </Text>
          <ThreeOptions>
            <input
              type="radio"
              name="type"
              value="모더나"
              id="모더나"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="모더나">모더나</label>
            <input
              type="radio"
              name="type"
              value="얀센"
              id="얀센"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="얀센">얀센</label>
            <input
              type="radio"
              name="type"
              value="아스트라제네카"
              id="아스트라제네카"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
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
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="화이자">화이자</label>
            <input
              type="radio"
              name="type"
              value="아스트라제네카 + 화이자"
              id="아스트라제네카+화이자"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="아스트라제네카+화이자">
              아스트라제네카 + 화이자
            </label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text
            bold
            color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
          >
            성별
          </Text>
          <TwoOptions>
            <input
              type="radio"
              name="gender"
              value="남"
              id="남"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="남">남</label>
            <input
              type="radio"
              name="gender"
              value="여"
              id="여"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="여">여</label>
          </TwoOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text
            bold
            color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
          >
            연령대
          </Text>
          <FourOptions>
            <input
              type="radio"
              name="age"
              value="10"
              id="10대"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="10대">10대</label>
            <input
              type="radio"
              name="age"
              value="20"
              id="20대"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="20대">20대</label>
            <input
              type="radio"
              name="age"
              value="30"
              id="30대"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="30대">30대</label>
            <input
              type="radio"
              name="age"
              value="40"
              id="40대"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
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
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="50대">50대</label>
            <input
              type="radio"
              name="age"
              value="60"
              id="60대"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="60대">60대</label>
            <input
              type="radio"
              name="age"
              value="70"
              id="70대"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="70대">70대</label>
            <input
              type="radio"
              name="age"
              value="80"
              id="80대이상"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="80대이상">80대 이상</label>
          </FourOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text
            bold
            color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
          >
            기저 질환
          </Text>
          <ThreeOptions>
            <input
              type="radio"
              name="disease"
              value="유"
              id="유"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="유">유</label>
            <input
              type="radio"
              name="disease"
              value="무"
              id="무"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="무">무</label>
            <input
              type="radio"
              name="disease"
              value="모름"
              id="모름"
              onClick={handleRadioClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="모름">모름</label>
          </ThreeOptions>
          {/* <div></div> */}
        </SurveyItem>

        <Line />
        <SurveyItem>
          <Text
            bold
            color={(!isVaccine && "#dfdfdf") || (isVaccine && "#4F72F2")}
          >
            후유증
            <br />
            (중복선택가능)
          </Text>
          <FourCheckbox>
            <input
              type="checkbox"
              name="afterEffect"
              value="발열"
              id="발열"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="발열">발열</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="접종부위 통증"
              id="접종부위통증"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="접종부위통증">접종부위 통증</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="접종부위 부기/발적"
              id="접종부위부기발적"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="접종부위부기발적">접종부위 부기/발적</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="구토/매스꺼움"
              id="구토매스꺼움"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="구토매스꺼움">구토/매스꺼움</label>
          </FourCheckbox>
          <div></div>
          <FiveCheckbox>
            <input
              type="checkbox"
              name="afterEffect"
              value="두통/관절통/근육통"
              id="두통관절통근육통"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="두통관절통근육통">두통/관절통/근육통</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="피로감"
              id="피로감"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="피로감">피로감</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="알러지 반응"
              id="알러지반응"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="알러지반응">알러지 반응</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="기타"
              id="기타"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="기타">기타</label>
            <input
              type="checkbox"
              name="afterEffect"
              value="무증상"
              id="무증상"
              onClick={handleCheckboxClick}
              disabled={!isVaccine && "disabled"}
            />
            <label htmlFor="무증상">무증상</label>
          </FiveCheckbox>
          {/* <div></div> */}
        </SurveyItem>

        <SubmitButton
          type="submit"
          onClick={submitSurvey}
          disabled={ableSubmitButton()}
        >
          회원가입
        </SubmitButton>
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
  grid-template-columns: 20px 100px 20px 100px 20px 160px;
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

const SubmitButton = styled.button`
  margin: 35px 0 0 0;
  width: ${theme.mediumButtonWidth};
  height: ${theme.mediumButtonHeight};
  background-color: ${theme.typoBlack};
  border: none;
  color: white;
  transition: background-color 0.3s;
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

export default Survey;
