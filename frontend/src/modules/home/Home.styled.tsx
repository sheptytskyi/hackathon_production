import { Stack, styled } from '@mui/material';

export const AppWrapper = styled(Stack)(({ theme }) => ({
  background: theme.palette.primary.light,
  overflow: 'hidden',
  height: '100dvh',
}));
