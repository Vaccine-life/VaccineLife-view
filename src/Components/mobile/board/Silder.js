import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
//CSS
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import "../../../index.css";
import SwiperCore, { Scrollbar } from "swiper/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PopularCard from "../../board/PopularCard";

SwiperCore.use([Scrollbar]);

const Silder = (props) => {
  const { board, topList } = props;
  return (
    <Swiper
      style={{
        padding: "10px 0 10px",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "20px",
      }}
      scrollbar={{
        hide: true,
      }}
      className="mySwiper"
    >
      {board === "vaccine" &&
        topList?.map((each, index) => {
          return (
            <Wrapper>
              <PopularCard
                key={index}
                board={board}
                boardId={each.vacBoardId}
                title={each.title}
                likeCount={each.likeCount}
                totalVisitors={each.totalVisitors}
                commentCount={each.commentCount}
                contents={each.contents}
                createdAt={each.createdAt}
                type={each.type}
              />
            </Wrapper>
          );
        })}
    </Swiper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Silder;
