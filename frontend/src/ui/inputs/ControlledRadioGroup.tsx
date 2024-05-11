import { FC } from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';

export type ControlledRadioGroupProps = RadioGroupProps & {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
};

export const ControlledRadioGroup: FC<ControlledRadioGroupProps> = ({
  name,
  defaultValue,
  options,
  label,
  ...props
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>

          <RadioGroup value={value} onChange={onChange} {...props}>
            {options.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>

          {error && <FormHelperText error>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
