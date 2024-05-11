import { FC } from 'react';
import { useMarkerContext } from '@/context/MarkerProvider/MarkerProvider.tsx';

const AdInfo: FC = () => {
  const { selectedMarker } = useMarkerContext();

  if (!selectedMarker) return;

  return (
    <div>
      {selectedMarker.id} - {selectedMarker.position?.[0]}
    </div>
  );
};

export default AdInfo;
