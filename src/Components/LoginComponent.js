import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";

const LoginComponent = (props) => {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 100%;
  padding: 0 50px 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default LoginComponent;
