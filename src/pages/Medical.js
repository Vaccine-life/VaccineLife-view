import React from "react";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";

import { Text, Grid } from "../elements";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import Login from "./Login";
import { actionGetMedical } from "../redux/modules/comment";
import Alert from "../components/popup/Alert";
import MetaScript from "../shared/MetaScript";
import { isMobileOnly } from "react-device-detect";
import NavModal from "../components/mobile/NavModal";
import PopularComment from "../components/PopularComment";
import { actionSetLikeMedi, actionGetLikeMedi } from "../redux/modules/like";


const Medical = () => {
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  // Medical 페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);

  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // if (!is_login) {
    //   return;
    // }
    // 로그인이 안된다고 나옴. 로그인 한 상태인데???
    dispatch(actionGetMedical());
    // dispatch(actionSetLikeMedi());
    // dispatch(actionGetLikeMedi());
  }, []);

  if(isMobileOnly) {
    return (
      <>
        <MetaScript title="슬기로운 백신생활 | 의료진" />
        <Grid is_flex="center" height="60px" bg={theme.bg2}>
          <Text
            color={theme.white}
            size={theme.SubHeadOneSize}
            lineHeight={theme.headOneHeight}
            bold
          >의료진 분들께
          </Text>
        </Grid>

        <Grid margin={`30px auto 0 auto`}>
          <CommentWrite />
          {comment_list.map((c, idx) => {
            return <CommentList key={idx} {...c} />;
          })}
        </Grid>

        {modal_status && <NavModal/>}
        {alert_status && <Alert />}
      </>
    )
  }

  return (
    <React.Fragment>
      <MetaScript title="슬기로운 백신생활 | 의료진" />
      <Grid width={theme.medicalWidth} margin={`160px auto 100px auto`}>
        <Grid align="left">
          <Text
            bold
            size={theme.headOneSize}
            lineHeight={theme.headOneHeight}
            color={theme.typoBlack}
          >
            의료진분들께
          </Text>
        </Grid>

        <CommentWrite />
        {/* <PopularComment /> */}
        {comment_list.map((c, idx) => {
          return <CommentList key={idx} {...c} />;
        })}
      </Grid>
      {modal_status && <Login />}
      {alert_status && <Alert />}
    </React.Fragment>
  );
};

export default Medical;
