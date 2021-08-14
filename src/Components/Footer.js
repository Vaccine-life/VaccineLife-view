import React from "react";
import styled from "styled-components";

import { Grid, Image, Text } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import logo from "../assets/슬기로운-white.png";


const Footer = () => {
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

        <Grid width="auto" height="auto">
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
              Team. 백신후기관리위원회
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
    padding: 4rem 0;
  }
`;

const TitleNav = styled.div`
  display: flex;
  padding: 1.8rem 0;
  justify-content: space-evenly;
  @media (max-width: 960px) {
    flex-direction: row;
    text-align: center;
    white-space: nowrap;
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

export default Footer;
