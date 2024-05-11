import { FC } from 'react';
import { Wrapper } from '@ui/layouts/Header/Header.styled';
import { Button, Stack, Typography } from '@mui/material';
import useNavButtons from '@ui/layouts/Header/hooks/useNavButtons.ts';
import { Link, useLocation } from 'react-router-dom';
import { APP_TITLE } from '@constants';
import { Routes } from '@router';
import UserProfile from '@ui/layouts/Header/components/UserProfile';
import muiTheme from '@theme';

const Header: FC = () => {
  const { pathname } = useLocation();
  const navButtons = useNavButtons();

  return (
    <Wrapper>
      <Typography
        variant="h3"
        component={Link}
        to={Routes.Home}
        sx={{
          textDecoration: 'none',
          [muiTheme.breakpoints.down('sm')]: {
            display: 'none',
          },
        }}
      >
        {APP_TITLE}
      </Typography>

      <Stack flexDirection="row">
        {navButtons.map(({ title, to }) => (
          <Button
            to={to}
            key={to}
            size="small"
            component={Link}
            variant={pathname === to ? 'contained' : 'text'}
          >
            {title}
          </Button>
        ))}
      </Stack>

      <UserProfile />
    </Wrapper>
  );
};

export default Header;
