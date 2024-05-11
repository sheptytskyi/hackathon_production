import { FC, PropsWithChildren } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren<{
  to: string;
  color?: string;
  target?: string;
}>;

export const TextLink: FC<Props> = ({
  children,
  to,
  color = 'common.black',
  target,
}) => {
  return (
    <Typography
      color={color}
      component={Link}
      to={to}
      sx={{ width: 'fit-content' }}
      target={target}
    >
      {children}
    </Typography>
  );
};
