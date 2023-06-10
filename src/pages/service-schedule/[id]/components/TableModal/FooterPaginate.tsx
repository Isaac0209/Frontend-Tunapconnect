import * as React from "react";

import { GridSlotsComponentsProps } from "@mui/x-data-grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";
import { ButtonIcon } from "./styles";

// declare module '@mui/x-data-grid' {
//   interface FooterPropsOverrides {
//     status: FooterStatus;
//   }
// }

export function CustomFooterStatusComponent(
  props: NonNullable<GridSlotsComponentsProps["footer"]>
) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: 2 }}
    >
      <ButtonIcon
        aria-label="back"
        onClick={() => {
          if (props?.handlePages) {
            props?.handlePages("back");
          }
        }}
        // disabled={!props.previousPage}
      >
        <ArrowBackIosNewIcon color="inherit" />
      </ButtonIcon>
      <ButtonIcon
        aria-label="next"
        // disabled={!props.nextPage}
        onClick={() => {
          if (props?.handlePages) {
            props?.handlePages("next");
          }
        }}
      >
        <ArrowForwardIosIcon color="inherit" />
      </ButtonIcon>
    </Stack>
  );
}
