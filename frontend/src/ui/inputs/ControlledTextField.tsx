import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { pallete } from '@theme';

export type ControlledTextFieldProps = TextFieldProps & {
  name: string;
  triggerFields?: string[];
};

export const ControlledTextField: FC<ControlledTextFieldProps> = ({
  name,
  fullWidth = true,
  required,
  defaultValue,
  helperText,
  triggerFields,
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
        <TextField
          fullWidth={fullWidth}
          required={required}
          value={value ?? ''}
          helperText={error?.message || helperText}
          error={!!error}
          inputProps={{
            sx: {
              '&::placeholder': {
                color: pallete.grey[800],
                opacity: 1,
              },
            },
          }}
          onBlur={() => {
            onBlur();
            if (triggerFields?.length) trigger(triggerFields);
          }}
          {...field}
          {...props}
        />
      )}
    />
  );
};
