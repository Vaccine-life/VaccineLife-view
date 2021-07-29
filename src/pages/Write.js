import React from "react";
import logger from "../shared/logger";
import { history } from "../redux/configStore";
import styled from "styled-components";
import Grid from "../elements/Grid";

const Write = () => {
  const url = history.location.pathname;
  // /vboard/write일때 true /qboard/write 일떄 false
  const urlExchanger = url === "/vboard/write" ? true : false;

  logger(urlExchanger);
  return <Grid>write</Grid>;
};

export default Write;
