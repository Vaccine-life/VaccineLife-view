import React from "react";
import { isMobileOnly } from "react-device-detect";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { actionConfirm } from "../../redux/modules/popup";
import { actionModifyNickname } from "../../redux/modules/modal";
import theme from "../../styles/theme";

// 사용시 props에 해당하는 것들을 넣어줄것

const ModifyNickname = (props) => {
  const { confirmMessage, activeFunction } = props;
  const dispatch = useDispatch();

  const handleModify = () => {
    activeFunction();
    dispatch(actionConfirm());
  };
  if (isMobileOnly) {
    return (
      <MobileWrapper>
        <Text margin="100px auto 100px auto" size={theme.headOneSize} bold>
          닉네임 변경
        </Text>

        <MobileInput placeholder="새로운 닉네임을 입력해주세요" />

        <Grid is_flex="space_column">
          <Button
            margin="100px 0 15px 0"
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
              dispatch(actionModifyNickname());
            }}
          >
            취소
          </Button>
        </Grid>
      </MobileWrapper>
    );
  }
  return (
    <Wrapper>
      <Modal>
        <Text size={theme.headOneSize} bold>
          닉네임 변경
        </Text>
        <Grid is_flex="center">
          <Input placeholder="새로운 닉네임을 입력해주세요" />
        </Grid>
        <Grid is_flex="center">
          <Button
            margin="30px 15px 0 0"
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.SubHeadOneSize}
            lineHeight={theme.SubHeadOneHeight}
            bg={theme.typoLightGrey2}
            _onClick={() => dispatch(actionModifyNickname())}
          >
            취소
          </Button>
          <Button
            margin="30px 0 0 0"
            width={theme.smallButtonWidth}
            height={theme.smallButtonHeight}
            fontSize={theme.bodyOneSize}
            bg={theme.bg2}
            _onClick={handleModify}
          >
            변경
          </Button>
        </Grid>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const Input = styled.input`
  width: 300px;
  margin: 80px auto 80px auto;
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

// <========= Mobile ==========>

const MobileWrapper = styled.div`
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

const MobileInput = styled.input`
  width: 80%;
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
