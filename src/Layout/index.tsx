import { ReactNode } from "react";
import { DashboardContent } from "./DashboardContent";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <DashboardContent>{children}</DashboardContent>
    </>
  );
}
