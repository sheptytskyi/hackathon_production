import { FC } from 'react';
import { Backdrop, BackdropProps, CircularProgress } from '@mui/material';

export const Loader: FC<BackdropProps> = (props) => (
  <Backdrop {...props} sx={{ zIndex: 1400 }}>
    <CircularProgress size={80} thickness={2} />
  </Backdrop>
);
