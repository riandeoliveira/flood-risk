import { cn } from "@/utilities/cn";
import { TextField } from "@mui/material";
import type { FormikProps } from "formik";
import type { ReactElement } from "react";
import type { NumericFormatProps } from "react-number-format";
import { NumericFormat } from "react-number-format";

export type NumericInputProps = NumericFormatProps & {
  instance?: FormikProps<any>;
  label: string;
};

export const NumericInput = ({
  className,
  instance,
  placeholder,
  name = "",
  label,
}: NumericInputProps): ReactElement => {
  const isInputTouched = instance?.touched[name];
  const inputErrors = instance?.errors[name];

  return (
    <NumericFormat
      customInput={() => (
        <TextField
          type="number"
          label={label}
          name={name}
          placeholder={placeholder}
          error={isInputTouched && !!inputErrors}
          helperText={(isInputTouched && inputErrors)?.toString()}
          FormHelperTextProps={{ className: "!ml-0" }}
          className={cn("w-full", className)}
        />
      )}
    />
  );
};
