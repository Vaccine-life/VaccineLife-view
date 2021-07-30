import React from "react";
import styled from "styled-components";
import { Text, Input, Button } from "../elements/index";

const Survey = (props) => {
  console.log("Survey", props.history);
  return (
    <>
      <Wrapper>
        <Modal>
          <Text size="14px">회원가입이 곧 마무리됩니다</Text>
          <Text margin="2vh 0 6vh 0" size="20px" bold>
            여러분의 백신 접종 경험을 공유해주세요
          </Text>

          <SurveyItem>
            <Text bold>백신 접종 여부</Text>
            <Options>
              <input type="radio" name="isVaccine" value="true" />
              접종함
              <input type="radio" name="isVaccine" value="false" />
              접종하지않음
            </Options>
            <div></div>
          </SurveyItem>

          <SurveyItem>
            <Text bold>접종 회차</Text>
            <Options>
              <input type="radio" name="degree" value="first" />
              1회차
              <input type="radio" name="degree" value="second" />
              2회차
            </Options>
            <div></div>
          </SurveyItem>

          <SurveyItem>
            <Text bold>백신 종류</Text>
            <Options>
              <input type="radio" name="type" value="Moderna" />
              모더나
              <input type="radio" name="type" value="Janssen" />
              얀센
              <input type="radio" name="type" value="AZ" />
              아스트라제네카
            </Options>
            <div></div>
            <Options>
              <input type="radio" name="type" value="Pfizer" />
              화이자
              <input type="radio" name="type" value="AZ+Pfizer" />
              아스트라제네카 + 화이자
            </Options>
            <div></div>
          </SurveyItem>

          <SurveyItem>
            <Text bold>성별</Text>
            <Options>
              <input type="radio" name="gender" value="male" />
              남
              <input type="radio" name="gender" value="female" />여
            </Options>
            <div></div>
          </SurveyItem>

          <SurveyItem>
            <Text bold>연령대</Text>
            <Options>
              <input type="radio" name="age" value="10" />
              10대
              <input type="radio" name="age" value="20" />
              20대
              <input type="radio" name="age" value="30" />
              30대
              <input type="radio" name="age" value="40" />
              40대
              <input type="radio" name="age" value="50" />
              50대
            </Options>
            <div></div>
            <Options>
              <input type="radio" name="age" value="60" />
              60대
              <input type="radio" name="age" value="70" />
              70대
              <input type="radio" name="age" value="80" />
              80대 이상
            </Options>
            <div></div>
          </SurveyItem>

          <SurveyItem>
            <Text bold>기저 질환</Text>
            <Options>
              <input type="radio" name="disease" value="true" />
              유
              <input type="radio" name="disease" value="false" />무
              <input type="radio" name="disease" value="notSure" />
              모름
            </Options>
            <div></div>
          </SurveyItem>

          <SurveyItem>
            <Text bold>후유증</Text>
            <Options>
              <input type="checkbox" name="afterEffect" value="fever" />
              발열
              <input type="checkbox" name="afterEffect" value="partialAche" />
              접종부위 통증
              <input type="checkbox" name="afterEffect" value="swelling" />
              접종부위 부기/발적
              <input type="checkbox" name="afterEffect" value="vomit" />
              구토/매스꺼움
            </Options>
            <div></div>
            <Options>
              <input type="checkbox" name="afterEffect" value="ache" />
              두통/관절통/근육통
              <input type="checkbox" name="afterEffect" value="fatigue" />
              피로감
              <input type="checkbox" name="afterEffect" value="alergy" />
              알러지 반응
              <input type="checkbox" name="afterEffect" value="etc" />
              기타
              <input type="checkbox" name="afterEffect" value="noSymptom" />
              무증상
            </Options>
            <div></div>
          </SurveyItem>
        </Modal>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(196, 196, 196, 0.7);
`;

const Modal = styled.div`
  width: 40vw;
  height: 70vh;
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
  padding: 0 5vw;
`;

const SurveyItem = styled.div`
  width: 100%;
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
