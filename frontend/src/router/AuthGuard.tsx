import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { selectAccessToken } from '@app/slices/auth.ts';
import { useAppSelector } from '@hooks/store.ts';
import Routes from '@router/routes.ts';

type Props = {
  children: ReactNode;
  shouldBeLogged?: boolean;
};

const AuthGuard: FC<Props> = ({ children, shouldBeLogged = true }) => {
  const accessToken = useAppSelector(selectAccessToken);

  if (shouldBeLogged ? accessToken : !accessToken) {
    return <>{children}</>;
  }

  return <Navigate to={accessToken ? Routes.Profile : Routes.Login} />;
};

export default AuthGuard;
