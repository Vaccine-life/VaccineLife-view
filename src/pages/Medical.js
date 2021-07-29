import React from "react";
import Comment from "../components/Comment";

const Medical = () => {

  return (
    <React.Fragment>
      <div>Medical</div>
      <textarea placeholder="응원의 한마디!"/>
      <button>등록</button>
      <Comment/>
    </React.Fragment>
  );
};

export default Medical;
