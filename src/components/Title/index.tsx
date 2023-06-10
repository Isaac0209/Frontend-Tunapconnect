import { TitleTypography } from "./styles";
import { ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <TitleTypography variant="h6" gutterBottom>
      {props.children}
    </TitleTypography>
  );
}
