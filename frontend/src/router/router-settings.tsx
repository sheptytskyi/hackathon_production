import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Routes } from '@router';
import { Loader } from '@ui';
import AuthGuard from '@router/AuthGuard.tsx';

const Login = lazy(() => import('@modules/login'));
const Registration = lazy(() => import('@modules/registration'));
const Main = lazy(() => import('@modules/main'));
const Home = lazy(() => import('@modules/home'));
const Profile = lazy(() => import('@modules/my-profile'));

const RouterSettings = createBrowserRouter([
  {
    path: Routes.Home,
    element: (
      <Suspense fallback={<Loader open />}>
        <Home />
      </Suspense>
    ),
    children: [
      { index: true, element: <Main /> },
      {
        path: Routes.Login,
        element: (
          <AuthGuard shouldBeLogged={false}>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: Routes.Register,
        element: (
          <AuthGuard shouldBeLogged={false}>
            <Registration />
          </AuthGuard>
        ),
      },
      {
        path: Routes.Profile,
        element: (
          <AuthGuard shouldBeLogged>
            <Profile />
          </AuthGuard>
        ),
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to={Routes.Home} replace />,
  },
]);

export default RouterSettings;
