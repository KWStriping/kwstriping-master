import IconButton from '@tempo/ui/components/buttons/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { useRef, useEffect } from 'react';
import { useMap } from './MapContext';
export * from './MapContext';

interface MapProps {
  center: { latitude: number; longitude: number };
  zoom?: number;
  hideMarker?: boolean;
}

function Map({ center, zoom = 12, hideMarker = false }: MapProps) {
  const { mapRef, markerRef, mapIsEnabled, errorMessage } = useMap();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current || !mapRef || !markerRef) return;
    const { latitude, longitude } = center;
    const latLng = new window.google.maps.LatLng(latitude, longitude);
    const map = new window.google.maps.Map(ref.current, {
      center: latLng,
      zoom,
      mapTypeControl: false,
    });
    mapRef.current = map;
    markerRef.current = hideMarker
      ? null
      : new google.maps.marker.AdvancedMarkerElement({
          position: latLng,
          map,
          // visible: !hideMarker,
        });
  }, []);
  if (!mapIsEnabled)
    return (
      <div>
        <Typography className={'text-warning'}>{'Map is disabled.'}</Typography>
        {errorMessage && (
          <IconButton title={errorMessage}>
            <InfoIcon />
          </IconButton>
        )}
      </div>
    );
  return <div ref={ref} className={'w-full h-[420px] max-h-[50vh]'} />;
}

export default Map;
