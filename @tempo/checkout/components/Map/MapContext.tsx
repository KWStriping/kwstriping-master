import Spinner from '@tempo/ui/components/Spinner';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import type { FC, ReactNode, Context, MutableRefObject } from 'react';
import { useState, useContext, useEffect, createContext, useRef } from 'react';

interface MapContextType {
  mapIsEnabled: boolean;
  setMapIsEnabled: (mapIsEnabled: boolean) => void;
  mapRef?: MutableRefObject<google.maps.Map | undefined>;
  markerRef?: MutableRefObject<google.maps.marker.AdvancedMarkerElement | null>;
  errorMessage?: string;
  setErrorMessage?: (errorMessage: string) => void;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined');
}

export const MapContext: Context<MapContextType> = createContext({
  mapIsEnabled: false,
  setMapIsEnabled: () => null,
  mapRef: undefined,
  markerRef: undefined,
  errorMessage: undefined,
  setErrorMessage: () => null,
} as MapContextType);

export const InnerMapContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mapIsEnabled, setMapIsEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const mapRef = useRef<google.maps.Map | undefined>();
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  useEffect(() => {
    // Intercept console error messages from the Google Maps API.
    const console = window?.console;
    if (!console) return;
    const originalError = console.error;
    console.error = function (...args) {
      if (typeof args[0] === 'string' && args[0].includes('You must enable Billing')) {
        setMapIsEnabled(false);
        setErrorMessage(args[0]);
      }
      if (originalError.apply) {
        // Do this for normal browsers.
        originalError.apply(console, args);
      } else {
        // Do this for IE.
        const message = Array.prototype.slice.apply(args).join(' ');
        originalError(message);
      }
    };
    setMapIsEnabled(true);
  }, []);
  // console.log('mapIsEnabled', mapIsEnabled);
  return (
    <MapContext.Provider
      value={{
        mapIsEnabled,
        setMapIsEnabled,
        mapRef,
        markerRef,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const MapContextProvider: FC<{ children: ReactNode }> = (props) => {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <Spinner />;
      case Status.FAILURE:
        return <p>{'Failed to load map.'}</p>;
      case Status.SUCCESS:
        return <InnerMapContextProvider {...props} />;
      default:
        return <p>{'Failed to load map.'}</p>;
    }
  };
  return <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} libraries={['places']} />;
};

export const useMap = () => useContext(MapContext);
