import React from "react";
import styled from "styled-components";

import { Grid, Image, Text } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import logo from "../assets/슬기로운-white.png";
import { isMobileOnly } from "react-device-detect";

const Footer = () => {
  if (isMobileOnly) {
    return (
      <>
        <MobileWrapper>
          <Grid
            width="auto"
            margin="1rem 5rem 0 5rem"
            is_flex="center"
            _onClick={() => {
              history.push("/");
            }}
          >
            <Image
              shape="rectangle"
              width={theme.logoWidth}
              height={theme.logoHeight}
              cursor="pointer"
              src={logo}
            />
          </Grid>

          <Grid margin="2rem 0" width="auto" height="auto">
            <MobileTitleNav>
              <Text
                bold
                color={theme.white}
                size={theme.SubHeadTwoSize}
                margin="5px"
                hover
                _onClick={() => {
                  history.push("/vaccine");
                }}
              >
                백신후기
              </Text>
              <Text
                bold
                color={theme.white}
                size={theme.SubHeadTwoSize}
                margin="5px"
                hover
                _onClick={() => {
                  history.push("/quarantine");
                }}
              >
                격리후기
              </Text>
              <Text
                bold
                color={theme.white}
                size={theme.SubHeadTwoSize}
                margin="5px"
                hover
                _onClick={() => {
                  history.push("/medical");
                }}
              >
                의료진분들께
              </Text>
            </MobileTitleNav>

            <MobileTeamInfo>
              <Text
                color={theme.typoGrey2}
                size={theme.bodyThreeSize}
                margin="5px"
              >
                Team. 슬기로운 백신생활
              </Text>

              <MobileStick>
                <Text
                  color={theme.typoGrey2}
                  size={theme.bodyThreeSize}
                  margin="5px"
                >
                  |
                </Text>
              </MobileStick>

              <Text
                color={theme.typoGrey2}
                size={theme.bodyThreeSize}
                margin="5px"
              >
                Contact. quokkalee654@gmail.com
              </Text>

              <MobileStick>
                <Text
                  color={theme.typoGrey2}
                  size={theme.bodyThreeSize}
                  margin="5px"
                >
                  |
                </Text>
              </MobileStick>
              <Text
                color={theme.typoGrey2}
                size={theme.bodyThreeSize}
                margin="5px"
                hover
                _onClick={() => window.open("https://github.com/Vaccine-life")}
              >
                Github. https://github.com/Vaccine-life
              </Text>
            </MobileTeamInfo>
            <div style={{ margin: "20px 5px 10px 5px" }}>
              <Text
                color={theme.typoGrey2}
                size={theme.bodyFourSize}
                margin="5px"
              >
                * 부트캠프를 통한 팀으로 진행된 프로젝트입니다.
              </Text>
              <Text
                color={theme.typoGrey2}
                size={theme.bodyFourSize}
                margin="5px"
              >
                * 인크루팅 제안은 상기 메일로 연락 부탁드립니다.
              </Text>
            </div>
          </Grid>
        </MobileWrapper>
      </>
    );
  }
  return (
    <React.Fragment>
      <FixedFooter>
        <Grid
          width="auto"
          margin="0 5rem"
          is_flex="center"
          _onClick={() => {
            history.push("/");
          }}
        >
          <Image
            shape="rectangle"
            width={theme.logoWidth}
            height={theme.logoHeight}
            cursor="pointer"
            src={logo}
          />
        </Grid>

        <Grid margin="2rem 0" width="auto" height="auto">
          <TitleNav>
            <Text
              bold
              color={theme.white}
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              _onClick={() => {
                history.push("/vaccine");
              }}
            >
              백신후기
            </Text>
            <Text
              bold
              color={theme.white}
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              _onClick={() => {
                history.push("/quarantine");
              }}
            >
              격리후기
            </Text>
            <Text
              bold
              color={theme.white}
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              _onClick={() => {
                history.push("/medical");
              }}
            >
              의료진분들께
            </Text>
          </TitleNav>

          <TeamInfo>
            <Text
              color={theme.typoGrey2}
              size={theme.bodyThreeSize}
              margin="5px"
            >
              Team. 슬기로운 백신생활
            </Text>

            <Stick>
              <Text
                color={theme.typoGrey2}
                size={theme.bodyThreeSize}
                margin="5px"
              >
                |
              </Text>
            </Stick>

            <Text
              color={theme.typoGrey2}
              size={theme.bodyThreeSize}
              margin="5px"
            >
              Contact. quokkalee654@gmail.com
            </Text>

            <Stick>
              <Text
                color={theme.typoGrey2}
                size={theme.bodyThreeSize}
                margin="5px"
              >
                |
              </Text>
            </Stick>
            <Text
              color={theme.typoGrey2}
              size={theme.bodyThreeSize}
              margin="5px"
              hover
              _onClick={() => window.open("https://github.com/Vaccine-life")}
            >
              Github. https://github.com/Vaccine-life
            </Text>
          </TeamInfo>
          <Text color={theme.typoGrey2} size={theme.bodyThreeSize} margin="5px">
            * 부트캠프를 통한 팀으로 진행된 프로젝트입니다. 인크루팅 제안은 상기
            메일로 연락 부탁드립니다.
          </Text>
        </Grid>
      </FixedFooter>
    </React.Fragment>
  );
};

const FixedFooter = styled.div`
  margin-top: auto;
  background-color: ${theme.typoBlack};
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 1.2rem 0;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 3rem 0 1rem 0;
  }
`;

const TitleNav = styled.div`
  display: flex;
  @media (max-width: 960px) {
    flex-direction: row;
    text-align: center;
    white-space: nowrap;
    padding: 0 0 1.8rem 0;
    justify-content: space-evenly;
  }
`;

const TeamInfo = styled.ul`
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;
    white-space: nowrap;
  }
`;

const Stick = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`;

// <========= Mobile ==========>
const MobileWrapper = styled.div`
  margin-top: auto;
  width: 100%;
  background-color: ${theme.typoBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0;
`;

const MobileTitleNav = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  white-space: nowrap;
  padding: 0 0 1.8rem 0;
  justify-content: space-evenly;
`;

const MobileTeamInfo = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: center;
  white-space: nowrap;
`;

const MobileStick = styled.div`
  display: none;
`;

export default Footer;
