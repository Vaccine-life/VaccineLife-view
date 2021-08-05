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

        <div style={{backgroundColor:"#242424", display:"flex", alignItems:"center"}}>
          {/* <Grid margin="2rem 2rem 2rem 5rem" width="auto" _onClick={() => {console.log("홈으로 가기!")}}>
            <Text color="#ffffff" cursor="pointer" margin="1px 0">슬기로운</Text>
            <Text color="#ffffff" cursor="pointer" size="16" bold>백신생활</Text>
          </Grid> */}
          <Grid width="auto" margin="1rem 5rem"
            is_flex="center"
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

          <Grid margin="2rem 0" width="0 auto">
            <ul style={{ display: "flex" }}>
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
              <Text color={theme.typoGrey2} size={theme.SubHeadTwoSize} margin="5px">
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
