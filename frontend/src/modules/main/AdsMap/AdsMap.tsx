import { FC, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { pallete } from '@theme';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMarkerContext } from '@/context/MarkerProvider/MarkerProvider.tsx';

const markers = [{ id: '1', position: [47.8, 36.0] }];

const AdsMap: FC = () => {
  const mapRef = useRef(null); // Використовуємо useRef для збереження посилання на мапу
  const { setSelectedMarker } = useMarkerContext();

  useEffect(() => {
    if (!mapRef.current) {
      const bounds = [
        [47.8, 32.0], // Південно-східна межа (Донецька область)
        [49.0, 39.0], // Північно-західна межа (Луганська область)
      ];

      const map = L.map('map').setView([48.5, 37.5], 7); // Початкові координати та масштаб
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      map.setMaxBounds(bounds);
      map.on('drag', () => {
        map.panInsideBounds(bounds, { animate: false });
      });

      const LeafIcon = L.Icon.extend({
        options: {
          iconSize: [24, 24],
          shadowSize: [50, 64],
          iconAnchor: [22, 94],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76],
        },
      });

      const icon = new LeafIcon({ iconUrl: '/marker.png' });

      markers.forEach((marker) => {
        const { position } = marker;

        L.marker(position, { icon })
          .addTo(map)
          .on('click', () => {
            setSelectedMarker(marker);
          });
      });

      mapRef.current = map; // Зберегти посилання на мапу у useRef
    }
  }, []);

  return (
    <Box flex={1} borderRight={`1px solid ${pallete.grey[500]}`}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </Box>
  );
};

export default AdsMap;
