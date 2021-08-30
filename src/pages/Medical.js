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
import InfinityScroll from "../shared/InfinityScroll";
import BottomSpinner from "../shared/BottomSpinner";

const Medical = (props) => {
  const dispatch = useDispatch();

  const alert_status = useSelector((state) => state.popup.alert);
  // Medical 페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  // 모바일에서 모달찰 뜨게 함
  const navModal_status = useSelector((state) => state.modal.navVisible);
  // comment모듈에서 list가져와서 map돌리기
  const comment_list = useSelector((state) => state.comment.list);
  // console.log(comment_list);

  // 무한스크롤 ==========>
  const is_loading = useSelector((state) => state.isLoading.isLoading);
  // 객체 destructuring
  const pagingMedi = useSelector((state) => state.comment.pagingMedi);
  // console.log(pagingMedi);
  // 프로퍼티 키를 기준으로 디스트럭처링 할당(순서 상관 없음)
  // 변수 nextPage, totalPage가 선언되고, pagingMedi가 파괴되어 할당됨.
  const { nextPage, totalPage } = pagingMedi;
  // 무한스크롤 nextCall로 서버에 저장된 medical가져오기(10개씩)
  const nextCall = () => {
    dispatch(actionGetMedical());
  };
  // <==========

  // 첫 렌더시 서버에 저장된 medical불러오기
  React.useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(actionGetMedical());
  }, []);

  if (isMobileOnly) {
    return (
      <>
        <MetaScript title="슬기로운 백신생활 | 의료진" />
        <Grid
          is_flex="center"
          height="60px"
          bg={theme.bg2}
          margin={`${theme.headerHeight} auto 0 auto`}
        >
          <Text
            color={theme.white}
            size={theme.SubHeadOneSize}
            lineHeight={theme.headOneHeight}
            bold
          >
            의료진 분들께
          </Text>
        </Grid>

        <Grid margin={`20px auto 0 auto`}>
          <CommentWrite />
          <PopularComment />
          <Grid align="left" padding="2rem 0 0 1rem">
            <Text
              size={theme.SubHeadTwoSize}
              lineHeight={theme.SubHeadTwoHeight}
              bold
            >
              전체응원글
            </Text>
          </Grid>
          <InfinityScroll
            nextCall={nextCall}
            is_next={nextPage <= totalPage ? true : false}
            is_loading={is_loading}
            size={600}
          >
            {comment_list.map((c, idx) => {
              return <CommentList key={idx} {...c} />;
            })}
          </InfinityScroll>
        </Grid>

        {navModal_status && <NavModal />}
        {alert_status && <Alert />}
        {modal_status && <Login />}
        {is_loading && <BottomSpinner />}
      </>
    );
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
        <PopularComment />
        <Grid align="left" margin="3.5rem auto 0 0">
          <Text size={theme.headTwoSize} lineHeight={theme.headTwoHeight} bold>
            전체응원글
          </Text>
        </Grid>
        <InfinityScroll
          nextCall={nextCall}
          is_next={nextPage <= totalPage ? true : false}
          is_loading={is_loading}
          size={300}
        >
          {comment_list.map((c, idx) => {
            return <CommentList key={idx} {...c} />;
          })}
        </InfinityScroll>
      </Grid>
      {modal_status && <Login />}
      {alert_status && <Alert />}
      {is_loading && <BottomSpinner />}
    </React.Fragment>
  );
};

export default Medical;
