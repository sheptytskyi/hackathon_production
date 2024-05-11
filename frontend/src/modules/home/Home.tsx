import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@ui';
import { AppWrapper } from '@modules/home/Home.styled';

const Home: FC = () => (
  <AppWrapper>
    <Header />

    <Outlet />
  </AppWrapper>
);

export default Home;
