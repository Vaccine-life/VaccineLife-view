import React from "react";
import { Helmet } from "react-helmet-async";

const MetaScript = (props) => {
  const { title } = props;
  return (
    <Helmet>
      <meta charset="utf-8" />
      <title>{title}</title>
      <meta
        name="description"
        content="여러분들의 백신 접종 후기를 공유해주세요."
      />
      <meta
        name="keyword"
        content="코로나, 백신, 격리, 후기, 슬기로운백신생활, 슬기로운, 백신생활"
      />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
      <meta property="og:site_name" content={title} />
      <meta
        property="og:description"
        content="여러분들의 백신 접종 후기를 공유해주세요."
      />
    </Helmet>
  );
};

export default MetaScript;
