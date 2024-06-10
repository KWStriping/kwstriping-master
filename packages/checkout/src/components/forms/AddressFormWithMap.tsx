import latLngData from '@data/stateLatLngs.json';
import stateNames from '@data/stateNames.json';
import { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import AddressDisplay from '@core/ui/components/AddressDisplay';
import Map, { useMap } from '../Map';
import { AddressForm } from './AddressForm';
import type { AddressFormProps } from './AddressForm';

export function AddressFormWithMap(props: AddressFormProps) {
  const { coordinates, countryArea } = props.initialData || {};
  const { mapRef, markerRef, mapIsEnabled } = useMap();
  const stateName = countryArea ? stateNames[countryArea as keyof typeof stateNames] : undefined;
  const areaLatLng = latLngData.find((area) => area.state === stateName);
  const onPlaceChange = useCallback(
    (place: google.maps.places.PlaceResult | null) => {
      if (!mapIsEnabled) return;
      // TODO: handle null place?
      if (place && mapRef?.current && markerRef?.current) {
        // Update the map to display the selected place.
        markerRef.current.setVisible(false);
        if (!place.geometry?.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          console.error('No details available for input: ' + place.name, place);
          return;
        }
        // If the place has a geometry, then present it on a map.
        mapRef.current.setCenter(place.geometry.location);
        mapRef.current.setZoom(18);
        markerRef.current.setPosition(place.geometry.location);
        markerRef.current.setVisible(true);
      }
    },
    [mapIsEnabled, mapRef, markerRef]
  );
  return (
    <AddressForm autocomplete={mapIsEnabled} onPlaceChange={onPlaceChange} {...props}>
      {props.initialData?.streetAddress1 ? (
        <AddressDisplay address={props.initialData} />
      ) : mapIsEnabled ? (
        <>
          <Map
            zoom={coordinates ? 13 : 7}
            hideMarker={coordinates ? false : true}
            center={{
              latitude: coordinates?.latitude ?? areaLatLng?.latitude ?? 0,
              longitude: coordinates?.longitude ?? areaLatLng?.longitude ?? 0,
            }}
          />
          <Typography>
            {
              'To update the location, use the text input above the map. The map is for you to confirm that the address is correct. It does not (yet) support directly selecting locations.'
            }
          </Typography>
        </>
      ) : null}
    </AddressForm>
  );
}
