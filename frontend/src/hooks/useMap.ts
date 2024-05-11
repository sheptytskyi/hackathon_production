import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DonetskGeoJSON from '@constants/areas-json/donetsk.json';
import LuganskGeoJSON from '@constants/areas-json/lugansk.json';
import CrimeaGeoJSON from '@constants/areas-json/crimea.json';
import KharkivGeoJSON from '@constants/areas-json/kharkiv.json';
import KhersonGeoJSON from '@constants/areas-json/kherson.json';
import ZaporizkaGeoJSON from '@constants/areas-json/zaporizka.json';

const geoJsonSettings = { style: { color: '#6464ff', fillColor: 'white' } };
const geoJsons = [
  DonetskGeoJSON,
  LuganskGeoJSON,
  CrimeaGeoJSON,
  KharkivGeoJSON,
  KhersonGeoJSON,
  ZaporizkaGeoJSON,
];

const useMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    const map = L.map('map').setView([48.5, 37.5], 7.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© Діти Ньютона',
    }).addTo(map);

    mapRef.current = map;

    geoJsons.forEach((geoJson) => {
      L.geoJSON(geoJson, geoJsonSettings).addTo(mapRef.current);
    });
  }, []);

  return mapRef;
};

export default useMap;
