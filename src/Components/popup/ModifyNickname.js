import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAxios } from "../../shared/api";
import logger from "../../shared/logger";
import * as Yup from "yup";
import { useFormik } from "formik";
import { actionModifyNicknameVisible } from "../../redux/modules/modal";
import { actionNicknameUpdate } from "../../redux/modules/user";

import { Button, Grid, Text } from "../../elements";

import theme from "../../styles/theme";
import styled from "styled-components";
import { isMobileOnly } from "react-device-detect";

// 마이페이지에서 닉네임 수정을 클릭했을 때 뜨는 모달창
const ModifyNickname = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [nicknameDupOk, setNicknameDupOk] = useState(false);
  const [nicknameDupMsg, setNicknameDupMsg] = useState("");

  // onChange될 때 마다 nicknameDupCheck를 통해 닉네임 중복확인
  const nicknameDupCheck = (nickname) => async () => {
    try {
      const nicknameDupRes = await userAxios.nicknameDupCheck(nickname);
      setNicknameDupOk(nicknameDupRes.data.ok);
      setNicknameDupMsg(nicknameDupRes.data.msg);
    } catch (error) {
      logger(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nickname: "",
    },

    validationSchema: Yup.object({
      nickname: Yup.string()
        .required("닉네임을 입력해주세요")
        .max(6, "닉네임은 6자리 이하여야 합니다"),
    }),

    // api명세서에 따르면 수정될 닉네임 뿐만 아니라 다른 유저정보도 보내줘야 해서, updatedUser에 갈무리해서 보내줌
    onSubmit: (values) => {
      const updatedUser = {
        id: user.userId,
        username: user.username,
        nickname: values.nickname,
        isVaccine: user.isVaccine,
        type: user.type,
        degree: user.degree,
        gender: user.gender,
        age: user.age,
        disease: user.disease,
        afterEffect: user.afterEffect.split(", "),
      };
      dispatch(actionNicknameUpdate(updatedUser));
    },
  });

  if (isMobileOnly) {
    return (
      <MobileWrapper onSubmit={formik.handleSubmit}>
        <Text margin="100px auto 50px auto" size={theme.headOneSize} bold>
          닉네임 변경
        </Text>

        <MobileInputBox>
          <MobileInput
            placeholder="새로운 닉네임을 입력해주세요"
            id="nickname"
            name="nickname"
            type="text"
            value={formik.values.nickname}
            onChange={(e) => {
              formik.handleChange(e);
              dispatch(nicknameDupCheck(e.target.value));
            }}
          />
          {formik.touched.nickname && formik.errors.nickname ? (
            <Error>{formik.errors.nickname}</Error>
          ) : null}
          {!nicknameDupOk ? <Error>{nicknameDupMsg}</Error> : null}
        </MobileInputBox>

        <Grid is_flex="space_column">
          <Button
            margin="70px 0 15px 0"
            width={theme.mediumButtonWidth}
            height={theme.mediumButtonHeight}
            type="submit"
            bg={theme.btnColor}
            fontSize={theme.bodyTwoSize}
          >
            변경
          </Button>

          <Button
            margin="0 0 auto 0"
            width={theme.mediumButtonWidth}
            height={theme.mediumButtonHeight}
            type="submit"
            bg={theme.typoBlack}
            fontSize={theme.bodyTwoSize}
            _onClick={() => {
              dispatch(actionModifyNicknameVisible());
            }}
          >
            취소
          </Button>
        </Grid>
      </MobileWrapper>
    );
  }

  return (
    <>
      <Wrapper onSubmit={formik.handleSubmit}>
        <Modal>
          <Text size={theme.headOneSize} bold>
            닉네임 변경
          </Text>
          <InputBox>
            <Input
              placeholder="새로운 닉네임을 입력해주세요"
              id="nickname"
              name="nickname"
              type="text"
              value={formik.values.nickname}
              onChange={(e) => {
                formik.handleChange(e);

                dispatch(nicknameDupCheck(e.target.value));
              }}
            />
            {formik.touched.nickname && formik.errors.nickname ? (
              <Error>{formik.errors.nickname}</Error>
            ) : null}
            {!nicknameDupOk ? <Error>{nicknameDupMsg}</Error> : null}
          </InputBox>
          <Grid is_flex="center">
            <Button
              margin="30px 15px 0 0"
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.SubHeadOneSize}
              lineHeight={theme.SubHeadOneHeight}
              bg={theme.typoLightGrey2}
              _onClick={() => dispatch(actionModifyNicknameVisible())}
            >
              취소
            </Button>
            <Button
              type="submit"
              margin="30px 0 0 0"
              width={theme.smallButtonWidth}
              height={theme.smallButtonHeight}
              fontSize={theme.bodyOneSize}
              bg={theme.bg2}
            >
              변경
            </Button>
          </Grid>
        </Modal>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

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
  padding: 60px 40px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 80px 0 60px 0;
`;

const Input = styled.input`
  width: 300px;
  margin: 0 auto 8px auto;
  border: none;
  border-bottom: 1px solid ${theme.typoGrey1};
  padding: 6px 0px;
  color: ${theme.typoBlack};
  font-size: ${theme.bodyTwoSize};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.typoBlack};
    color: ${theme.typoBlack};
  }
`;

const Error = styled.div`
  width: 100%;
  text-align: right;
  font-size: ${theme.bodyfourSize};
  color: ${theme.errorColor};
`;

// <========= Mobile ==========>

const MobileWrapper = styled.form`
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

const MobileInputBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 80px 0 60px 0;
`;

const MobileInput = styled.input`
  width: 100%;
  height: 30px;
  margin: 0 auto;
  border: none;
  border-bottom: 1px solid ${theme.typoGrey1};
  padding: 6px 0px;
  color: ${theme.typoBlack};
  font-size: ${theme.bodyTwoSize};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.typoBlack};
    color: ${theme.typoBlack};
  }
`;

export default ModifyNickname;
