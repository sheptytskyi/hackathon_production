import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { pallete } from '@theme';
import L from 'leaflet';
import { useMarkerContext } from '@/context/MarkerProvider/MarkerProvider.tsx';
import useMap from '@hooks/useMap.ts';

const markers = [{ id: '1', position: [47.8, 36.0] }];

const AdsMap: FC = () => {
  const mapRef = useMap();
  const { setSelectedMarker } = useMarkerContext();

  useEffect(() => {
    if (mapRef.current) {
      const LeafIcon = L.Icon.extend({
        options: {
          iconSize: [24, 24],
          iconAnchor: [24, 24],
        },
      });

      const icon = new LeafIcon({ iconUrl: '/marker.png' });

      markers.forEach((marker) => {
        const { position } = marker;

        L.marker(position, { icon })
          .addTo(mapRef.current)
          .on('click', () => {
            setSelectedMarker(marker);
          });
      });
    }
  }, [markers, mapRef.current]);

  return (
    <Box
      flex={1}
      borderRight={`1px solid ${pallete.grey[500]}`}
      minHeight="60dvh"
    >
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </Box>
  );
};

export default AdsMap;
