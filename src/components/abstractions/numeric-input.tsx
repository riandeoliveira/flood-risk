import type { FormikProps } from "formik";
import type { ReactElement } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./input";
import { TextField } from "@mui/material";

export type NumericInputProps = NumericFormatProps {
  instance?: FormikProps<any>;
};

export const NumericInput = ({
  instance,
}: NumericInputProps): ReactElement => {
  

  return (
    <NumericFormat
      customInput={() => <TextField />
      }
    />
  );
};
