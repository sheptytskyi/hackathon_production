import { FC, PropsWithChildren } from 'react';
import { Stack, Typography } from '@mui/material';

type Props = PropsWithChildren<{
  title: string;
}>;

export const Section: FC<Props> = ({ title, children }) => {
  return (
    <Stack gap={6}>
      <Typography variant="h2">{title}</Typography>

      {children}
    </Stack>
  );
};
