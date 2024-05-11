import { FC, ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useLogout from '@hooks/useLogout';
import { Button, Stack, Typography } from '@mui/material';
import useProfile from '@hooks/useProfile.ts';
import { UserTypes } from '@constants';
import { Routes } from '@router/index.ts';
import { Centered, Loader } from '@ui';

type Props = {
  role: UserTypes;
  children: ReactNode;
};

const RoleGuard: FC<Props> = ({ children, role }) => {
  const navigate = useNavigate();
  const [{ user_type }, { isLoading, isError, refetch }] = useProfile();
  const handleLogout = useLogout();

  if (isLoading) {
    return <Loader open />;
  }

  if (isError || !user_type) {
    return (
      <Centered width={500}>
        <Typography variant="h2" align="center">
          Your role was unable to identify.
        </Typography>

        <Button
          onClick={() => navigate(-1)}
          variant="filled"
          sx={{ mt: 5, flex: 1 }}
        >
          Back
        </Button>

        <Stack width="100%" gap={4} flexDirection="row">
          <Button onClick={refetch} variant="filled" sx={{ mt: 2, flex: 1 }}>
            Try Again
          </Button>

          <Button
            onClick={handleLogout}
            variant="filled"
            sx={{ mt: 2, flex: 1 }}
          >
            Logout
          </Button>
        </Stack>
      </Centered>
    );
  }

  if (role === user_type) {
    return <>{children}</>;
  }

  return <Navigate to={Routes.Main} />;
};

export default RoleGuard;
