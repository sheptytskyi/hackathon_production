import { FC } from 'react';
import { Controller } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  ImageList,
  ImageListItem,
} from '@mui/material';

export type ControlledFilesUploadProps = {
  name: string;
};

export const ControlledFilesUpload: FC<ControlledFilesUploadProps> = ({
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            {...props}
            onChange={(event) => {
              field.onChange(event.target.files);
            }}
          />

          {field.value && (
            <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
              {Array.from(field.value).map((file: unknown) => (
                <ImageListItem key={(file as File).name}>
                  <img
                    src={URL.createObjectURL(file as File)}
                    alt={(file as File).name}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          <label htmlFor="raised-button-file">
            <Button component="span">Завантажити фото</Button>
          </label>

          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
