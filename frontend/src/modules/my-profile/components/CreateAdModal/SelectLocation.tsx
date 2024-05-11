import { FC, useEffect, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import useMap from '@hooks/useMap.ts';
import L from 'leaflet';
import { useFormContext } from 'react-hook-form';

const SelectLocation: FC = () => {
  const markerRef = useRef<L.Marker | null>(null);
  const { setValue } = useFormContext();

  const mapRef = useMap();

  const addMarker = (e: L.LeafletMouseEvent) => {
    console.log(e, 'ss');

    if (!markerRef.current) {
      const LeafIcon = L.Icon.extend({
        options: {
          iconSize: [24, 24],
          iconAnchor: [24, 24],
        },
      });

      const icon = new LeafIcon({ iconUrl: '/marker.png' });

      markerRef.current = L.marker([e.latlng.lat, e.latlng.lng], {
        icon,
      }).addTo(mapRef.current);
    }

    markerRef.current.setLatLng(e.latlng);
    setValue('latitude', e.latlng.lat);
    setValue('longitude', e.latlng.lng);
  };

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.on('click', addMarker);

    return () => {
      mapRef.current.off('click', addMarker);
    };
  }, [mapRef.current]);

  return (
    <Stack gap={3}>
      <Typography mb={2} variant="h6">
        Оберіть локацію на карті
      </Typography>

      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </Stack>
  );
};

export default SelectLocation;
