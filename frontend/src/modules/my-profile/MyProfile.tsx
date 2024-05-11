import { FC } from 'react';
import MyInfo from '@modules/my-profile/components/MyInfo/MyInfo.tsx';
import { Stack } from '@mui/material';
import MyAds from '@modules/my-profile/components/MyAds/MyAds.tsx';

const MyProfile: FC = () => {
  return (
    <Stack gap={6} pt={3} pb={6} px={10}>
      <MyInfo />
      <MyAds />
    </Stack>
  );
};

export default MyProfile;
