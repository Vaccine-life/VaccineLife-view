import React from "react";
import { history } from "../../redux/configStore";
import { Button, Grid, Text } from "../../elements";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const ListNav = (props) => {
  const { board } = props;

  const handleMoveWrite = () => {
    if (board === "vaccine") {
      history.push("/vaccineboard/write");
    } else {
      history.push("/quarantineboard/write");
    }
  };
  return (
    <Grid is_flex="space_row" margin="96px auto 32px auto">
      <Text size={theme.headOneSize} bold lineHeight={theme.headOneHeight}>
        전체글
      </Text>
      <Button
        width={theme.mediumButtonWidth}
        height={theme.mediumButtonHeight}
        fontSize={theme.bodyOneSize}
        margin="0"
        _onClick={handleMoveWrite}
        bold
      >
        글쓰기 <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "10px" }} />
      </Button>
    </Grid>
  );
};

export default ListNav;
