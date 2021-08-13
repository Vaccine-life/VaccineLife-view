import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Medical from "../pages/Medical";
import Vaccine from "../pages/Vaccine";
import Write from "../pages/Write";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import QuarantineDetail from "../pages/QuarantineDetail";
import Detail from "../pages/Detail";
import styled from "styled-components";
import Modify from "../pages/Modify";
import Quarantine from "../pages/Quarantine";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "./cookie";
import { actionGetUseInfo, actionLogoutCookie } from "../redux/modules/user";
import { actionGetLike } from "../redux/modules/like";
import { actionGetClickList } from "../redux/modules/read";
import MetaScript from "./MetaScript";
import logger from "./logger";

function App() {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const exp_time = useSelector((state) => state.user.expTime);
  let remainTime = new Date(exp_time) - new Date();
  logger(remainTime);

  if (exp_time !== 0) {
    setTimeout(() => {
      dispatch(actionLogoutCookie());
    }, remainTime);
  }
  useEffect(() => {
    if (!is_login && getCookie("vaccine_life_token")) {
      dispatch(actionGetUseInfo());
    }
    dispatch(actionGetClickList());
    dispatch(actionGetLike("vaccine"));
    dispatch(actionGetLike("quarantine"));
  }, []);

  return (
    <Wrapper className="App">
      <MetaScript title="슬기로운 백신생활" />
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/vaccine" component={Vaccine} />
        <Route exact path="/detail/:id" component={Detail} />
        {is_login && (
          <Route exact path="/vaccineboard/write" component={Write} />
        )}
        {is_login && <Route exact path="/modify/:id" component={Modify} />}
        <Route exact path="/quarantine" component={Quarantine} />
        <Route
          exact
          path="/quarantinedetail/:id"
          component={QuarantineDetail}
        />
        {is_login && (
          <Route exact path="/quarantineboard/write" component={Write} />
        )}
        {is_login && (
          <Route exact path="/quarantinemodify/:id" component={Modify} />
        )}
        <Route exact path="/medical" component={Medical} />
        <Redirect from="*" to="/" />
      </Switch>
      <Banner />
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default App;
