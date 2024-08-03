import type { FormikProps } from "formik";
import type { ReactElement } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./input";
import { TextField } from "@mui/material";

export type NumericInputProps = NumericFormatProps {
  instance?: FormikProps<any>;
  name: string;
  label: string;
  placeholder: string;
};

export const NumericInput = ({
  instance,
  name,
  placeholder = "",
  label,
}: NumericInputProps): ReactElement => {
  return (
    <NumericFormat
    
      customInput={
        TextField
        // <Input name={name} label={label} placeholder={placeholder} instance={instance} />
      }
    />
  );
};
