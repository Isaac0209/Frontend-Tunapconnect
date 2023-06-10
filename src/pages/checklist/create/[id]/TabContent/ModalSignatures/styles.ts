import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const MyButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "#0E948B",
  borderRadius: 4,
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  flex: 1,
  textTransform: "none",
  "&:hover": {
    background: "#1ACABA",
  },
}));
