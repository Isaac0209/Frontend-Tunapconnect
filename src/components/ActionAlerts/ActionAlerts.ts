export type ActionAlertsComponentProps = {
  isOpen: boolean;
  handleAlert: (value: boolean) => void;
  title: string;
  type: "error" | "warning" | "success";
  redirectTo?: string | undefined;
};

export type ActionAlertsStateProps = {
  isOpen: boolean;
  title: string;
  type: "error" | "warning" | "success";
  redirectTo?: string | undefined;
};
