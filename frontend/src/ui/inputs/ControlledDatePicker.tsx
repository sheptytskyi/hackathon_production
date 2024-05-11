import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

export type ControlledDatePickerProps = DatePickerProps<any> & {
  name: string;
};

export const ControlledDatePicker: FC<ControlledDatePickerProps> = ({
  name,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => (
        <FormControl fullWidth error={!!error}>
          <DatePicker value={value} onChange={onChange} {...field} {...props} />

          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
