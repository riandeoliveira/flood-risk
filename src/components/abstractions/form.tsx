import { cn } from "@/utilities/cn";
import type { FormHTMLAttributes, ReactElement } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, className, ...props }: FormProps): ReactElement => {
  return (
    <form noValidate className={cn("", className)} {...props}>
      {children}
    </form>
  );
};
