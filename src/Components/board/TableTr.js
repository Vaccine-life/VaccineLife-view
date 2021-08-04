import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import LikeIconChanger from "../LikeIconChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import displayedAt from "../../shared/displayedAt";

const TableTr = (props) => {
  const { type, title, likeCount, commentCount, hits, createAt } = props;
  return (
    <TableThread>
      <Th style={{ color: "black" }}>{type}</Th>
      <Th style={{ color: "black" }}>{title}</Th>
      <Th>
        {" "}
        <LikeIconChanger isHeart={true} />
        <p style={{ marginLeft: "5.55px" }}>{likeCount}</p>
      </Th>
      <Th>
        {" "}
        <FontAwesomeIcon icon={faCommentAlt} />
        <p style={{ marginLeft: "5.55px" }}>{commentCount}</p>
      </Th>
      <Th>
        {" "}
        <FontAwesomeIcon icon={faEye} />
        <p style={{ marginLeft: "5.55px" }}>{hits}</p>
      </Th>
      <Th>{displayedAt(createAt)}</Th>
    </TableThread>
  );
};

const TableThread = styled.tr`
  border-bottom: 1px solid ${theme.typoGrey2};
  height: 40px;
`;
const Th = styled.th`
  text-align: start;
  line-height: 40px;
  vertical-align: center;
`;

export default TableTr;
