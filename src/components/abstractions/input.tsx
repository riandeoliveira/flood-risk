import { cn } from "@/utilities/cn";
import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { FormikProps } from "formik";
import type { ReactElement } from "react";

export type InputProps = TextFieldProps & {
  instance?: FormikProps<any>;
};

export const Input = ({ className, name = "", instance, ...props }: InputProps): ReactElement => {
  const isInputTouched = instance?.touched[name];
  const inputErrors = instance?.errors[name];

  return (
    <TextField
      type="text"
      name={name}
      value={instance?.values[name]}
      onChange={instance?.handleChange}
      error={isInputTouched && !!inputErrors}
      helperText={(isInputTouched && inputErrors)?.toString()}
      FormHelperTextProps={{ className: "!ml-0" }}
      className={cn("w-full", className)}
      {...props}
    />
  );
};
