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
      <meta name="url" content="https://vaccine-life.net/" />
      <meta name="image" content="%PUBLIC_URL%/logo192.png" />
      <meta
        name="keyword"
        content="코로나, 백신, 격리, 후기, 슬기로운백신생활, 슬기로운, 백신생활, 슬기로운 백신생활, 백신접종, 백신 접종, 접종,화이자, 얀센, 아스트라제네카, AZ, az, 모더나, covid, covid_19, 코로나백신, 코로나 백신, 자가격리, 자가 격리, 백신부작용, 백신 부작용, 격리, 코로나19, 코로나 19"
      />
      <meta property="type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
      <meta property="og:site_name" content="슬기로운 백신생활" />
      <meta
        property="og:description"
        content="여러분들의 백신 접종 후기를 공유해주세요."
      />
    </Helmet>
  );
};

export default MetaScript;
