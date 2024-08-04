import { Autocomplete, TextField } from "@mui/material";
import type { FormikProps } from "formik";
import type { ReactElement, SyntheticEvent } from "react";

type SelectProps = {
  disableClearable?: boolean;
  label: string;
  onSelect: (event: SyntheticEvent, value: string | null) => void;
  options: string[];
  value: string | null;
  instance?: FormikProps<any>;
  name: string;
};

export const Select = ({
  disableClearable,
  label,
  onSelect,
  options,
  value,
  instance,
  name = "",
}: SelectProps): ReactElement => {
  const isInputTouched = instance?.touched[name];
  const inputErrors = instance?.errors[name];

  return (
    <Autocomplete
      disableClearable={disableClearable}
      fullWidth
      size="small"
      noOptionsText="Nenhuma opção"
      getOptionLabel={(option): string => option}
      onChange={onSelect}
      options={options}
      renderOption={(props, option): ReactElement => <li {...props}>{option}</li>}
      value={value}
      renderInput={(params): ReactElement => (
        <TextField
          {...params}
          label={label}
          error={isInputTouched && !!inputErrors}
          helperText={(isInputTouched && inputErrors)?.toString()}
          FormHelperTextProps={{ className: "!ml-0" }}
        />
      )}
    />
  );
};
