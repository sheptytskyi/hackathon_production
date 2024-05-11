import { IconButton, styled } from '@mui/material';
import {
  closeSnackbar,
  MaterialDesignContent,
  SnackbarAction,
} from 'notistack';
import { Close } from '@mui/icons-material';
import { pallete } from '@theme';

export const Action: SnackbarAction = (key) => (
  <IconButton
    size="small"
    onClick={() => {
      closeSnackbar(key);
    }}
  >
    <Close sx={{ fill: pallete.grey[800] }} />
  </IconButton>
);

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1)',
    color: pallete.grey[900],
    border: `1px solid ${pallete.grey[500]}`,
    backgroundColor: pallete.common.white,

    '&.notistack-MuiContent-success': {
      color: pallete.common.black,
    },

    '&.notistack-MuiContent-error': {
      color: pallete.error.main,
    },
  }),
);
