import React, { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { nextCall, children, is_loading, is_next } = props;
  const throttle = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    let current_height = scrollHeight - innerHeight - scrollTop;

    if (current_height < 200) {
      if (is_loading) {
        return;
      }

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

InfinityScroll.defaultProps = {
  children: null,
  nextCall: () => {},
  is_next: false,
  is_loading: false,
};

export default InfinityScroll;
