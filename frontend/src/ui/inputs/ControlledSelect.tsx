import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

export type ControlledSelectProps = SelectProps & {
  name: string;
  triggerFields?: string[];
  options: { value: string; label: string }[];
};

export const ControlledSelect: FC<ControlledSelectProps> = ({
  name,
  fullWidth = true,
  required,
  defaultValue,
  triggerFields,
  options,
  label,
  ...props
}) => {
  const { trigger } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { value, onBlur, ...field },
        fieldState: { error },
      }) => (
        <FormControl fullWidth={fullWidth} error={!!error}>
          <InputLabel id={name}>{label}</InputLabel>

          <Select
            labelId={name}
            label={label}
            fullWidth={fullWidth}
            required={required}
            value={value ?? ''}
            error={!!error}
            onBlur={() => {
              onBlur();
              if (triggerFields?.length) trigger(triggerFields);
            }}
            {...field}
            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
