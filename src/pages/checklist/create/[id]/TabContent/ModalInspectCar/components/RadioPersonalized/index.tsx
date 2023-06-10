import Radio, { RadioProps } from "@mui/material/Radio";
import { BpCheckedIcon, BpIcon } from "./styles";

interface RadioPersonalizedProps extends RadioProps {
  title: string;
  checkedTitle?: string;
}

export function RadioPersonalized(props: RadioPersonalizedProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon>{props.title}</BpCheckedIcon>}
      icon={<BpIcon>{props.title}</BpIcon>}
      {...props}
    />
  );
}
