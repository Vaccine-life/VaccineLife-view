import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Grid, Text } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionNavVisible } from "../../redux/modules/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Accordion from '@material-ui/core/Accordion';


const NavModal = (props) => {
    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    const nickname = useSelector((state) => state.user.user.nickname);
    const modal_status = useSelector((state) => state.modal.visible);

    // 모달 바깥 부분 클릭시 모달 off
    const handleModalOff = (e) => {
        const clicked = e.target.closest(".modal");
        // console.log(clicked);
        if (clicked) {
            return;
        } else {
            dispatch(actionNavVisible());
        }
    };

    if (is_login) {
        return (
            <>
                <Wrapper
                    onClick={(e) => {
                        handleModalOff(e);
                    }}
                >
                    <Modal className="modal">
                        <Xbutton
                            onClick={() => {
                                dispatch(actionNavVisible());
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} color={theme.bg2} size="lg" />
                        </Xbutton>

                        <Grid align="left">
                            <Text color={theme.typoBlack} size={theme.bodyThreeSize}>
                                <span style={{ color: `{theme.SuccessGreen}` }}>{nickname}</span>님, 환영합니다</Text>
                            <div style={{ borderBottom: "1px solid #F7F7F7", margin: "2rem 0" }} />
                            <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">백신 접종 후기</Text>
                            <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">자가 격리 후기</Text>
                            <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">의료진분들께</Text>
                            <div style={{ borderBottom: "1px solid #F7F7F7", margin: "2rem 0" }} />
                            <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">로그아웃</Text>
                        </Grid>
                    </Modal>
                </Wrapper>
            </>
        )
    }
    return (
        <>
            <Wrapper
                onClick={(e) => {
                    handleModalOff(e);
                }}
            >
                <Modal className="modal">
                    <Xbutton
                        onClick={() => {
                            dispatch(actionNavVisible());
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} color={theme.bg2} size="lg" margin="2rem 0" />
                    </Xbutton>

                    <Grid align="left">
                        <Text color={theme.typoBlack} size={theme.bodyThreeSize}>로그인</Text>
                        <div style={{ borderBottom: "1px solid #F7F7F7", margin: "2rem 0" }} />
                        <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">백신 접종 후기</Text>
                        <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">자가 격리 후기</Text>
                        <Text color={theme.typoBlack} size={theme.bodyThreeSize} margin="2rem 0">의료진분들께</Text>
                    </Grid>

                </Modal>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin-left: auto;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  width: 50%;
  height: 90%;
  position: relative;
  top: 50%;
  right: 50%;
  left: 30%;
  bottom: 50%;
  transform: translateY(-50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: right;
  margin-right: 0;
  padding: 40px;
`;

const Xbutton = styled.div`
  margin: 1rem 0 1rem auto;
  &:hover {
    cursor: pointer;
  }
`;

export default NavModal;