import { useContext, useEffect, useRef, useState } from "react";

import { BoxContainer } from "./styles";

import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import useMediaQuery from "@mui/material/useMediaQuery";
import { PrintInspection } from "../PrintInspection";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { Button } from "@mui/material";

import { CompanyContext } from "@/contexts/CompanyContext";
import { ChecklistProps } from "@/pages/checklist/types";

interface PrintInspectionModalProps {
  isOpen: boolean;
  closeModal: () => void;
  checkListIdForModal: number;
  checkListData?: ChecklistProps;
}

export function PrintInspectionModal({
  isOpen,
  closeModal,
  checkListIdForModal,
}: PrintInspectionModalProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { companySelected } = useContext(CompanyContext);

  const printInspectionRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen, companySelected]);

  return (
    <>
      <Dialog
        // fullScreen={fullScreen}
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{title}</DialogTitle> */}
        <DialogContent
        // sx={{
        //   width: 400,
        // }}
        >
          <BoxContainer>
            <PrintInspection
              refPrint={printInspectionRef}
              checklistId={checkListIdForModal}
              type="service-schedule"
              companyId={companySelected}
              id={1}
            />
          </BoxContainer>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
          <ReactToPrint
            trigger={() => (
              <Button>
                <PrintIcon />
              </Button>
            )}
            content={() => printInspectionRef.current}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
