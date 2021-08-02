import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import theme from "../../styles/theme";

const UserInfo = (props) => {
  const { type, gender, age, disease, degree, afterEffect } = props;

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>백신종류</th>
            <th>차수</th>
            <th>연령대</th>
            <th>성별</th>
            <th>기저질환</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{type}</th>
            <th>{degree} 차</th>
            <th>{age}</th>
            <th>{gender}</th>
            <th>{disease}</th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>후유증</th>
            <th colSpan="4">{afterEffect}</th>
          </tr>
        </tfoot>
      </Table>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
`;

const EachWrapper = styled.div`
  width: 30%;
  display: flex;
  height: 30px;
  margin: 10px;
`;
export default UserInfo;
