import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRouter } from "next/router";
import { ActionAlertsComponentProps } from "./ActionAlerts";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ActionAlerts({
  isOpen,
  title,
  type,
  handleAlert,
  redirectTo,
}: ActionAlertsComponentProps) {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    handleAlert(false);
    setOpen(false);
    redirectTo !== undefined && router.push(redirectTo);
  };

  React.useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
}
