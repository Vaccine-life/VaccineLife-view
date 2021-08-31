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
import MyPage from "../pages/MyPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "./cookie";
import { actionGetUseInfo, actionLogoutCookie } from "../redux/modules/user";
import { actionGetLike, actionGetLikeMedi } from "../redux/modules/like";
import { actionGetClickList } from "../redux/modules/read";
import MetaScript from "./MetaScript";
import logger from "./logger";

function App() {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  //토큰 만료시간
  const exp_time = useSelector((state) => state.user.expTime);
  //토큰 남은시간
  let remainTime = new Date(exp_time) - new Date();

  //만료시간이 0일때 자동으로 로그아웃 방지 및 남은 시간 후에 자동로그아웃 코드
  if (exp_time !== 0) {
    setTimeout(() => {
      dispatch(actionLogoutCookie());
    }, remainTime);
  }

  useEffect(() => {
    //Redux 정보 지워졌을때 토큰을 기반으로 로그인 정보 재구축
    if (!is_login && getCookie("vaccine_life_token")) {
      dispatch(actionGetUseInfo());
    }
    //클릭한 리스트를 로컬스토리지에서 받아오기
    dispatch(actionGetClickList());
    //좋아요 받아오기
    dispatch(actionGetLike("vaccine"));
    dispatch(actionGetLike("quarantine"));
    dispatch(actionGetLikeMedi());
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
        {is_login && <Route exact path="/mypage" component={MyPage} />}
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
`;

export default App;
