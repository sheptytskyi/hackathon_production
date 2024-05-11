import { FC } from 'react';
import { Controller } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';

export type ControlledAutocompleteProps = Omit<
  AutocompleteProps<{ label: string; value: string }, any, any, any>,
  'renderInput'
> & {
  name: string;
  label: string;
  placeholder?: string;
};

export const ControlledAutocomplete: FC<ControlledAutocompleteProps> = ({
  name,
  fullWidth = true,
  defaultValue,
  label,
  placeholder,
  ...props
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <FormControl fullWidth={fullWidth} error={!!error}>
          <Autocomplete
            {...field}
            {...props}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth={fullWidth}
                // variant="contained"
                label={label}
                placeholder={placeholder}
              />
            )}
            onChange={(_, data) => onChange(data)}
          />

          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
