import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

export const ButtonSignatures = styled(Button)(({ theme }) => ({
  background: "#1ACABA",
  color: "#fff",
  borderRadius: 6,

  "&:hover": {
    background: alpha("#1ACABA", 0.4),
    // color: '#FFFFFF',
  },
}));

export const ImageUploadBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
export const ImageUploadImg = styled(CropOriginalIcon)(({ theme }) => ({
  color: "#1C4961",
}));
export const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "nowrap",
  width: "100%",
}));
export const InputLabelRow = styled(Typography)(({ theme }) => ({
  marginRight: "10px",
  fontWeight: "bold",
}));
export const InputText = styled(OutlinedInput)(({ theme }) => ({
  flex: 1,
}));

// export const StackButtonsSubmit = styled(Stack)`
//   margin-top: 50px;
//   z-index: 1000;
//   position: 'absolute';
// `
export const ButtonsSave = styled(Button)(({ theme }) => ({
  color: "white",
  background: "#0E948B",
  borderRadius: 4,
  position: "absolute",
  right: 86,
  bottom: -56,
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  flex: 1,
  textTransform: "none",
  "&:hover": {
    background: "#1ACABA",
  },
}));
export const ButtonsFinalized = styled(Button)(({ theme }) => ({
  color: "white",
  background: "#0E948B",
  borderRadius: 4,
  position: "absolute",
  right: -16,
  bottom: -56,
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  flex: 1,
  textTransform: "none",
  "&:hover": {
    background: "#1ACABA",
  },
}));

export const MarginBottomHack = styled("div")(({ theme }) => ({
  position: "absolute",
  right: -16,
  bottom: -86,
  width: "100%",
  height: "20px",
}));
