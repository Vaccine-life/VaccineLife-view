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

const Medical = () => {
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  // Medical 페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);

  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  React.useEffect(() => {
    dispatch(actionGetMedical());
  }, []);

  return (
    <React.Fragment>
      <MetaScript title="슬기로운 백신생활 | 의료진" />
      <Grid width={theme.medicalWidth} margin={`160px auto 100px auto`}>
        <Grid align="left">
          <Text
            bold
            size={theme.headOneSize}
            lineHeight={theme.headOneHeight}
            color={theme.fontColor}
          >
            의료진분들께
          </Text>
          <div
            style={{ borderBottom: "1px solid", margin: "2rem 0 0 0" }}
          ></div>
        </Grid>

        <CommentWrite />
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
