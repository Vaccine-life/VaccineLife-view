import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../../elements";
import { history } from "../../redux/configStore";
import displayedAt from "../../shared/displayedAt";

const BoardInfo = (props) => {
  const { vacBoardId, title, hits, createdAt, user } = props;
  const handleOnClick = () => {
    history.push(`/modify/${vacBoardId}`);
  };

  return (
    <Grid margin="30px auto 30px auto">
      <Grid is_flex="space_row">
        <Text>{title}</Text>
        <Grid width="200px" margin="0">
          <Button _onClick={handleOnClick} width="70px">
            수정
          </Button>
          <Button width="70px" margin="0 0 0 20px">
            삭제
          </Button>
        </Grid>
      </Grid>
      <NameHitWrapper>
        <Text margin="20px 0 20px 0">{user.nickname}</Text>
        <Hitdiv>
          <Text>{displayedAt(createdAt)}</Text>
          <Text margin="0 0 0 20px">{hits} 회</Text>
        </Hitdiv>
      </NameHitWrapper>
      <Grid></Grid>
    </Grid>
  );
};

const NameHitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

const Hitdiv = styled.div`
  display: flex;
`;

export default BoardInfo;
