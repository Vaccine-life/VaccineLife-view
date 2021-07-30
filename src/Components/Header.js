import React from "react";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          props.history.push("/login");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default withRouter(Header);
