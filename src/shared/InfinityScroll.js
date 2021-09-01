import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import logger from "./logger";

const InfinityScroll = (props) => {
  const { nextCall, children, is_loading, is_next, size } = props;
  const throttle = _.throttle(() => {
    //총 게시판 길이
    let scrollHeight = document.documentElement.scrollHeight;
    // 화면길이
    let innerHeight = window.innerHeight;
    // 현제 스크롤 높이
    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    let current_height = scrollHeight - innerHeight - scrollTop;

    if (current_height < size) {
      if (is_loading) {
        return;
      }
      nextCall();
    }
  }, size);
  const throttle_callback = useCallback(throttle, [is_loading]);

  useEffect(() => {
    // 중복 로딩 방지
    if (is_loading) {
      return;
    }
    //다음이 있고 없을때
    if (is_next) {
      window.addEventListener("scroll", throttle_callback);
    } else {
      window.removeEventListener("scroll", throttle_callback);
    }
    //Unmount시
    return () => window.removeEventListener("scroll", throttle_callback);
  }, [is_loading, is_next]);
  return <>{children}</>;
};

InfinityScroll.defaultProps = {
  children: null,
  nextCall: () => {},
  is_next: false,
  is_loading: false,
};

export default InfinityScroll;
