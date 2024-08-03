import { cn } from "@/utilities/cn";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import type { ReactElement } from "react";

type ButtonProps = MuiButtonProps;

export const Button = ({ children, className, ...props }: ButtonProps): ReactElement => {
  return (
    <MuiButton variant="contained" className={cn("", className)} {...props}>
      {children}
    </MuiButton>
  );
};
