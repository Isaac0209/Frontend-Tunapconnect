import styled from "@emotion/styled";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, Button, Stack, Tabs, TextField, Typography } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface LabelButtonMarkupTypeProps {
  selectedActual: boolean;
}

interface ClickableAreaProps {
  urlImg?: string;
}
// interface ButtonMarkupProps {
//   topmarkup: number
//   leftmarkup: number
// }
interface ButtonMarkupProps {
  mobile: {
    top: number;
    left: number;
  };
  web: {
    top: number;
    left: number;
  };
}

export const TabsContainer = styled(Tabs)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  background: "#d5d5d5",
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  textTransform: "none",
  "& .Mui-selected": {
    background: "#93BE0F",
    color: "#FFFFFF",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#ffffff",
  },
}));

export const LabelButtonMarkupType = styled("label")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  "& > span": {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  "&:hover": {
    cursor: "pointer",
  },
}));

export const ButtonMarkupType = styled.button<LabelButtonMarkupTypeProps>`
  color: #707070;
  background: rgb(237, 234, 234, 0.7);
  width: 44px;
  height: 44px;
  font-size: 25px;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 25px;
  border: 3px solid ${(props) => (props.selectedActual ? "#93BE0F" : "#1acaba")};

  border-radius: 50%;
  padding: 0;
  &:hover {
    background: ${(props) => (props.selectedActual ? "#93BE0F" : "#1acaba")};
    color: #fff;
    cursor: pointer;
  }
`;
export const ContainerButtonsMarkupType = styled(Stack)`
  @media (max-width: 600px) {
    /* width: 330px; */
  }
  @media (min-width: 601px) and (max-width: 900px) {
    /* margin-right: -150px; */
  }
  @media (min-width: 901px) and (max-width: 1200px) {
    margin-right: -230px;
    z-index: 1000;
  }
`;

export const ButtonMarkup = styled(ButtonBase)<ButtonMarkupProps>`
  color: #707070;
  background: rgba(237, 234, 234, 0.7);
  width: 44px;
  height: 44px;
  font-size: 25px;
  text-transform: uppercase;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 25px;
  border: 3px solid #93be0f;

  border-radius: 50%;
  padding: 0;
  & > svg {
    display: none;
  }
  top: ${(props) => props.web.top}px;
  left: ${(props) => props.web.left}px;
  text-transform: none;
  &:hover {
    border: 3px solid #f26960;
    color: #f26960;
    & > svg {
      display: inline;
      position: absolute;
    }
    & > span {
      display: none;
    }
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 600px) {
    top: ${(props) => props.mobile.top}px;
    left: ${(props) => props.mobile.left}px;
    width: 30px;
    height: 30px;
    font-size: 20px;
  }
`;

export const ContainerClickableArea = styled(Box)`
  width: 470px;
  height: 350px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(470px - (470px * 0.3));
    height: calc(350px - (350px * 0.3));
  }
  /* @media (min-width: 601px) and (max-width: 960px) {
    margin: 0;
  } */
`;

export const ClickableArea = styled("img")<ClickableAreaProps>`
  /* width: 490px; */
  width: 470px;
  height: 350px;
  position: relative;
  border: 1px solid #acaaaa;
  border-radius: 9px;
  overflow: hidden;
  /* margin: 0 auto; */
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${(props) => props.urlImg}); */
  & * {
    pointer-events: none;
    background: red;
  }

  @media (max-width: 600px) {
    margin: 0 auto;
    width: calc(470px - (470px * 0.3));
    height: calc(350px - (350px * 0.3));
  }
`;

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
export const ButtonLeft = styled(Button)(({ theme }) => ({
  color: "white",
  background: "#93BE0F",
  borderRadius: 0,
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  // padding: '5px 16px',
  flex: 1,
  textTransform: "none",
  "&:hover": {
    background: "#1ACABA",
  },
}));
export const ButtonRight = styled(Button)(({ theme }) => ({
  color: "white",
  background: "#93BE0F",
  borderRadius: 0,
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  // padding: '5px 16px',
  flex: 1,
  textTransform: "none",
  "&:hover": {
    background: "#1ACABA",
  },
}));

export const ContainerInformation = styled(Stack)`
  border: 1px solid #acaaaa;
  border-radius: 9px;
  /* padding: 2px; */
  justify-content: center;
  /* width: 200px; */
  width: 100%;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 330px;
    margin: 0 auto;
  }
  @media (min-width: 601px) and (max-width: 900px) {
    width: 470px;
  }
  @media (min-width: 901px) and (max-width: 1200px) {
    width: 560px;
    margin: 0 auto;
  }
`;
export const ContainerButtonsInformation = styled(Stack)`
  width: 100%;
  margin: 10px auto 0 auto;
  @media (max-width: 600px) {
    width: 330px;
  }
  @media (min-width: 601px) and (max-width: 900px) {
    width: 470px;
  }
  @media (min-width: 901px) and (max-width: 1200px) {
    width: 560px;
  }
`;
export const IconUpload = styled(FileUploadOutlinedIcon)(({ theme }) => ({
  fontSize: "16px",
}));
export const IconClose = styled(CloseOutlinedIcon)(({ theme }) => ({
  fontSize: "16px",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  textTransform: "uppercase",
  display: "flex",
}));

export const TextAreaField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: 6,
    fontSize: 10,
  },
}));
