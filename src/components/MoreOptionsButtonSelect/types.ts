import { ReactNode } from "react";

export type isEditSelectedCardType =
  | "client"
  | "clientVehicle"
  | "schedule"
  | "technicalConsultant"
  | null;

export type MoreOptionsButtonSelectProps = {
  typeEdit: isEditSelectedCardType;
  handleIsEditSelectedCard: (value: isEditSelectedCardType) => void;
  disabledButton?: boolean;
  buttons?: {
    label: string;
    icon?: ReactNode;
    action?: (value?: any) => void;
  }[];
};
