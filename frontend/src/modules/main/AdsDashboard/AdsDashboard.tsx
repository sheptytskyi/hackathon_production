import { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useMarkerContext } from '@/context/MarkerProvider/MarkerProvider.tsx';
import AdInfo from '@modules/main/AdsDashboard/AdInfo/AdInfo.tsx';
import AllAds from '@modules/main/AdsDashboard/AllAds/AllAds.tsx';
import { pallete } from '@theme';

const AdsDashboard: FC = () => {
  const { selectedMarker, setSelectedMarker } = useMarkerContext();

  return (
    <Box flexBasis="400px">
      <Stack
        p={3}
        borderBottom={`1px solid ${pallete.grey[500]}`}
        flexDirection="row"
      >
        <Typography>
          {selectedMarker ? ` ${selectedMarker.id}` : 'Усі оголошення'}
        </Typography>

        <Box flex={1} />

        {selectedMarker && (
          <Button onClick={() => setSelectedMarker(null)}>Показати Усі</Button>
        )}
      </Stack>

      {selectedMarker ? <AdInfo /> : <AllAds />}
    </Box>
  );
};

export default AdsDashboard;
