import React from "react";

import styled from "styled-components";

import { Grid, Image, Text } from "../elements";
import theme from "../styles/theme";

const Footer = () => {
  return (
    <React.Fragment>
      <FixedFooter>
        <Grid bg={theme.bg} is_flex="space_column" align="left">
          <Grid>
            {/* 로고 */}
            <Grid padding="10px 30px" width="auto">
              <Image
                shape="rectangle"
                width="5rem"
                height="3rem"
                src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMjNfMjcw/MDAxNTE2NzEzOTE4OTgw.IduRnAf7H8eKuWuX-YJZuwhfoxq960sjOXByi7A3GiIg.hasRU00Lkjwqjr7XbeYTb9hnANSppWgejCMCH8M7aFIg.JPEG.timeless_soul/KakaoTalk_Moim_77yVkO7j8BC3E8PV7DJ9iSRRVOH4Y2.jpg?type=w800"
              />
            </Grid>

            <Grid is_flex="space_row">
              <Grid padding="10px 30px">
                <Grid padding="5px 0">
                  <Text>백신후기</Text>
                </Grid>

                <Grid padding="5px 0">
                  <Text>자가격리 후기</Text>
                </Grid>

                <Grid padding="5px 0">
                  <Text>의료진분들께</Text>
                </Grid>
              </Grid>

              <Grid padding="10px 30px">
                <Grid padding="5px 0">
                  <Text>대표자명 팀18</Text>
                </Grid>

                <Grid padding="5px 0">
                  <Text>Contact playder1427@gmail.com</Text>
                </Grid>

                <Grid padding="5px 0">
                  <Text>Github https://github.com/Vaccine-life</Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FixedFooter>
    </React.Fragment>
  );
};

const FixedFooter = styled.div`
  margin-top: auto;
  width: 100%;
`;

export default Footer;
