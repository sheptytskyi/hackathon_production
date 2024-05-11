import { FC, PropsWithChildren } from 'react';
import { Stack, Typography } from '@mui/material';

type Props = PropsWithChildren<{
  title: string;
}>;

export const InfoItem: FC<Props> = ({ title, children }) => {
  return (
    <Stack gap={1}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="grey.800">{children}</Typography>
    </Stack>
  );
};
