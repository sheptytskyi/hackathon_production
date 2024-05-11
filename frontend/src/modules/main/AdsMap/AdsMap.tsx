import { FC, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { pallete } from '@theme';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMarkerContext } from '@/context/MarkerProvider/MarkerProvider.tsx';
import DonetskGeoJSON from './areas-json/donetsk.json';
import LuganskGeoJSON from './areas-json/lugansk.json';
import CrimeaGeoJSON from './areas-json/crimea.json';
import KharkivGeoJSON from './areas-json/kharkiv.json';
import KhersonGeoJSON from './areas-json/kherson.json';
import ZaporizkaGeoJSON from './areas-json/zaporizka.json';

const markers = [{ id: '1', position: [47.8, 36.0] }];
const geoJsonSettings = { style: { color: '#6464ff', fillColor: 'white' } };
const geoJsons = [
  DonetskGeoJSON,
  LuganskGeoJSON,
  CrimeaGeoJSON,
  KharkivGeoJSON,
  KhersonGeoJSON,
  ZaporizkaGeoJSON,
];

const AdsMap: FC = () => {
  const mapRef = useRef(null); // Використовуємо useRef для збереження посилання на мапу
  const { setSelectedMarker } = useMarkerContext();

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    const map = L.map('map').setView([48.5, 37.5], 7.5); // Початкові координати та масштаб

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    mapRef.current = map; // Зберегти посилання на мапу у useRef

    geoJsons.forEach((geoJson) => {
      L.geoJSON(geoJson, geoJsonSettings).addTo(mapRef.current);
    });
  }, []);

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
    <Box flex={1} borderRight={`1px solid ${pallete.grey[500]}`}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </Box>
  );
};

export default AdsMap;
