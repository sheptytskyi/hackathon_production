import { FC, PropsWithChildren } from 'react';
import { Stack, StackProps } from '@mui/material';

type Props = PropsWithChildren<StackProps>;

export const Centered: FC<Props> = ({ children, ...props }) => (
  <Stack justifyContent="center" alignItems="center" flex={1}>
    <Stack {...props}>{children}</Stack>
  </Stack>
);
