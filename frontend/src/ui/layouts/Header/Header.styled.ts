import { Stack, styled } from '@mui/material';

export const Wrapper = styled(Stack)(({ theme }) => ({
  width: '100%',
  top: 0,

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing(4)} ${theme.spacing(8)}`,

  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
}));
