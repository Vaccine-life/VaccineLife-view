import React from "react";
import { Grid, Text } from "../../elements";
import Accordion from '@material-ui/core/Accordion';

const NavBar = (props) => {
    return(
        <>
        <Accordion expanded={true}>
            <Text>X</Text>
            <Text>로그인</Text>
            <Text>line</Text>
            <Text>백신 접종 후기</Text>
            <Text>자가 격리 후기</Text>
            <Text>의료진분들께</Text>
        </Accordion>
        </>
    )
}

export default NavBar;