import React from "react";
import moment from "moment";
import { Grid } from "../elements";

const Header = () => {
  return (
    <Grid>
      Header 다은짱 효유니도짱 {moment(new Date()).format("YYYY-MM-DD")}
    </Grid>
  );
};

export default Header;
