import { Stack, styled } from '@mui/material';
import muiTheme from '@theme';

export const Wrapper = styled(Stack)({
  width: '100dvw',
  height: '100%',
  flexDirection: 'row',
  overflowY: 'auto',

  [muiTheme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
});
