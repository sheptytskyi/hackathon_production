import { FC } from 'react';
import { Stack } from '@mui/material';

const AllAds: FC = () => {
  const all = [
    {
      id: 1,
      position: [50.4501, 30.5234],
    },
    {
      id: 2,
      position: [50.4502, 30.5235],
    },
    {
      id: 3,
      position: [50.4503, 30.5236],
    },
  ];

  return (
    <Stack>
      {all.map((ad) => (
        <div key={ad.id}>
          {ad.id} - {ad.position[0]}
        </div>
      ))}
    </Stack>
  );
};

export default AllAds;
