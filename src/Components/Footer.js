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
          margin="1rem 5rem"
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

        <Grid margin="2rem 0" width="0 auto" height="auto">
          <ul style={{ display: "flex" }}>
            <Text
              color="#ffffff"
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              // _onClick={() => {
              //   window.location.replace("/vaccine");
              // }}
              _onClick={() => {
                history.push("/vaccine");
              }}
            >
              백신후기
            </Text>
            <Text
              color="#ffffff"
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              // _onClick={() => {
              //   window.location.replace("/vaccine");
              // }}
              _onClick={() => {
                history.push("/quarantine");
              }}
            >
              격리후기
            </Text>
            <Text
              color="#ffffff"
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              // _onClick={() => {
              //   window.location.replace("/medical");
              // }}
              _onClick={() => {
                history.push("/medical");
              }}
            >
              의료진분들께 한마디
            </Text>
          </ul>

          <ul style={{ display: "flex" }}>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
            >
              대표자명
            </Text>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
            >
              |
            </Text>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
            >
              Contact. quokkalee654@gmail.com
            </Text>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
            >
              |
            </Text>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              _onClick={() => window.open("https://github.com/Vaccine-life")}
            >
              Github. https://github.com/Vaccine-life
            </Text>
          </ul>
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
`;

export default Footer;
