import React from "react";
import { Helmet } from "react-helmet-async";
import mainimage from "../assets/mainlogo.png";

const MetaScript = (props) => {
  const { title } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta property="og:title" content="" />
      <meta property="og:image" content={mainimage} />
      <meta property="og:site_name" content="" />
      <meta property="og:description" content="" />
    </Helmet>
  );
};

export default MetaScript;
