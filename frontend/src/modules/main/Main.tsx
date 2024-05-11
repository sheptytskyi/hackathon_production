import { FC } from 'react';
import { Wrapper } from '@modules/main/Main.styled.tsx';
import AdsMap from '@modules/main/AdsMap/AdsMap.tsx';
import AdsDashboard from '@modules/main/AdsDashboard/AdsDashboard.tsx';
import { MarkerProvider } from '@/context/MarkerProvider/MarkerProvider.tsx';

const Main: FC = () => {
  return (
    <MarkerProvider>
      <Wrapper>
        <AdsMap />
        <AdsDashboard />
      </Wrapper>
    </MarkerProvider>
  );
};

export default Main;
