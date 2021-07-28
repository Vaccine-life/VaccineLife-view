import moment from "moment";
import React from "react";

const Header = () => {
  return (
    <div>
      Header 다은짱 효유니도짱 {moment(new Date()).format("YYYY-MM-DD")}
    </div>
  );
};

export default Header;
