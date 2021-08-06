import React from "react";
import styled from "styled-components";

import { Grid, Image, Text } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configStore";

import logo from "../assets/logowhite.png";

const Footer = () => {
  return (
    <React.Fragment>
      {/* <FixedFooter> */}

        <div style={{backgroundColor:"#242424", display:"flex", alignItems:"center", height:"152px"}}>
          <Grid 
            width="auto" 
            margin="1rem 5rem"
            is_flex="center"
            // _onClick={() => {
            //   window.location.replace("/");
            // }}
            _onClick={() => {
              history.push("/");
            }}
            >
            <Image
              shape="rectangle"
              width="95px"
              height="51px"
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
              <Text color={theme.typoGrey2} size={theme.SubHeadTwoSize} margin="5px">
                대표자명
              </Text>
              <Text color={theme.typoGrey2} size={theme.SubHeadTwoSize} margin="5px">
                |
              </Text>
              <Text color={theme.typoGrey2} size={theme.SubHeadTwoSize} margin="5px">
                Contact. playder1427@gmail.com
              </Text>
              <Text color={theme.typoGrey2} size={theme.SubHeadTwoSize} margin="5px">
                |
              </Text>
              <Text color={theme.typoGrey2} size={theme.SubHeadTwoSize} margin="5px" hover _onClick={() => window.open("https://github.com/Vaccine-life")}>
                Github. https://github.com/Vaccine-life
              </Text>
            </ul>
          </Grid>
        </div>
      {/* </FixedFooter> */}
    </React.Fragment>
  );
};

const FixedFooter = styled.div`
  margin-top: auto;
  width: 100%;
  /* position: fixed; */
  /* z-index: 1; */
`;

export default Footer;
