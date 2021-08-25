import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size, width, height, cursor, margin, _onClick } = props;

  const styles = {
    src: src,
    size: size,
    width: width,
    height: height,
    cursor: cursor,
    margin: margin,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }
  if (shape === "square") {
    return <ImageSquare {...styles}></ImageSquare>;
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "",
  size: "40px",
  cursor: "",
  margin: false,
  _onclick: () => {},
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  object-fit: cover;
`;

const AspectInner = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: center;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  /* margin: auto; */
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageSquare = styled.div`
  --size: ${(props) => props.size};
  width: ${(props) => props.size};
  height: var(--size);
  cursor: ${(props) => props.cursor};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
`;

export default Image;
