import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
//CSS
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";
import styled from "styled-components";

import logger from "../../../shared/logger";

import PopularCard from "../../board/PopularCard";

SwiperCore.use([Pagination]);

const Silder = (props) => {
  const { board, top_list_vac, top_list_quar } = props;

  logger(top_list_vac);

  return (
    <Swiper
      style={{
        height: "235px",
        padding: "24px 0 0 0",
      }}
      pagination={true}
      className="mySwiper"
    >
      {board === "vaccine" &&
        top_list_vac?.map((each, index) => {
          return (
            <SwiperSlide
              style={{ backgroundColor: `transparent`, height: "200px" }}
            >
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
            </SwiperSlide>
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
