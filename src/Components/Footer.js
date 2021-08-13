import React from "react";
import styled from "styled-components";

import { Grid, Image, Text } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import logo from "../assets/슬기로운-white.png";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

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
          {/* <Img> */}
            <Image
              shape="rectangle"
              width={theme.logoWidth}
              height={theme.logoHeight}
              cursor="pointer"
              src={logo}
            />
          {/* </Img> */}
        </Grid>

        <Grid margin="2rem 0" width="0 auto" height="auto">
          <Common>
            <Text
              color="#ffffff"
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
              color="#ffffff"
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
              color="#ffffff"
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              _onClick={() => {
                history.push("/medical");
              }}
            >
              의료진분들께 한마디
            </Text>
          </Common>

          <Common>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
            >
              대표자명
            </Text>

            <Stick>
              <Text
                color={theme.typoGrey2}
                size={theme.SubHeadTwoSize}
                margin="5px"
              >
                |
              </Text>
            </Stick>

            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
            >
              Contact. quokkalee654@gmail.com
            </Text>

            <Stick>
              <Text
                color={theme.typoGrey2}
                size={theme.SubHeadTwoSize}
                margin="5px"
              >
                |
              </Text>
            </Stick>
            <Text
              color={theme.typoGrey2}
              size={theme.SubHeadTwoSize}
              margin="5px"
              hover
              _onClick={() => window.open("https://github.com/Vaccine-life")}
            >
              Github. https://github.com/Vaccine-life
            </Text>
          </Common>
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
  }
`;

const Common = styled.ul`
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
    text-align: left;
    white-space: nowrap;
  }
`
const Stick = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`;

const Img = styled.div`
  @media (max-width: 960px) {
    float: left;
  }
`;

export default Footer;
