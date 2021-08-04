import React, { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { nextCall, children, is_loading, is_next } = props;
  const throttle = _.throttle(() => {
    if (is_loading) {
      return;
    }
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop =
      (document.body && document.body.scrollTop) ||
      document.documentElement.scrollTop;
    let current_height = scrollHeight - innerHeight - scrollTop;

    if (current_height < 200) {
      nextCall();
    }
  }, 300);
  const throttle_callback = useCallback(throttle, [is_loading]);

  useEffect(() => {
    if (is_loading) {
      return;
    }
    if (is_next) {
      window.addEventListener("scroll", throttle_callback);
    } else {
      window.removeEventListener("scroll", throttle_callback);
    }

    return () => window.removeEventListener("scroll", throttle_callback);
  }, [is_loading, is_next]);
  return <>{children}</>;
};

export default InfinityScroll;
