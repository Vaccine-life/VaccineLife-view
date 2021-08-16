import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import logger from "./logger";

const InfinityScroll = (props) => {
  const { nextCall, children, is_loading, is_next, size } = props;
  const throttle = _.throttle(() => {
    let scrollHeight = document.documentElement.scrollHeight;
    let innerHeight = window.innerHeight;
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

InfinityScroll.defaultProps = {
  children: null,
  nextCall: () => {},
  is_next: false,
  is_loading: false,
};

export default InfinityScroll;
