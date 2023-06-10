import { styled } from "@mui/material/styles";

export const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 44,
  height: 44,
  border: "3px solid #1ACABA",
  // '.Mui-focusVisible &': {
  //   outline: '2px auto rgba(19,124,189,.6)',
  //   outlineOffset: 2,
  // },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 27,
  lineHeight: 27,
  // 'input:hover ~ &': {
  //   backgroundColor: 'rgba(206,217,224,.5)',
  // },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
  },
}));

export const BpCheckedIcon = styled(BpIcon)({
  border: "3px solid #93BE0F",
  // 'input:hover ~ &': {
  //   backgroundColor: '#93BE0F',
  // },
});
