import Typography from "@mui/material/Typography";
import { teal } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const TitleTypography = styled(Typography)(({ theme }) => ({
  color: teal[900],
  fontWeight: "bold",
  margin: 0,
}));
