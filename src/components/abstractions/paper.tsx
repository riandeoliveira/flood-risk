import { cn } from "@/utilities/cn";
import type { PaperProps as MuiPaperProps } from "@mui/material";
import { Paper as MuiPaper } from "@mui/material";
import type { ReactElement } from "react";

type PaperProps = MuiPaperProps;

export const Paper = ({ children, className, ...props }: PaperProps): ReactElement => {
  return (
    <MuiPaper elevation={6} className={cn("", className)} {...props}>
      {children}
    </MuiPaper>
  );
};
