import React from "react";
import moment from "moment";

const Header = () => {
  return (
    <div>
      Header 다은짱 효유니도짱 {moment(new Date()).format("YYYY-MM-DD")}
    </div>
  );
};

export default Header;
