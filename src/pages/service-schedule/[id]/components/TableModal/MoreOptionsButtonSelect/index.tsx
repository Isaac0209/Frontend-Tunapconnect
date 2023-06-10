import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
// import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Divider from "@mui/material/Divider";
// import { Settings } from "@mui/icons-material";
import { MoreOptionsButtonSelectProps } from "./types";
import { MenuItemButton } from "./styles";
import { useRouter } from "next/router";
import { PrintInspectionModal } from "../../PrintInspectionModal";

// const ITEM_HEIGHT = 38

export function MoreOptionsButtonSelect({
  disabledButton,
  checklistId,
  status,
  handleDeleteChecklist,
}: MoreOptionsButtonSelectProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const [openPrintInspectionModal, setOpenPrintInspectionModal] =
    useState(false);
  const router = useRouter();
  const closePrintInspectionModalModal = () => {
    setOpenPrintInspectionModal(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickEdit = () => {
    try {
      const checklistListLocalStorage = localStorage.getItem("checklist-list");
      if (checklistListLocalStorage) {
        const checklistListLocalStorageParse = JSON.parse(
          checklistListLocalStorage
        );
        const checklistFindOne = checklistListLocalStorageParse.filter(
          (c: any) => c.id === Number(checklistId)
        );
        localStorage.setItem(
          "checklist-edit-byId",
          JSON.stringify(checklistFindOne)
        );
        router.push(`/checklist/create/${checklistId}`);
      }
    } catch (e) {
      console.log(e);
    }
    // router.push(`/checklist/create/${checklistId}`)
  };
  const handleClickDelete = async () => {
    try {
      await handleDeleteChecklist(Number(checklistId));

      alert(`Checklist${checklistId} excluído com sucesso`);
    } catch (e) {
      alert(`Erro ao excluir Checklist - ${checklistId}`);
      console.log(e);
    }
    // await handleDeleteChecklist(Number(100000))
    // handleDeleteChecklist(Number(checklistId))
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabledButton}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            p: "0 10px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItemButton onClick={handleClickEdit}>Editar</MenuItemButton>
        {/* <MenuItemButton onClick={() => {}}>Visualizar</MenuItemButton> */}
        {status !== "Finalizado" && (
          <MenuItemButton onClick={handleClickDelete}>Excluir</MenuItemButton>
        )}
        {/* <MenuItemButton onClick={() => {}}>Enviar</MenuItemButton> */}
        {/* <MenuItemButton onClick={() => {}}>Duplicar</MenuItemButton> */}
        <MenuItemButton onClick={() => setOpenPrintInspectionModal(true)}>
          Imprimir
        </MenuItemButton>
      </Menu>
      <PrintInspectionModal
        isOpen={openPrintInspectionModal}
        closeModal={closePrintInspectionModalModal}
        checkListIdForModal={checklistId as number}
      />
    </div>
  );
}
