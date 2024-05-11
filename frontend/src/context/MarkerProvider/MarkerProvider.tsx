import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

// Define the type for marker
export interface Marker {
  id: number;
  position: [number, number];
}

// Define the type for our context
interface MarkerContextType {
  selectedMarker: Marker | null;
  setSelectedMarker: Dispatch<SetStateAction<Marker | null>>;
}

// Create the context
const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

// Define a custom hook to use the context
export const useMarkerContext = () => {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error('useMarkerContext must be used within a MarkerProvider');
  }
  return context;
};

// Create the MarkerProvider component
export const MarkerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  return (
    <MarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      {children}
    </MarkerContext.Provider>
  );
};
